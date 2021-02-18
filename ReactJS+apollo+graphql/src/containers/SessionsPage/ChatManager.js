import SendBirdSyncManager from "sendbird-syncmanager";
import { logger } from "../../helpers";
import { SendBirdChatEvent } from "../../actions/sendbird";
import * as _ from "lodash";
import ChannelManager from "./ChannelManager";
import { uuid4 } from "../../utils/utils";
import Promise from "bluebird";

export default class ChatManager {
    /**
     *
     * @param {SendBird}sb
     */
    constructor(sb) {
        /**
         *
         * @type {SendBird}
         * @private
         */
        this._sb = sb;

        this._key = uuid4();

        /**
         *
         * @type {Object.<string,ChannelManager>}
         * @private
         */
        this._channelManagers = {};
        /**
         *
         * @type {sb.ConnectionHandler}
         * @private
         */
        this._connectionHandler = null;
    }

    initialize(id, name) {
        SendBirdSyncManager.sendBird = this._sb;
        const options = new SendBirdSyncManager.Options();
        options.messageCollectionCapacity = 2000;
        options.messageResendPolicy = "automatic";
        options.automaticMessageResendRetryCount = 5;
        options.maxFailedMessageCountPerChannel = 50;
        options.failedMessageRetentionDays = 7;
        SendBirdSyncManager.setup(id, options, () => {
            // updateGroupChannelTime();
            this._sb
                .connect(id, name)
                .then(this._onConnectedToSendBird)
                .catch((error) => {
                    logger.error("SessionPage._setup", { error });
                });
        });
        this._channelEvent = new SendBirdChatEvent();
        this._channelEvent.onTypingStatusUpdated = this.onTypingStatusUpdated;
        this._channelEvent.onReadReceiptUpdated = this._onReadReceiptUpdated;
    }

    getChannels = async (channelUrls) => {
        return Promise.map(_.filter(channelUrls), async (channelUrl) => {
            return this._channelManagers[channelUrl]
                ? this._channelManagers[channelUrl].getChannel()
                : await this.watchChannel(channelUrl);
        });
    };
    _onConnectedToSendBird = async (user) => {
        const query = this._sb.GroupChannel.createMyGroupChannelListQuery();
        query.limit = 50;
        //  query.includeEmpty = true;
        query.order = "latest_last_message";
        query.hiddenChannelFilter = "unhidden_only";

        this._channelCollection = new SendBirdSyncManager.ChannelCollection(
            query
        );
        const handler = new SendBirdSyncManager.ChannelCollection.CollectionHandler();
        handler.onChannelEvent = this._onChannelCollectionChannelEvent;

        this._channelCollection.setCollectionHandler(handler);
        this._channelCollection.fetch((res, err) => {
            console.log(res, err);
        });

        const manager = SendBirdSyncManager.getInstance();

        const ch = (this._connectionHandler = new this._sb.ConnectionHandler());
        ch.onReconnectStarted = () => {
            // if (this.chat && this.chat.main) {
            //   this.chat.main.body.stopSpinner();
            // }
            if (this.onReconnectStarted) {
                this.onReconnectStarted();
            }
        };
        ch.onReconnectSucceeded = () => {
            manager.resumeSync();
            if (this.onReconnectSucceeded) {
                this.onReconnectSucceeded();
            }
        };
        ch.onReconnectFailed = () => {
            this._sb.reconnect();
            if (this.onReconnectFailed) {
                this.onReconnectFailed();
            }
        };
        this._sb.addConnectionHandler(this._key, ch);
    };

    destroy() {
        this._sb.removeConnectionHandler(this._key);
        this._connectionHandler = null;
        Object.values(this._channelManagers).forEach((cm) => cm.destroy());
    }

    /**
     * @param {'insert'|'update'|'move'|'remove'|'clear'} action
     * @param {Array<GroupChannel>} channels:
     */
    _onChannelCollectionChannelEvent = (action, channels) => {
        logger.debug("_onChannelCollectionChannelEvent", {
            action,
            channels,
        });
        let methodName = `_onChannel${_.capitalize(action)}Event`;
        if (this[methodName]) {
            // call private
            this[methodName](channels);
        } else {
            methodName = methodName.substring(1);
            if (this[methodName]) {
                this[methodName](channels);
            }
        }
    };

    /**
     * @param {GroupChannel[]} channels
     */
    onChannelInsertEvent = (channels) => {};

