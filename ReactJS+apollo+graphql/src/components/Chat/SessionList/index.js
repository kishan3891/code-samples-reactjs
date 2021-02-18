import React from "react";
import { CONSTANT } from "../../../constants";
import moment from "moment";
import LoadingSpinner from "../../Loading/LoadingSpinner";
import { trimNameForChatList } from "../../../helpers";

/**
 *
 * @param title
 * @param loading
 * @param onClick
 * @param {CounslrSession[]} sessions
 * @param activeSessionId
 * @return {*}
 * @constructor
 */
const SessionList = ({
    title,
    loading,
    onClick,
    sessions,
    activeSessionId,
}) => {
    return (
        <div className="scheduled-outer upcoming-session">
            <h2> {title}</h2>
            <LoadingSpinner
                spinning={loading}
                wrapperClassName="counslr-spinner"
            >
                <ul className="session-list">
                    {sessions.map((session) => {
                        const { id, student, scheduled_start_date } = session;
                        return (
                            <li
                                key={id}
                                onClick={() => onClick(session)}
                                className={
                                    activeSessionId === session.id
                                        ? "active"
                                        : ""
                                }
                            >
                                <figure>
                                    <img
                                        src={student.avatarUrl}
                                        alt={student.name}
                                    />
                                </figure>
                                <span>
                                    <b>
                                        {trimNameForChatList(
                                            student.nickname || student.name
                                        )}
                                    </b>{" "}
                                    <small>
                                        {moment(scheduled_start_date).format(
                                            CONSTANT.TIME_FORMAT
                                        )}
                                    </small>
                                </span>
                            </li>
                        );
                    })}
                    {!sessions.length && (
                        <li className="no-sessions"> No upcoming Sessions</li>
                    )}
                </ul>
            </LoadingSpinner>
        </div>
    );
};
export default SessionList;
