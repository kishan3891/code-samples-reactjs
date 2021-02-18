import React from "react";
import * as moment from "moment";
import scheduleIc from "Images/schedule-ic.png";
import { CONSTANT } from "../../constants";
import ActionButton from "../ActionButton";

const getTime = (date) => {
    return moment(date).format("h:mm a");
};
const showTitle = ({ start_date, end_date, counselor_enrollment }) => {
    const date = moment(start_date).format(CONSTANT.EARNING_DATE_FORMAT);
    return (
        <div className="section-head">
            <h3>{date}</h3>
            <p>
                {getTime(start_date)} - {getTime(end_date)}{" "}
            </p>
            <span>
                {counselor_enrollment && counselor_enrollment.backup
                    ? "Backup"
                    : "Joined"}
            </span>
        </div>
    );
};

const listSessions = (sessions, onClickSession, activeSessionId) => {
    if (!sessions.length) {
        return null;
    }
    return sessions.map((session, index) => {
        return (
            <li
                key={`session-${index}`}
                className={session.id === activeSessionId ? "active" : ""}
                onClick={() => onClickSession(session)}
            >
                {" "}
                <img alt={""} src={session.student.avatarUrl} />
                {session.student.nickname || session.student.name}
                <span>{getTime(session.scheduled_start_date)}</span>
            </li>
        );
    });
};

const SessionLeftSide = ({
    shift,
    onClickSession,
    onLeaveShift,
    activeSessionId,
    loading,
}) => {
    const { sessions = [] } = shift || {};
    return (
        <div className="session-inner">
            {showTitle(shift)}
            <div className="scheduled-outer">
                <h2>
                    <img alt={" "} src={scheduleIc} /> {sessions.length}{" "}
                    Scheduled
                </h2>
                <ul className="scheduled-session-list">
                    {listSessions(sessions, onClickSession, activeSessionId)}
                </ul>
                <div className="leave-shift">
                    <ActionButton onClick={onLeaveShift} disabled={loading}>
                        Leave shift
                    </ActionButton>
                </div>
            </div>
        </div>
    );
};
export default SessionLeftSide;
