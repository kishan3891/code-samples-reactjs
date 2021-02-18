import React from "react";
import * as moment from "moment";
import { CONSTANT } from "../../constants";

/**
 * @param {AvailableShift|CounselorShiftDetails} shift
 */
const title = (shift) => {
    let title = "";
    if (shift.counselor_enrollment) {
        title = shift.counselor_enrollment.backup ? "Backup" : "Joined";
    } else {
        const isFull = shift.count === shift.capacity;
        title = `${shift.count}/${shift.capacity} Counselors`;
        if (isFull) {
            title = `${shift.backups}/${CONSTANT.MAX_BACKUP_SLOTS} Backups`;
        }
    }
    return <div className="event-title">{title}</div>;
};
const description = (shift) => {
    if (shift.counselor_enrollment && !shift.counselor_enrollment.backup) {
        return (
            <div className="event-desc">
                <i className="icon-Schedule" />
                {shift.counselor_enrollment.students} Scheduled
            </div>
        );
    }
    return null;
};

/**
 * @param {AvailableShift} shift
 */
const button = (shift, onClick) => {
    if (!showButton(shift)) {
        return null;
    }

    return (
        <div className="event-button">
            <button
                type="button"
                onClick={() => onClick(shift)}
                className={
                    shift.count === shift.capacity
                        ? "btn btn-outline-secondary backup__button"
                        : "btn btn-outline-secondary join__button"
                }
            >
                {shift.count === shift.capacity ? "Join as Backup" : "Join"}
            </button>
        </div>
    );
};
const showButton = (shift) => {
    if (shift.counselor_enrollment) {
        // already joined
        return false;
    }
    const isFull = shift.count === shift.capacity;
    if (!isFull) {
        return true;
    }
    return shift.backups !== CONSTANT.MAX_BACKUP_SLOTS;
};

/**
 *
 * @param event
 * @param onClick
 */
const AvailableShiftRenderer = ({ event, onClick }) => {
    /**
     *
     * @type {AvailableShift}
     */
    const shift = event.extendedProps;
    return (
        <div className="event-list-details">
            <div>
                <div className="event-time">
                    {moment(event.start).format(CONSTANT.TIME_FORMAT)} -{" "}
                    {moment(event.end).format(CONSTANT.TIME_FORMAT)}
                </div>

                {title(shift)}
                {description(shift)}
                {button(shift, onClick)}
            </div>
        </div>
    );
};
export default AvailableShiftRenderer;