    onChannelUpdatedEvent = (channels) => {};
    onChannelRemoveEvent = (channels) => {};
    _onChannelRemoveEvent = (channels) => {
        channels.forEach((channel) => {
            const manager = this.channelManager(channel.url);
            manager && manager.destroy();
            delete this._channelManagers[channel.url];
        });
        this.onChannelRemoveEvent(channels);
    };
    /**
     *
     * @param {GroupChannel[]}channels
     */
    _onChannelUpdateEvent = (channels) => {
        channels.forEach((channel) => {
            const manager = this.channelManager(channel.url);
            if (manager) {
                manager.updateState({
                    channel,
                });
            }
        });
        this.onChannelUpdatedEvent(channels);
    };

    watchChannel = async (url, defaultState) => {
        if (this._channelManagers[url]) {
            return this._channelManagers[url].getChannel();
        }
        return new Promise((resolve, reject) => {
            this._sb.GroupChannel.getChannel(url, (channel, error) => {
                if (error) reject(error);
                if (!channel) {
                    logger.debug(`No channel found for ${url}`);
                    return resolve({});
                }
                resolve(this._setupChannel(channel, defaultState).getChannel());
            });
        });
    };
    sync = (channel, defaultState) => {
        const url = channel.url;
        if (!this._channelManagers[url]) {
            this._setupChannel(channel, defaultState);
        } else {
            this._channelManagers[url]
                .refresh()
                .then(() => {})
                .catch((error) => {
                    console.error(error);
                });
        }
        return this._channelManagers[url];
    };
    _setupChannel = (channel, defaultState) => {
        const manager = (this._channelManagers[
            channel.url
        ] = new ChannelManager(channel, this._sb));
        manager.updateState(defaultState);
        manager.initialize();
        manager.onFailedMessageEvent(this._onChannelMessageEventHandler);
        manager.onPendingMessageEvent(this._onChannelMessageEventHandler);

        manager.onSuccessMessageEvent((channel, messages) => {
            this.onChannelMessageUpdated(channel, messages);
        });
        manager.onChannelUnlocked = (channel) => {
            this.onChannelUnlocked(channel);
        };
        return manager;
    };

    _onChannelMessageEventHandler = (messages, action, reason) => {
        logger.debug("SessionsPage._onChannelMessageEventHandler", {
            messages,
            action,
            reason,
        });
        messages.sort((a, b) => a.createdAt - b.createdAt);
        const methodName = `onMessage${_.capitalize(action)}Event`;
        if (this[methodName]) {
            this[methodName](messages);
        }
    };

    onMessageInsertEvent = (messages) => {};
    onMessageUpdateEvent = (messages) => {};
    onMessageRemoveEvent = (messages) => {};
    onMessageClearEvent = (messages) => {};
    onChannelUnlocked = (channel) => {};
    onChannelMessageUpdated = (channel, messages) => {};
    onTypingStatusUpdated = (channel) => {};
    _onReadReceiptUpdated = (channel) => {
        console.log("onReadReceiptUpdate", {
            channel,
        });
        return this.channelManager(channel.url)?.updateState({
            channel,
        });
    };

    channelManager(sessionOrChannelUrl) {
        if (
            sessionOrChannelUrl &&
            sessionOrChannelUrl.hasOwnProperty("chat_channel_id")
        ) {
            sessionOrChannelUrl = sessionOrChannelUrl["chat_channel_id"];
        }
        return this._channelManagers[sessionOrChannelUrl];
    }
    getMessageHistory(sessionOrChannelUrl) {
        return this.channelManager(sessionOrChannelUrl)?.getHistory() || [];
    }

    getChannel(sessionOrChannelUrl) {
        return this.channelManager(sessionOrChannelUrl)?.getChannel();
    }
    sendMessage(channel, message, callback) {
        const channelManager = this.channelManager(channel.url);
        if (channelManager) {
            return channelManager.sendMessage(message, callback);
        }
    }

    updateState(sessionOrChannelUrl, updatedState) {
        const channelManager = this.channelManager(sessionOrChannelUrl);
        if (sessionOrChannelUrl) {
            return channelManager.updateState(updatedState);
        }
    }
    endSession(sessionOrChannelUrl) {
        const channelManager = this.channelManager(sessionOrChannelUrl);
        if (channelManager) {
            return channelManager.endSession();
        }
    }
    getState(sessionOrChannelUrl) {
        const channelManager = this.channelManager(sessionOrChannelUrl);
        if (channelManager) {
            return channelManager.getState();
        }
        return {};
    }

    onReconnectStarted = () => {};
    onReconnectSucceeded = () => {};
    onReconnectFailed = () => {};
}
