import React from "react";
import { connect } from "react-redux";
import SendBirdSyncManager from "sendbird-syncmanager";
import { CONSTANT } from "Constants";
import "./style.scss";
import AlertModal from "Modals/AlertModal";
import { Tabs } from "antd";
import Content from "Components/Layout/Content";

import { find, findIndex } from "lodash";
import SessionNotes from "Components/SessionModal/SessionNotes/SessionNotes";
import SessionProfile from "Components/SessionProfile";
import {
    Button,
    CountDownTime,
    Messages,
    NotificationAlert,
    RecentChatList,
    UpcomingSession,
} from "Components";
import {
    SendBirdAction,
    SendBirdChatEvent,
    SendBirdConnection,
} from "Actions/sendbird";
import {
    findMessageIndex,
    getDataInElement,
    mergeFailedWithSuccessful,
    timestampFromNow,
} from "Utils/utils";

const TabPane = Tabs.TabPane;
const sb = new SendBirdAction();

const createConnectionHandler = () => {
    const manager = SendBirdSyncManager.getInstance();
    const connectionManager = new SendBirdConnection();
    connectionManager.onReconnectStarted = () => {
        connectionManager.channel =
            "sendbird_group_channel_19843161_2863ef2f57862e478721cd096e3f2981728e8287";
    };
    connectionManager.onReconnectSucceeded = () => {
        manager.resumeSync();
    };
    connectionManager.onReconnectFailed = () => {
        connectionManager.reconnect();
    };
};

const updateGroupChannelTime = () => {
    setInterval(() => {
        const items = document.getElementsByClassName("item-time");
        if (items && items.length > 0) {
            Array.prototype.slice.call(items).forEach((targetItemEl) => {
                const originTs = parseInt(
                    getDataInElement(targetItemEl, "origin")
                );
                if (originTs) {
                    targetItemEl.innerHTML = timestampFromNow(originTs);
                }
            });
        }
    }, CONSTANT.UPDATE_INTERVAL_TIME);
};

const query = sb.sb.GroupChannel.createMyGroupChannelListQuery();
query.limit = 50;
query.includeEmpty = false;
query.order = "latest_last_message";

const upcomingSession = [
    { name: "Cindy Wolfe", userId: 22, time: "3:00pm" },
    { name: "James Bleu", userId: 23, time: "4:30pm" },
];
const myState = {
    isNotification: false,
    timeWarning: null,
    activeTab: 1,
    isAlert: false,
    message: null,
    activeChannelUrl: null,
    currentSessions: [],
    messages: [],
    currentUserId: 5,
    channel: null,
    isTyping: false,
    upcomingSessions: upcomingSession,
};

class SessionsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...myState,
        };
        this._messageEventHandler = this._messageEventHandler.bind(this);
        const { userid, nickname } = { userid: "5", nickname: "counsler test" };
        SendBirdSyncManager.sendBird = sb.sb;
        const options = new SendBirdSyncManager.Options();
        SendBirdSyncManager.setup(userid, options, () => {
            updateGroupChannelTime();
            sb.connect(userid, nickname)
                .then((user) => {
                    if (user) {
                        const collection = new SendBirdSyncManager.ChannelCollection(
                            query
                        );
                        const handler = new SendBirdSyncManager.ChannelCollection.CollectionHandler();
                        handler.onChannelEvent = (action, channels) => {
                            switch (action) {
                                case "insert": {
                                    this.setState({
                                        currentSessions: collection.channels,
                                    });
                                    for (let i in channels) {
                                        const channel = channels[i];
                                        this.getMessagesData(channel);
                                    }
                                    break;
                                }
                                case "update": {
                                    for (let i in channels) {
                                        const channel = channels[i];
                                        if (
                                            this.state.activeChannelUrl ===
                                            channel.url
                                        ) {
                                            channel.markAsRead();
                                        }
                                    }
                                    break;
                                }
                            }
                        };
                        collection.setCollectionHandler(handler);
                        collection.fetch();
                    }
                    //this.createUpcomingChannel()
                    createConnectionHandler();
                })
                .catch((error) => {});
        });

        const channelEvent = new SendBirdChatEvent();
        channelEvent.onTypingStatusUpdated = (groupChannel) => {
            const currentChannels = this.state.currentSessions;
            currentChannels.filter((channel) => {
                const typingLength = groupChannel.getTypingMembers().length;
                if (this.state.activeChannelUrl === groupChannel.url) {
                    this.setState({
                        isTyping: typingLength ? true : false,
                    });
                }
                if (channel.url === groupChannel.url) {
                    channel.isTyping = typingLength ? true : false;
                    this.setState({ currentSessions: currentChannels });
                }
            });
        };
    }

    createUpcomingChannel = () => {
        const { upcomingSessions } = this.state;
        if (upcomingSessions.length) {
            upcomingSessions.filter((item) => {
                if (item.userId == 23) {
                    setTimeout(() => {
                        const userIds = [`${item.userId}`];
                        this.createChannel(userIds, item.userId);
                    }, 2000);
                }
            });
        }
    };

    createChannel = (userIds, userId) => {
        SendBirdAction.getInstance()
            .createGroupChannel(userIds)
            .then((channel) => {
                const channleJoined = this.state.currentSessions.concat(
                    channel
                );
                this.setState({ currentSessions: channleJoined });
                const { upcomingSessions } = this.state;
                const upComingIndex = findIndex(upcomingSessions, {
                    userId: userId,
                });
                if (upComingIndex > -1) {
                    upcomingSessions.splice(upComingIndex, 1);
                }
                this.setState({ ...upcomingSessions });
            })
            .catch((error) => {});
    };

    getMessagesData = (channel, type = "init") => {
        this.messageCollection = new SendBirdSyncManager.MessageCollection(
            channel
        );
        this.messageCollection.limit = 100;

        const collectionHandler = new SendBirdSyncManager.MessageCollection.CollectionHandler();
        collectionHandler.onSucceededMessageEvent = this._messageEventHandler.bind(
            this
        );
        collectionHandler.onFailedMessageEvent = this._messageEventHandler.bind(
            this
        );
        collectionHandler.onPendingMessageEvent = this._messageEventHandler.bind(
            this
        );
        this.messageCollection.setCollectionHandler(collectionHandler);

        if (type !== "init") {
            this.messageCollection.fetchSucceededMessages("prev", () => {
                this.messageCollection.fetchFailedMessages(() => {});
            });
        }
    };

    _messageEventHandler(messages, action, reason) {
        messages.sort((a, b) => a.createdAt - b.createdAt);
        switch (action) {
            case "insert": {
                this.mergeMessagesOnInsert(messages);
                break;
            }
            default:
                break;
        }
    }

    mergeMessagesOnInsert = (messages) => {
        const wholeCollectionMessages = mergeFailedWithSuccessful(
            this.messageCollection.unsentMessages,
            this.messageCollection.succeededMessages
        );
        let messages_data = this.state.messages.length
            ? this.state.messages
            : [];
        for (let i in messages) {
            const message = messages[i];
            if (message.channelUrl === this.state.activeChannelUrl) {
                const index = findMessageIndex(
                    message,
                    wholeCollectionMessages
                );
                if (index >= 0) {
                    if (
                        !find(messages_data, { messageId: message.messageId })
                    ) {
                        messages_data.push(message);
                    }
                }
            }
        }
        this.setState({ messages: messages_data });
    };

    activeChannelItem = (channelUrl) => {
        const groupItems = document.getElementsByClassName("list-item");
        for (let i = 0; i < groupItems.length; i++) {
            groupItems[i].id === channelUrl
                ? groupItems[i].classList.add("active")
                : groupItems[i].classList.remove("active");
        }
    };

    chatdataBychannel = (channel) => {
        this.setState(
            { channel: channel, messages: [], activeChannelUrl: channel.url },
            () => {
                this.activeChannelItem(channel.url);
                channel.markAsRead();
                this.getMessagesData(channel, "get");
            }
        );
    };
    notifyWarning = (minutes) => {
        this.setState({ isNotification: true, timeWarning: minutes });
    };
    completedNotify = (channel) => {};
    notifyClose = (val) => {
        this.setState({ isNotification: val, timeWarning: "" });
    };

    render() {
        const {
            timeWarning,
            activeChannelUrl,
            currentSessions,
            messages,
            channel,
            isTyping,
            upcomingSessions,
        } = this.state;

        return (
            <Content>
                <div className="main-right-outer session-chating-page">
                    <div className="session-outer">
                        <div className="session-inner">
                            <div className="section-head">
                                <h3>Sessions</h3>
                            </div>
                            <div className="scheduled-outer">
                                <h2> Current Sessions</h2>
                                <ul>
                                    <RecentChatList
                                        channelList={currentSessions}
                                        activeChannelUrl={activeChannelUrl}
                                        onClick={(event) => {
                                            this.chatdataBychannel(event);
                                        }}
                                    />
                                </ul>
                            </div>
                            <UpcomingSession
                                upcomingSessions={upcomingSessions}
                            />
                        </div>
                        <div className="chating-section">
                            <NotificationAlert
                                isClose={true}
                                className={"fixed-notify"}
                                handleClose={(val) => this.notifyClose(val)}
                                title={timeWarning + " reminder"}
                                subTitle={
                                    "Please begin wrapping up this session"
                                }
                                isNotification={this.state.isNotification}
                            />
                            <div className="chat-header">
                                <div className="chat-top-header clearfix">
                                    <h3>
                                        Dwight Schrute{" "}
                                        <em>Sophomore, Molloy College</em>
                                    </h3>
                                    <CountDownTime
                                        onClick={(minutes) =>
                                            this.notifyWarning(minutes)
                                        }
                                        channel={channel}
                                    />
                                </div>
                                <div className="right-btn">
                                    <Button
                                        onClick={() =>
                                            this.setState({ isAlert: true })
                                        }
                                        className="white-btn"
                                        buttonText={"SOS"}
                                    />
                                </div>
                            </div>
                            <div className="chat-navigation">
                                <Tabs
                                    defaultActiveKey="1"
                                    onChange={(key) =>
                                        this.setState({
                                            activeTab: key,
                                        })
                                    }
                                >
                                    <TabPane tab="Chat" key="1">
                                        <Messages
                                            data={messages}
                                            channel={channel}
                                            isTyping={isTyping}
                                        />
                                    </TabPane>
                                    <TabPane tab="Profile" key="2">
                                        <SessionProfile
                                            profile={{
                                                dob: "09/23/2000",
                                                gender: "Female",
                                                school: "Molloy College",
                                            }}
                                        />
                                    </TabPane>
                                    <TabPane tab="Notes" key="3">
                                        <SessionNotes />
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
                {false && (
                    <AlertModal
                        className={"modal-text text-left sos-alert"}
                        title={"SOS"}
                        text={
                            'Please call campus saftey at <a href="tel:9293102443">(929) 310-2443</a>'
                        }
                        isAlert={this.state.isAlert}
                        buttonText={"Got it"}
                        alertCancel={() => this.setState({ isAlert: false })}
                    />
                )}
            </Content>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const actionCreators = {};
const connectedSessions = connect(
    mapStateToProps,
    actionCreators
)(SessionsPage);
export { connectedSessions as SessionsPage };
