import PropTypes from "prop-types";
import React from "react";
import * as moment from "moment";
import Scrollbar from "react-scrollbars-custom";
import { Link } from "react-router-dom";
import { CONSTANT } from "Constants";

class MySchedule extends React.Component {
    render() {
        const { items, onEnrollmentClicked, loading } = this.props;
        const todayDate = moment().format("ddd DD");

        let scheduleClass;

        let myScheduleList = items.flatMap((item, index) => {
            const scheduleList = item.enrollments.map((enrollment) => {
                return (
                    <ul
                        className={enrollment.backup ? "as-backup" : ""}
                        key={`${enrollment.shift_id}_${enrollment.shift_states_id}`}
                    >
                        <li>
                            {moment(enrollment.start_date).format(
                                CONSTANT.TIME_FORMAT
                            )}{" "}
                            -{" "}
                            {moment(enrollment.end_date).format(
                                CONSTANT.TIME_FORMAT
                            )}
                        </li>
                        <li>{enrollment.backup ? "backup" : "Joined"}</li>
                        <li>
                            <img src={CONSTANT.SCHEDULE_ICON} alt="" />
                            {enrollment.students} Scheduled
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => onEnrollmentClicked(enrollment)}
                            >
                                Details
                            </a>
                        </li>
                    </ul>
                );
            });

            if (item.enrollments.length > 1) {
                scheduleClass = "schedule-box merge-box";
            } else if (item.enrollments.length === 1) {
                scheduleClass = "schedule-box single-box";
            } else {
                scheduleClass = "schedule-box";
            }

            return (
                <div className={scheduleClass} key={`shift-${index}`}>
                    <h6>
                        {moment(item.start).format("ddd DD") === todayDate
                            ? "Today"
                            : moment(item.start).format("ddd DD")}
                    </h6>
                    <div className="schedule-box-inner">{scheduleList}</div>
                </div>
            );
        });
        if (!myScheduleList.length) {
            myScheduleList = (
                <div className="empty-myschedule">
                    <div className="empty-myschedule-inner">
                        <img src={CONSTANT.SEARCH_IMAGE} />
                    </div>
                    <p>
                        No shifts scheduled. Head over to the{" "}
                        <Link to="/schedule">Schedule tab</Link> to sign up for
                        shifts
                    </p>
                </div>
            );
        }

        return (
            <React.Fragment>
                <div className={"my-schedule " + (loading ? "loader-box" : "")}>
                    <div className="shedule-top-head clearfix">
                        <h4>My Schedule</h4>
                        <Link to="/schedule">View Full Schedule</Link>
                    </div>
                    {!loading && (
                        <Scrollbar noScrollY={true} style={{ height: 180 }}>
                            <div className="schedule-time">
                                {myScheduleList}
                            </div>
                        </Scrollbar>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

MySchedule.propTypes = {
    onShiftClicked: PropTypes.func,
    loading: PropTypes.bool,
};

MySchedule.defaultProps = {
    items: [],
    loading: true,
};

export default MySchedule;
