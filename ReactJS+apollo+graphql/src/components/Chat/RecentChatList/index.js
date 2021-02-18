import React from "react";
import ChatListItem from "./ChatListItem";
import PropTypes from "prop-types";
import LoadingSpinner from "../../Loading/LoadingSpinner";

const RecentChatList = ({ loading, sessions, onClick, activeSessionId }) => {
    return (
        <LoadingSpinner spinning={loading} wrapperClassName="counslr-spinner">
            <ul className="session-list">
                {sessions.map((session) => {
                    return (
                        <li
                            id={session.id}
                            key={session.id}
                            onClick={() => onClick(session)}
                            className={
                                session.id === activeSessionId
                                    ? "active list-item"
                                    : "list-item"
                            }
                        >
                            <ChatListItem
                                session={session}
                                channel={session.channel}
                            />
                        </li>
                    );
                })}
                {!sessions.length && (
                    <li className="no-sessions"> No current Sessions</li>
                )}
            </ul>
        </LoadingSpinner>
    );
};

export default RecentChatList;
RecentChatList.propTypes = {
    onClick: PropTypes.func,
};
