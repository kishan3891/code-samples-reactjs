import React from "react";
import { connect } from "react-redux";
import { sessionConstants } from "Constants";
import { SendBirdAction } from "Actions/sendbird";
import moment from "moment";
import { sessionActions } from "../../actions";
import ChatManager from "../../containers/SessionsPage/ChatManager";
import * as _ from "lodash";
import SessionsContext from "../../context/SessionsContext";

const sb = new SendBirdAction();

class CounselorView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session: null,
            isNotification: false,
            timeWarning: null,
            activeTab: "chat",
            isAlert: false,
            message: null,
            channel: null,
            channels: [],
            messages: [],
            currentUserId: 5,

            isTyping: false,

            student: null,
            /**
             * @type {CounslrSessionWithChannel[]}
             */
            currentSessions: [],
            /**
             * @type CounslrSession[]
             */
            upcomingSessions: [],
            /**
             * @type CounslrSession[]
             */
            pastSessions: [],
            isPastNotes: false,
            totalUnreadMessageCount: 0,
            totalConfirmedSessions: 0,
            totalEndedSessions: 0,
        };

        this._chatManager = new ChatManager(sb.sb);
        this.scrollBarRef = React.createRef();
        this.messagesRef = React.createRef();
        this.sessionNotesRef = React.createRef();

        this.checkUnreadCountTimer = null;
    }

    componentDidMount() {
        const { counselor, sessions } = this.props;
        console.log(counselor, "counselor", sessions, "session data");
        if (counselor?.name) {
            this._setup();
        }
        if (sessions?.length) {
            this._updateSessions(sessions);
        }
        window.addEventListener("beforeunload", this._onBeforePageUnload);
    }
    _onBeforePageUnload = () => {
        this.cleanUpComponent(true);
    };

    componentWillUnmount() {
        this.cleanUpComponent();
    }
    cleanUpComponent(confirmSave) {
        clearTimeout(this.checkUnreadCountTimer);
        window.removeEventListener("beforeunload", this._onBeforePageUnload);
        clearTimeout(this._checkSessionTimesId);
        const { session } = this.state;
        if (session) {
            this.saveNotesSilently(session, confirmSave);
        }
    }

    _startSessionTimeCheck() {
        clearTimeout(this._checkSessionTimes);
        this._checkSessionTimesId = setTimeout(this._checkSessionTimes, 3000);
    }

    _checkSessionTimes = () => {
        clearTimeout(this._checkSessionTimesId);
        const { sessions, counselor, notesSubmitHoursThreshold } = this.props;
        if (!sessions) return this._startSessionTimeCheck();
        const now = moment();
        //console.log(now, "now");
        //console.log(sessions, "data");
        const { currentSessions } = this.state;
        const currentSessionIds = sessions
            .filter(
                (s) => this._isCurrentSession(s, now, notesSubmitHoursThreshold)
                //now.isSameOrAfter(s.scheduled_start_date)
            )
            .map((s) => s.id);
        const oldCurrentSessionIds = currentSessions.map((s) => s.id);
        //console.log(currentSessionIds, "curr");
        //console.log(oldCurrentSessionIds, "old");
        const hasStatusChanged =
            _.difference(oldCurrentSessionIds, currentSessionIds).length ||
            _.difference(currentSessionIds, oldCurrentSessionIds).length;
        if (hasStatusChanged) {
            this._updateSessions(sessions);
        } else {
            this._startSessionTimeCheck();
        }
        if (now.isAfter(this._currentDate, "day")) {
            this._currentDate = moment();
            this.props.watchSessionsForDate(counselor.id, this._currentDate);
        }
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { counselor, sessions } = this.props;
        const { session } = this.state;
        if (session === null && prevState.session !== this.state.session) {
            this.notifyClose(prevState.session);
        }
        if (!this.state.setup && counselor && counselor.name) {
            this._setup();
        }
        if (
            (sessions && prevProps.sessions !== sessions) ||
            prevProps.session !== this.props.session
        ) {
            this._updateSessions(sessions);
        }

        const currentSessionDidUpdate =
            this.state.currentSessions.length !=
                prevState.currentSessions.length ||
            !this.state.currentSessions.every((session) =>
                prevState.currentSessions.find((prevSession) =>
                    Object.keys(prevSession).every(
                        (key) => prevSession[key] === session[key]
                    )
                )
            );

        if (currentSessionDidUpdate) {
            let totalConfirmedSessions = 0,
                totalEndedSessions = 0;

            for (let session of this.state.currentSessions) {
                switch (session.session_status_id) {
                    case sessionConstants.SESSION_STATUS.CONFIRMED:
                        totalConfirmedSessions++;
                        break;
                    case sessionConstants.SESSION_STATUS.ENDED:
                        totalEndedSessions++;
                        break;
                }
            }

            this.setState({
                totalConfirmedSessions,
                totalEndedSessions,
            });

            this.updateUnreadCount();
        }
    }
    _setup() {
        const { counselor } = this.props;
        this.setState({
            setup: true,
        });
        this._currentDate = moment();
        // TODO : add for next day
        this.props.watchSessionsForDate(counselor.id, this._currentDate);
        const m = this._chatManager;
        m.onChannelInsertEvent = this._onChannelInsertEvent;
        m.onChannelUpdateEvent = this._onChannelUpdateEvent;
        m.onChannelRemoveEvent = this._onChannelRemoveEvent;
        m.onTypingStatusUpdated = this._onTypingStatusUpdated;
        m.onChannelMessageUpdated = this._onChannelMessageUpdated;
        m.onReadReceiptUpdated = this._onReadReceiptUpdated;
        m.onChannelUnlocked = this._onChannelUnlocked;
        m.initialize(counselor.id, counselor.name);

        this.checkUnreadCount();
    }
    updateUnreadCount = () => {
        const totalUnreadMessageCount = this.state.currentSessions.reduce(
            (unreadCount, session) => {
                unreadCount += session.channel?.unreadMessageCount;

                return unreadCount;
            },
            0
        );

        if (totalUnreadMessageCount !== this.state.totalUnreadMessageCount) {
            this.setState({ totalUnreadMessageCount });
        }
    };
    checkUnreadCount = () => {
        this.updateUnreadCount();

        this.checkUnreadCountTimer = setTimeout(
            this.checkUnreadCount,
            10 * 1000
        );
    };

    markAsRead = (channel) => {
        channel.markAsRead();
        this.updateUnreadCount();
    };

    _onChannelRemoveEvent = (channels) => {
        const { sessions } = this.props;
        const channelIds = channels.map((c) => c.id);
        this._updateSessions(
            sessions.filter((s) => !channelIds.includes(s.chat_channel_id))
        );
    };

    _onReadReceiptUpdated = (channel) => {};

    _onChannelUnlocked = (channel) => {
        const { sessions } = this.props;
        const session = sessions.find((s) => s.chat_channel_id === channel.url);
        if (session) {
            this.props.changeSessionStatus(
                session,
                sessionConstants.SESSION_STATUS.STARTED
            );
        }
    };
    onShowSos = () => {
        const {
            session: {
                student: {
                    school: { emergency_services = [] },
                },
            },
        } = this.state;

        this.setState({
            sos: [
                <p>
                    <strong>
                        IF THIS IS A CRISIS SITUATION, YOU MUST IMMEDIATELY CALL
                        AN EMERGENCY NUMBER
                    </strong>
                    . Emergency numbers relevant to this student's school are
                    listed below. Keep your session active as long as you can.
                    Keep calm, and give the emergency responders all the
                    information you have about the situation
                </p>,
                emergency_services.map(({ name, phone }, index) => {
                    const numbers = phone.replace(/[^0-9]/g, "");

                    return (
                        <div
                            key={`phone_${index}`}
                            className="sos-phone-warpper"
                        >
                            <div className="sos-phone-text">{name} -</div>{" "}
                            <div className="sos-phone-number">
                                <a href={`tel:${phone}`}>{phone}</a>
                            </div>
                        </div>
                    );
                }),
                <br />,
                <br />,
            ],
        });
    };

    _onChannelInsertEvent = (channels) => {
        /*  channels.forEach((channel) =>
            this._chatManager.sync(channel, {
                timeWarning: null,
            })
        );
        const currentChannels = this.state.channels;

        this._updateSessionChannels(this.props.sessions, [
            ...currentChannels,
            ...channels,
        ]);*/
    };
    _onChannelUpdateEvent = (channels) => {
        const { session } = this.state;
        const activeChannel = channels.find(
            (c) => c.url === session?.chat_channel_id
        );
        if (activeChannel) {
            this.markAsRead(activeChannel);
        }
    };
    _onChannelMessageUpdated = (channel, messages) => {
        const { session, messages: currentMessages } = this.state;
        const isCurrentSession = session?.chat_channel_id === channel.url;

        if (!isCurrentSession) {
            return;
        }
        this.markAsRead(channel);
        this.setState({
            session: {
                ...session,
                channel,
            },

            messages: messages,
        });
    };
    _onTypingStatusUpdated = (updatedChannel) => {
        this._updateSessions(
            this.props.sessions.map((session) => {
                if (session.chat_channel_id === updatedChannel.url) {
                    return {
                        ...session,
                        isTyping: updatedChannel.isTyping(),
                    };
                }
                return session;
            })
        );
    };

    _isCurrentSession = (session, now, notesSubmitHoursThreshold) => {
        const isChatNow =
            session.session_type_id === sessionConstants.SESSION_TYPE.CHAT_NOW;
        const hasEnded = !!session.end_date;

        if (hasEnded) {
            return now.isBefore(
                moment(session.end_date).add(notesSubmitHoursThreshold, "hours")
            );
        }

        return now.isSameOrAfter(session.scheduled_start_date);
    };

    /**
     *
     * @param {CounslrSession[]} sessions
     * @private
     */
    _updateSessions = (sessions) => {
        const now = moment();
        const { notesSubmitHoursThreshold } = this.props;
        this._chatManager
            .getChannels(_.map(sessions, "chat_channel_id"))
            .then((channels) => {
                const currentSessions = sessions
                    .filter((s) =>
                        this._isCurrentSession(
                            s,
                            now,
                            notesSubmitHoursThreshold
                        )
                    )
                    .map((session) => {
                        if (!session.channel) {
                            return {
                                ...session,
                                channel: channels.find(
                                    (c) => c.url === session.chat_channel_id
                                ),
                            };
                        }
                        return session;
                    });

                const upcomingSessions = sessions.filter(
                    (s) =>
                        !s.start_date &&
                        s.session_type_id ===
                            sessionConstants.SESSION_TYPE.SCHEDULED &&
                        !this._isCurrentSession(
                            s,
                            now,
                            notesSubmitHoursThreshold
                        )
                );

                const currentSession = this.state.session
                    ? currentSessions.find(
                          (s) => s.id === this.state.session.id
                      )
                    : null;
                const updatedState = {
                    channels,
                    currentSessions: _.orderBy(
                        currentSessions,
                        ["scheduled_start_date"],
                        ["asc"]
                    ),
                    upcomingSessions: _.orderBy(
                        upcomingSessions,
                        ["scheduled_start_date"],
                        ["asc"]
                    ),
                };
                if (currentSession) {
                    updatedState.session = {
                        ...this.state.session,
                        ...this.props.session,
                        ...currentSession,
                    };
                } else {
                    updatedState.notification = null;
                    updatedState.close = null;
                }
                this.setState(updatedState, () => {
                    this._startSessionTimeCheck();
                });
            });
    };

    onTabChanged = (activeTab) => {
        this.setState({
            activeTab,
        });
    };

    saveNotesSilently(session, confirmSave) {
        if (!this.sessionNotesRef.current) return;
        const currentNotes = this.sessionNotesRef.current.getNotes();
        if (!currentNotes) {
            return;
        }
        if (confirmSave) {
            const ok = window.confirm(
                "You have unsaved notes, would you like to save?"
            );
            if (!ok) return;
        }

        this.props
            .saveSessionNotes(session, currentNotes, true)
            .then(() => {
                // just suppress :(
            })
            .catch(() => {
                // just suppress :(
            });
    }
    onSessionClicked = ({ channel, ...session }) => {
        this.setState({
            activeTab: "chat",
            isPastNotes: false,
        });
        const { session: currentSession, currentSessions } = this.state;
        if (currentSession) {
            this._chatManager.updateState(currentSession, {
                textMessage: this.messagesRef.current.getTextMessage(),
            });
            this.saveNotesSilently(currentSession);
        }
        this.props.setActiveSession(session);
        const sessionEnded = currentSessions.map(
            (s) => s.session_status.value === "Ended"
        );
        if (sessionEnded.includes(true)) {
            this._updateNotification(session, {
                title: "Notes submission",
                button: "Review",
                message: "Please review and submit your notes",
            });
        } else {
            this.notifyClose(session);
        }
        let channelState = this._chatManager.getState(session);
        if (session.end_date) {
            channelState = this.updateNotificationAfterSessionEnded(session);
        }

        //this.messagesRef.current.restoreTextMessage(channelState.textMessage);
        this.setState(
            {
                session,
                ...channelState,
            },
            () => {
                if (!session.end_date && channel) {
                    this.markAsRead(channel);
                    this._chatManager.sync(channel);
                }
            }
        );
    };

    onNotifyWarning = (session, minutes) => {
        this._updateNotification(session, {
            title: `${minutes} minute reminder`,
            className: "fixed-notify sub-notification",
            isClose: true,
            message: "Please begin wrapping up this session",
        });
    };

    onNotifyComplete = (session) => {
        this._updateNotification(session, {
            className: "fixed-notify sub-notification",
            title: "Session over time",
            isClose: true,
            message: "Please end the session soon to stay on schedule",
        });
    };
    _updateNotification = (
        session,
        notification,
        mergeState = {},
        triggerStateChange = true
    ) => {
        let updatedState = this._chatManager.updateState(session, {
            notification,
        });
        updatedState = { ...updatedState, ...mergeState };
        if (triggerStateChange) {
            this.setState(updatedState);
        }
        return updatedState;
    };

    onEndSession = (session) => {
        if (!session.end_date) {
            this._chatManager.endSession(session);
            this.props.changeSessionStatus(
                session,
                sessionConstants.SESSION_STATUS.ENDED
            );
        }
        if (this.state.activeTab === "notes") {
            this.updateNotificationAfterSessionEnded({
                ...session,
                // temp set `end_date` so that we show the countdown timer until its updated
                end_date: moment(),
            });
        } else {
            this._updateNotification(session, {
                title: "Notes submission",
                button: "Review",
                message: "Please review and submit your notes",
            });
        }
    };
    updateNotificationAfterSessionEnded = (
        session,
        shouldNavigate,
        triggerStateChange = true
    ) => {
        const { activeTab } = this.state;
        const { notesSubmitHoursThreshold } = this.props;
        if (!session.end_date) return this._chatManager.getState(session);
        return this._updateNotification(
            session,
            {
                className: "fixed-notify countdown sub-notification",
                countdown: {
                    id: session.id,
                    end: moment(session.end_date)
                        .add(notesSubmitHoursThreshold, "hours")
                        .toISOString(),
                    text: "Left to edit",
                },
                title: " ",
                message: "Please review and submit your notes",
            },
            { activeTab: activeTab },
            triggerStateChange
        );
    };
    notifyClose = (session, val) => {
        this._updateNotification(session, {
            close: true,
        });
    };
    onSendMessage = (channel, message, callback) => {
        return this._chatManager.sendMessage(channel, message, callback);
    };

    onNavigateToNotes = () => {
        const { session, currentSessions } = this.state;
        if (session.end_date) {
            this.updateNotificationAfterSessionEnded(session, true);
        } else {
            let sessionRecentlyEnded = _.orderBy(
                currentSessions,
                ["end_date"],
                ["asc"]
            );
            const sessionEnded = sessionRecentlyEnded.filter(
                (s) => s.end_date !== null
            );
            const sessionLastEnded = _.last(sessionEnded);
            var v = document.getElementById(sessionLastEnded.id);
            if (v) {
                v.click();
                this.setState({ isPastNotes: false });
                this.onTabChanged("notes");
            }
        }
    };
    onSaveSessionNotes = (notes, silent) => {
        const { session } = this.state;
        if (session.id !== notes.sessionId) {
            return Promise.resolve(false);
        }
        // if silent we only need to pass the a subset of props
        return this.props.saveSessionNotes(session, notes, silent);
    };
    render() {
        const {
            messages,
            isTyping,
            upcomingSessions,
            currentSessions,
            notification,
            activeTab,
            session,
            sos,
            isPastNotes,
            totalUnreadMessageCount,
            totalConfirmedSessions,
            totalEndedSessions,
        } = this.state;
        const {
            loaders,
            counselor,
            notes,
            notesConfig,
            pastNotes,
            sessions,
        } = this.props;

        const channel = this._chatManager.getChannel(session);
        const student = session?.student;
        const isNavigationDisabled = !session;
        const isSuper = false;
        const hasSessions = sessions?.length > 0;

        const isChatDisabled = isSuper
            ? false
            : session
            ? moment().isBefore(session.scheduled_start_date)
            : true;
        let showNotification = notification && !notification.close;
        if (showNotification && notification.button && notes?.saved) {
            // check to see if the current session notes have been saved, if so then we will override
            // showing of the "do review" notification

            showNotification = false;
        }

        const value = {
            messages,
            isTyping,
            upcomingSessions,
            currentSessions,
            notification,
            activeTab,
            session,
            sos,
            isPastNotes,
            loaders,
            counselor,
            notes,
            notesConfig,
            pastNotes,
            channel,
            student,
            isNavigationDisabled,
            hasSessions,
            isChatDisabled,
            showNotification,
            totalUnreadMessageCount,
            totalConfirmedSessions,
            totalEndedSessions,
            notifyClose: this.notifyClose,
            onNavigateToNotes: this.onNavigateToNotes,
            scrollBarRef: this.scrollBarRef,
            onSessionClicked: this.onSessionClicked,
            onNotifyWarning: this.onNotifyWarning,
            onEndSession: this.onEndSession,
            onShowSos: this.onShowSos,
            onNotifyComplete: this.onNotifyComplete,
            messagesRef: this.messagesRef,
            onSendMessage: this.onSendMessage,
            onSaveSessionNotes: this.onSaveSessionNotes,
            sessionNotesRef: this.sessionNotesRef,
            setSessionState: (state) => this.setState(state),
            onTabChanged: this.onTabChanged,
        };

        return (
            <SessionsContext.Provider value={value}>
                {this.props.children}
            </SessionsContext.Provider>
        );
    }
}

function mapStateToProps(state) {
    const { counselor } = state.counselor;
    const { sessions, loaders, notes, pastNotes } = state.session;
    const {
        notesConfig,
        config: { notesSubmitHoursThreshold },
    } = state.app;
    return {
        counselor,
        sessions,
        loaders,
        notes,
        pastNotes,
        notesConfig,
        notesSubmitHoursThreshold,
    };
}

const mapStateToDispatch = {
    ...sessionActions,
};

export default connect(mapStateToProps, mapStateToDispatch)(CounselorView);
