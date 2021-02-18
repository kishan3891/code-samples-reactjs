import SendBirdSyncManager from "sendbird-syncmanager";
import { findMessageIndex, mergeFailedWithSuccessful } from "../../utils/utils";
import { find } from "lodash";
import { logger } from "../../helpers";

export default class ChannelManager {
    constructor(channel, sb) {
        /**
         * @type {GroupChannel}
         */
        this._channel = channel;

        /**
         * @type {SendBird}
         */
        this._sb = sb;
        this._session_started = false;
        this._session_ended = false;
        this._collectionHandler = new SendBirdSyncManager.MessageCollection.CollectionHandler();
        if (!channel.isHidden) {
            this._collection = new SendBirdSyncManager.MessageCollection(
                channel
            );

            this._collectionHandler.onSucceededMessageEvent = this._onSuccessMessageEvent;
            this._collectionHandler.onMessageEvent = (action, messages) => {
                logger.debug("ChannelManager.onMessageEvent", {
                    action,
                    messages,
                });
            };
            this._collectionHandler.onNewMessage = (message) => {
                logger.debug("ChannelManager.onNewMessage", {
                    message,
                });
            };
            this._collection.setCollectionHandler(this._collectionHandler);
        }
        this._state = {
            textMessage: "",
            notification: null,
            messages: [],
        };
    }

    getChannel() {
        return this._channel;
    }
    initialize() {
        this._channel.getMetaData(
            ["session_started", "session_status"],
            (resp, error) => {
                if (error) {
                    logger.error("ChannelManager.getMeta", {
                        channel: this._channel,
                        error,
                    });

                    return;
                }

                this._session_started =
                    resp["session_started"] === "true" ||
                    resp["session_status"] === "started";
                this._loadPastHistory();
            }
        );
    }
    _loadPastHistory = () => {
        const query = this._channel.createPreviousMessageListQuery();
        query.limit = 100;
        query.reverse = false;
        const next = (collection) => {
            query.load((messages, error) => {
                if (!error) {
                    if (messages.length) {
                        next([...collection, ...messages]);
                    } else {
                        this.updateState({
                            messages: collection.sort(
                                (a, b) => a.createdAt - b.createdAt
                            ),
                        });
                    }
                }
            });
        };
        next([]);
    };

    _onSuccessMessageEvent = (messages, action, reason) => {
        messages.sort((a, b) => a.createdAt - b.createdAt);
        const updatedHistory = this._state.messages.splice(0);
        const wholeCollectionMessages = mergeFailedWithSuccessful(
            this._collection.unsentMessages,
            this._collection.succeededMessages
        );
        messages.forEach((message) => {
            const index = findMessageIndex(message, wholeCollectionMessages);
            if (index >= 0) {
                if (!find(updatedHistory, { messageId: message.messageId })) {
                    updatedHistory.push(message);
                }
            }
        });
        this.updateState({
            messages: updatedHistory,
        });
    };

    sendMessage = (message, callback) => {
        if (!this._session_started) {
            this._unlockChannel();
        }
        const params = new this._sb.UserMessageParams();
        params.message = message;
        const pendingMessage = this._channel.sendUserMessage(
            params,
            (message, error) => {
                this._collection.handleSendMessageResponse(error, message);
                this.updateState({
                    messages: [...this._state.messages, message],
                });
                if (callback) callback(message, error);
            }
        );

        this._collection.appendMessage(pendingMessage);
        return pendingMessage;
    };
    _unlockChannel = () => {
        this._session_started = true;
        const channel = this._channel;
        channel.updateMetaData(
            {
                session_status: "started",
                session_started: "true",
            },
            true,
            (resp, error) => {
                if (error) {
                    logger.error("ChannelManager.updateMetaData", {
                        channel,
                        error,
                    });
                }
            }
        );
        const student = this.getStudentUser();
        if (student) {
            channel.unmuteUserWithUserId(student.userId, (resp, error) => {
                if (error) {
                    logger.error("ChannelManager.unmuteUser", {
                        studentId: student.id,
                        channel,
                        error,
                    });
                }
            });
        }

        this.onChannelUnlocked(this._channel);
    };
    onSuccessMessageEvent = (callback) => {
        this._onMessageCallback = callback;
    };
    onChannelStateUpdated = (channel) => {};
    onFailedMessageEvent = (callback) => {
        this._collectionHandler.onFailedMessageEvent = callback;
    };
    onPendingMessageEvent = (callback) => {
        this._collectionHandler.onPendingMessageEvent = callback;
    };
    onChannelUnlocked = (channel) => {};
    getHistory() {
        return this._state.messages;
    }
    updateState(state) {
        const { messages: oldMessages } = this._state;
        state = state || {};
        const channel = state.channel;
        delete state.channel;

        const { messages: updatedHistory = [] } = (this._state = {
            ...this._state,
            ...state,
        });
        if (channel) {
            this._channel = channel;
        }
        const userId = this._sb.currentUser.userId;
        // find all student messages and assign last one
        const studentMessages = this._state.messages.filter(
            (m) => m.sender.userId !== userId
        );
        const lastMessage = this._channel.lastMessage;
        const lastStudentMessage = studentMessages[studentMessages.length - 1];
        const hasMessageHistoryChanged =
            lastMessage !== lastStudentMessage ||
            oldMessages !== updatedHistory;

        //this._channel.lastMessage = lastStudentMessage;

        if (hasMessageHistoryChanged && this._onMessageCallback) {
            this._onMessageCallback(this._channel, updatedHistory);
        } else if (this.onChannelStateUpdated) {
            this.onChannelStateUpdated(channel, this._state);
        }

        return this._state;
    }
    getState() {
        return { ...this._state };
    }
    getStudentUser() {
        return this._channel.members.find(
            (m) => m.userId !== this._sb.currentUser.userId
        );
    }
    endSession() {
        const channel = this._channel;
        channel.updateMetaData(
            {
                session_status: "ended",
                session_started: "false",
                session_ended: "true",
            },
            true,
            (resp, error) => {
                if (error) {
                    logger.error("ChannelManager.endSession.updateMetaData", {
                        channel,
                        error,
                    });
                }
                this._channel.isHidden = true;
            }
        );

        const student = this.getStudentUser();
        if (student) {
            channel.muteUserWithUserId(student.userId, (resp, error) => {
                if (error) {
                    logger.error("ChannelManager.muteUserWithUserId", {
                        studentId: student.id,
                        channel,
                        error,
                    });
                }
            });
        }
        return true;
    }

    async refresh() {
        // await this._collection.fetchSucceededMessages();
        //await this._collection.fetchFailedMessages();
    }
    destroy() {
        this._collection.setCollectionHandler(null);
        this._collectionHandler = null;
        this._collection = null;
        this._channel = null;
    }
}
