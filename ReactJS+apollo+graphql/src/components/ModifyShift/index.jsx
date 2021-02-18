import React from "react";
import { DatePicker, Select } from "antd";
import { CONSTANT } from "../../constants";
import { isValidInput } from "../../utils/isValidInput";
import * as moment from "moment";
import { startTimeOption, endTimeOption } from "../../utils/timeOption";
import { newValidator } from "../../helpers";
import ActionButton from "../ActionButton";
import { DropDownArrow } from "../Icons/drop-down-arrow";
import classnames from "classnames";

function disabledDate(current) {
    return current && current < moment().startOf("day");
}

const TIME_OPTIONS = startTimeOption.map((item) => (
    <Select.Option key={item} value={item}>
        {item}
    </Select.Option>
));
const END_TIME_OPTION = endTimeOption.map((item) => (
    <Select.Option key={item} value={item}>
        {item}
    </Select.Option>
));
export default class ModifyShift extends React.Component {
    static getDerivedStateFromProps(props, state) {
        const shiftId = props.shift?.id || props.shift?._id;
        if (shiftId && !state.shift.id) {
            return {
                shift: {
                    id: shiftId,
                    capacity: props.shift.capacity,
                    startTime: moment(props.shift.start_date).format(
                        CONSTANT.TIME_FORMAT
                    ),
                    endTime: moment(props.shift.end_date).format(
                        CONSTANT.TIME_FORMAT
                    ),

                    date: moment(props.shift.start_date),
                },
            };
        }
        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            shift: {
                date: moment().add(1, "day"),
                startTime: "",
                endTime: undefined,
                capacity: "",
                startDate: "",
                endDate: "",
            },
            submitted: false,
            endTimeError: null,
            dateHasChanged: false,
        };
        this.validator = newValidator();
    }

    dateForTime = (time) => {
        const dateFormatted = this.state.shift.date.format("MM-DD-YYYY");
        return moment(`${dateFormatted} ${time}`, "MM-DD-YYYY h:mma");
    };

    /**
     * Accounts for span days
     * @param startTime
     * @param endTime
     * @return {moment.Moment}
     */
    computeEndTime(startTime, endTime) {
        const date = this.dateForTime(endTime || startTime);
        if (endTime && startTime.includes("pm") && endTime.includes("am")) {
            date.add(1, "day");
        }
        return date;
    }

    handleStateChange = (field, value) => {
        if (field === "date") this.setState({ dateHasChanged: true });

        const { shift } = this.state;
        const endTimePrevValue = shift.endTime;
        shift[field] = value;
        const { minShiftHoursDuration, maxShiftHoursDuration } = this.props;
        let endTimeError = null;
        let startDateTime = this.state.startDateTime;
        let endDateTime = this.state.endDateTime;

        const hasEndTime = !!shift.endTime;
        const recomputeTimes =
            startDateTime ||
            endDateTime ||
            field === "startTime" ||
            field === "endTime";

        if (recomputeTimes) {
            startDateTime = this.dateForTime(shift.startTime);

            endDateTime = this.computeEndTime(shift.startTime, shift.endTime);

            const minShiftEndTime = startDateTime
                .clone()
                .add(minShiftHoursDuration, "hour");
            if (endDateTime.isBefore(minShiftEndTime, "hour")) {
                endDateTime = minShiftEndTime;
                if (hasEndTime) {
                    endTimeError = `Must be atleast ${minShiftHoursDuration} hours after start time.`;
                }
            }

            const maxShiftEndTime = startDateTime
                .clone()
                .add(maxShiftHoursDuration, "hour");

            if (endDateTime.isAfter(maxShiftEndTime)) {
                endDateTime = maxShiftEndTime;
                if (hasEndTime) {
                    endTimeError = `Must be less then ${maxShiftHoursDuration} hours.`;
                }
            }

            shift.endTime = endDateTime.format(CONSTANT.TIME_FORMAT);
            if (!endTimePrevValue) {
                // if no previous value then lets su
                endTimeError = null;
            }
        }
        console.log(endDateTime, "endtime");
        this.setState({ shift, endTimeError, startDateTime, endDateTime });
    };

    buildDate = (date, time) => {
        date = moment(date);
        const dateTime = moment(time, CONSTANT.TIME_FORMAT);
        date.second(0).millisecond(0).minutes(0).hour(dateTime.hour());
        return date;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.validator.allValid() && !this.state.endTimeError) {
            const { shift, startDateTime, endDateTime } = this.state;

            this.props.onSave({
                startDate: startDateTime,
                endDate: endDateTime,
                id: shift.id || shift._id,
                capacity: shift.capacity,
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    getCapacityOptions = () => {
        const { maxShiftCapacity } = this.props;
        return Array.from(Array(maxShiftCapacity), (_, capacity) => {
            capacity++;
            return (
                <Select.Option key={`capacity-${capacity}`} value={capacity}>
                    {capacity}
                </Select.Option>
            );
        });
    };

    render() {
        const {
            shift: { id, startTime, endTime, date, capacity, submitted },
            endTimeError,
            dateHasChanged,
        } = this.state;
        const { buttonText } = this.props;
        return (
            <form
                onSubmit={this.handleSubmit}
                className={classnames(
                    "add-schedule",
                    !id && "add-schedule-without-details"
                )}
            >
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                            <label>Date</label>
                            <DatePicker
                                size="large"
                                disabled={!!id}
                                defaultValue={id && date}
                                onChange={(fullDate, dateString) =>
                                    this.handleStateChange("date", fullDate)
                                }
                                placeholder="MM / DD / YYYY"
                                suffixIcon={
                                    <DropDownArrow className="ant-select-suffix" />
                                }
                                allowClear={false}
                                format={CONSTANT.INPUT_DATE_FORMAT}
                                disabledDate={disabledDate}
                                showToday={false}
                                className={
                                    dateHasChanged &&
                                    "ant-date-picker-has-value " +
                                        "ant-calendar-picker ant-calendar-picker-large " +
                                        isValidInput(
                                            "date",
                                            this.validator,
                                            submitted
                                        )
                                }
                            />
                            {this.validator.message("date", date, "required")}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <label htmlFor="state">Start</label>
                            <Select
                                defaultValue={id && startTime}
                                disabled={!!id}
                                onChange={(e) =>
                                    this.handleStateChange("startTime", e)
                                }
                                placeholder="Choose one"
                                size="large"
                                suffixIcon={
                                    <DropDownArrow className="ant-select-suffix" />
                                }
                            >
                                {TIME_OPTIONS}
                            </Select>
                            {this.validator.message(
                                "startTime",
                                startTime,
                                "required"
                            )}
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <label htmlFor="state">End</label>

                            <Select
                                disabled={!!id}
                                value={endTime}
                                suffixIcon={
                                    <DropDownArrow className="ant-select-suffix" />
                                }
                                name="endTime"
                                onChange={(e) =>
                                    this.handleStateChange("endTime", e)
                                }
                                placeholder="Choose one"
                                size="large"
                                className={
                                    endTimeError != null
                                        ? "select-input-error"
                                        : ""
                                }
                            >
                                {END_TIME_OPTION}
                            </Select>
                            {this.validator.message(
                                "endTime",
                                endTime,
                                "required"
                            )}
                        </div>
                    </div>
                    {!this.props.loading &&
                        this.props.alert &&
                        this.props.alert.type === "error" && (
                            <div className="error-msg">
                                {this.props.alert.message}
                            </div>
                        )}
                    <div className="error-msg">{endTimeError}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <Select
                        defaultValue={id && capacity}
                        placeholder="Choose one"
                        size="large"
                        onChange={(e) => this.handleStateChange("capacity", e)}
                        name="capacity"
                        suffixIcon={
                            <DropDownArrow className="ant-select-suffix" />
                        }
                    >
                        {this.getCapacityOptions()}
                    </Select>
                    {this.validator.message("capacity", capacity, "required")}
                </div>
                <div className="send-invitation">
                    <ActionButton
                        disabled={
                            !dateHasChanged ? true : !this.validator.allValid()
                        }
                        processing={this.props.saving}
                    >
                        {buttonText}
                    </ActionButton>
                </div>
            </form>
        );
    }
}
