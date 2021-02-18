import * as moment from "moment";
import { CONSTANT } from "../../constants";
import React from "react";

const MyShiftRenderer = ({ event, onClick }) => {
    /**
     * @type {CounselorEnrollment}
     * */
    const enrollment = event.extendedProps;

    return (
        <td className="my-schedule-table-wrapper">
            <div
                className={
                    "couns-schedule-row " +
                    (enrollment.backup ? "list-view-backup" : "")
                }
                onClick={() => onClick(event)}
            >
                <ul>
                    <li>
                        <strong>
                            {moment(event.start).format(CONSTANT.TIME_FORMAT)} -{" "}
                            {moment(event.end).format(CONSTANT.TIME_FORMAT)}
                        </strong>
                    </li>
                    {!enrollment.backup && enrollment.students > 0 && (
                        <li>
                            <i className="icon-Schedule" />
                            {enrollment.students > 1
                                ? enrollment.students + " Students"
                                : enrollment.students + " Student"}
                        </li>
                    )}
                    <li>{enrollment.backup ? "Backup" : "Joined"}</li>
                </ul>
            </div>
        </td>
    );
};
export default MyShiftRenderer;
