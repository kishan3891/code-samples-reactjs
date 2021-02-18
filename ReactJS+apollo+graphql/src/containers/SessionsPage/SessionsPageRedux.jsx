import React from "react";
// import { connect } from "react-redux";
import "./style.scss";
import { Tabs } from "antd";
import Content from "Components/Layout/Content";
import SessionNotes from "Components/SessionModal/SessionNotes/SessionNotes";
import SessionProfile from "Components/SessionProfile";
import {
    Button,
    CountDownTime,
    Messages,
    NotificationAlert,
    RecentChatList,
    SessionList,
} from "Components";
// import { sessionActions } from "../../actions";
import { Scrollbars } from "react-custom-scrollbars";
import * as _ from "lodash";
import AlertModal from "../../components/Modals/AlertModal";
import SessionsContext from "../../context/SessionsContext";

const TabPane = Tabs.TabPane;

class SessionsPageRedux extends React.Component {
    static contextType = SessionsContext;

    componentWillUnmount = () => {
        this.context.setSessionState({
            session: null,
            activeTab: "chat",
        });
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
            notifyClose,
            onNavigateToNotes,
            scrollBarRef,
            onSessionClicked,
            onNotifyWarning,
            onEndSession,
            onShowSos,
            onNotifyComplete,
            messagesRef,
            onSendMessage,
            onSaveSessionNotes,
            sessionNotesRef,
            setSessionState,
            onTabChanged,
        } = this.context;
        return (
            <Content>
                <div className="main-right-outer session-chating-page">
                    <div style={{ width: "100%" }}>
                        {showNotification &&
                            notification.title === "Notes submission" && (
                                <NotificationAlert
                                    isClose={notification.isClose}
                                    className={
                                        notification.className || "fixed-notify"
                                    }
                                    handleClose={(val) =>
                                        notifyClose(session, val)
                                    }
                                    title={notification.title}
                                    countdown={notification.countdown}
                                    onActionButtonClicked={onNavigateToNotes}
                                    button={notification.button}
                                    subTitle={notification.message}
                                    isNotification={true}
                                />
                            )}
                        <div className="session-outer">
                            <div className="session-inner">
                                <div className="section-head">
                                    <h3>Sessions</h3>
                                </div>
                                <Scrollbars
                                    autoHide={true}
                                    // Hide delay in ms
                                    autoHideTimeout={1000}
                                    // Duration for hide animation in ms.
                                    autoHideDuration={200}
                                    className="custom-scrollbars"
                                    ref={scrollBarRef}
                                    noScrollX={true}
                                >
                                    <div className="scheduled-outer">
                                        <h2> Current Sessions</h2>

                                        <RecentChatList
                                            loading={loaders.sessions}
                                            sessions={currentSessions}
                                            activeSessionId={session?.id}
                                            onClick={onSessionClicked}
                                        />
                                    </div>
                                    <SessionList
                                        title={"Upcoming Sessions"}
                                        onClick={onSessionClicked}
                                        loading={loaders.sessions}
                                        activeSessionId={session?.id}
                                        sessions={upcomingSessions}
                                    />
                                </Scrollbars>
                            </div>
                            {session && (
                                <div className="chating-section">
                                    {showNotification &&
                                        notification.title !==
                                            "Notes submission" && (
                                            <NotificationAlert
                                                isClose={notification.isClose}
                                                className={
                                                    notification.className ||
                                                    "fixed-notify"
                                                }
                                                handleClose={(val) =>
                                                    notifyClose(session, val)
                                                }
                                                title={notification.title}
                                                countdown={
                                                    notification.countdown
                                                }
                                                onActionButtonClicked={
                                                    onNavigateToNotes
                                                }
                                                button={notification.button}
                                                subTitle={notification.message}
                                                isNotification={true}
                                            />
                                        )}
                                    <div className="chat-header">
                                        <div className="chat-top-header clearfix">
                                            <h3>
                                                {student?.name}
                                                <em>
                                                    {student
                                                        ? `Sophomore, ${student.school.name}`
                                                        : ""}
                                                </em>
                                            </h3>
                                            <CountDownTime
                                                onWarning={onNotifyWarning}
                                                onCompleted={onNotifyComplete}
                                                onEndSession={onEndSession}
                                                session={session}
                                                channel={channel}
                                            />
                                        </div>
                                        <div className="right-btn">
                                            {session && (
                                                <Button
                                                    onClick={onShowSos}
                                                    className="white-btn"
                                                    buttonText={"SOS"}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`chat-navigation ${
                                            showNotification
                                                ? "with-notifications"
                                                : ""
                                        }`}
                                    >
                                        <Tabs
                                            activeKey={activeTab}
                                            onChange={onTabChanged}
                                        >
                                            <TabPane
                                                tab="Chat"
                                                key="chat"
                                                disabled={isNavigationDisabled}
                                            >
                                                <Messages
                                                    ref={messagesRef}
                                                    counselor={counselor}
                                                    disabled={isChatDisabled}
                                                    messages={messages}
                                                    channel={channel}
                                                    session={session}
                                                    onSendMessage={
                                                        onSendMessage
                                                    }
                                                    isTyping={isTyping}
                                                />
                                            </TabPane>
                                            <TabPane
                                                tab="Profile"
                                                key="profile"
                                                disabled={isNavigationDisabled}
                                            >
                                                <SessionProfile
                                                    profile={student}
                                                />
                                            </TabPane>
                                            <TabPane
                                                tab="Notes"
                                                key="notes"
                                                disabled={isNavigationDisabled}
                                            >
                                                <SessionNotes
                                                    onSave={onSaveSessionNotes}
                                                    pastNotes={pastNotes}
                                                    notes={notes}
                                                    ref={sessionNotesRef}
                                                    loaders={loaders}
                                                    config={notesConfig}
                                                    session={session}
                                                    isPastNotes={isPastNotes}
                                                    showPastNotes={(val) =>
                                                        setSessionState({
                                                            isPastNotes: val,
                                                        })
                                                    }
                                                />
                                            </TabPane>
                                        </Tabs>
                                    </div>
                                </div>
                            )}
                            {!session && (
                                <div className="no-session">
                                    {hasSessions
                                        ? "No session selected"
                                        : "No sessions scheduled"}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {sos && (
                    <AlertModal
                        className={"modal-text text-left sos-alert"}
                        title={"SOS"}
                        fragment={sos}
                        buttonText={"Got it"}
                        onClick={() => setSessionState({ sos: false })}
                    />
                )}
            </Content>
        );
    }
}

/**
 *
 * @param {RootState} state
 * @return {{}}
 */
// function mapStateToProps(state) {
//     const { counselor } = state.counselor;
//     const { sessions, loaders, notes, pastNotes } = state.session;
//     const {
//         notesConfig,
//         config: { notesSubmitHoursThreshold },
//     } = state.app;
//     return {
//         counselor,
//         sessions,
//         loaders,
//         notes,
//         pastNotes,
//         notesConfig,
//         notesSubmitHoursThreshold,
//     };
// }

// const mapStateToDispatch = {
//     ...sessionActions,
// };
// const connectedSessions = connect(
//     mapStateToProps,
//     mapStateToDispatch
// )(SessionsPageRedux);
export { SessionsPageRedux as SessionsPage };
