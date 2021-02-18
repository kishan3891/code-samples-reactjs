import React from "react";
import moment from "moment";
import CounselorTabWrapper from "./CounselorTabWrapper";
import "./style.scss";
import * as _ from "lodash";
export default class CounselorScheduleTab extends React.Component {
    renderEnrollments = (enrollments) => {
        return enrollments.map(
            ({ backup, students, start_date, end_date }, i) => {
                const timeRange = `${moment(start_date).format(
                    "h:mma"
                )} - ${moment(end_date).format("h:mma")}`;
                return (
                    <ul className={backup ? "cyan-bg" : ""} key={i}>
                        <li>
                            <strong>{timeRange}</strong>
                        </li>
                        {students > 0 && (
                            <li>
                                <i className="icon-Schedule" />
                                {students > 1
                                    ? students + " Students"
                                    : students + " Student"}
                            </li>
                        )}
                        <li>
                            <a href="#">{backup ? "Backup" : "Joined"}</a>
                        </li>
                    </ul>
                );
            }
        );
    };

    scrollTo = (ref) => {
        if (ref) {
            ref.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    render() {
        const {
            /**
             * @type {CounselorSchedule[]}
             */
            schedule = [],
            /**
             * @type boolean
             */
            loading,
        } = this.props;
        const hasShifts = schedule && schedule.length;
        var todaySchedule = _.filter(schedule, function (s) {
            return (
                moment().format("DD/MM/YYYY") ==
                moment(s.startDate).format("DD/MM/YYYY")
            );
        });
        if (!todaySchedule.length) {
            var sortedArray = _.filter(schedule, function (n) {
                var $today = new Date();
                var $yesterday = new Date($today);
                $yesterday.setDate($today.getDate());
                return moment(n.startDate).isAfter(moment($yesterday));
            });
        }

        //const full = !loading && hasShifts;

        if (!loading && !hasShifts) {
            return (
                <CounselorTabWrapper loading={false} counselornotfound={true}>
                    <div className="row h-100">
                        <div className="col-sm-12 text-center">
                            <p style={{ color: "#989795", fontSize: "14px" }}>
                                Counselor has not signed up to any shifts.
                            </p>
                        </div>
                    </div>
                </CounselorTabWrapper>
            );
        }
        return (
            <CounselorTabWrapper loading={loading} full={true}>
                {hasShifts &&
                    schedule.map(
                        ({ startDate, endDate, enrollments }, index) => {
                            const mStartDate = moment(startDate);
                            const mEndDate = moment(endDate);
                            var scroll = false;
                            var selected = "";
                            if (!todaySchedule.length) {
                                if (sortedArray.length) {
                                    if (startDate == sortedArray[0].startDate) {
                                        scroll = true;
                                    }
                                } else {
                                    if (schedule.length - 1 === index) {
                                        scroll = true;
                                    }
                                }
                            } else {
                                selected =
                                    mStartDate.format("DD/MM/YYYY") ===
                                    moment().format("DD/MM/YYYY")
                                        ? "selected"
                                        : "";
                            }

                            return (
                                <div
                                    key={`schedule-${index}`}
                                    ref={
                                        scroll
                                            ? this.scrollTo
                                            : selected
                                            ? this.scrollTo
                                            : ""
                                    }
                                    className={`couns-schedule-row ${selected}`}
                                >
                                    <font>{mStartDate.format("D")}</font>
                                    <span>
                                        {mStartDate.format("MMM")},{" "}
                                        <strong>
                                            {mStartDate.format("ddd")}
                                        </strong>
                                    </span>
                                    {this.renderEnrollments(enrollments)}
                                </div>
                            );
                        }
                    )}
            </CounselorTabWrapper>
        );
    }
}
