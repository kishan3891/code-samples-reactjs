import React from "react";
import Content from "Components/AdminLayout/Content";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import ReactDOM from "react-dom";
import Plus from "Images/plus.png";
import "./style.scss";
import AddShift from "Components/Modals/AddShift";
import ViewShiftDetail from "Components/Modals/ViewShiftDetail";
import AlertModal from "Components/Modals/AlertModal";
import * as moment from "moment";
import Popover, { ArrowContainer } from "react-tiny-popover";
import { connect } from "react-redux";
import { CONSTANT } from "Constants";
import { bindActionCreators } from "redux";
import {
    alertActions,
    counselorActions,
    scheduleActions,
} from "../../../actions";
import { debounce } from "lodash";
import { getAvailableShiftsByDateSelector } from "../../../reducers/schedule.reducer";
import { dateWithinRange } from "../../../helpers";
import LoadingSpinner from "Components/Loading/LoadingSpinner";

const CALENDAR_CONFIG = {
    header: {
        right: "prev,today,next",
        left: "title",
    },
    buttonText: {
        today: "Today",
    },
    titleFormat: {
        month: "long",
        year: "numeric",
    },
    plugins: [timeGridPlugin],
    columnHeaderFormat: {
        weekday: "short",
        day: "numeric",
    },
};

class AdminSchedulePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewShift: false,
            isShiftDetail: false,
            isAlert: false,
            open: false,
            isPopoverOpen: false,
            popOverPosition: {},
            items: null,
            isCopyClicked: false,
            lastKnownClickedDate: null,
            confirmedCopyFromDate: null,
        };

        this.calenderRef = React.createRef();
        this._cachedDates = {};
        this.loadEvents = debounce(this.loadEvents, 1000);
    }

    loadEvents = ({ start, end }, success, failure) => {
        const { startDate, endDate } = this.state;

        let resetPopup = this.state.isPopoverOpen;
        let updateState = null;
        if (
            !startDate ||
            (startDate.valueOf() !== start.valueOf() &&
                endDate.valueOf() !== end.valueOf())
        ) {
            updateState = {
                startDate: start.valueOf(),
                endDate: end.valueOf(),
            };
            this.props.listSchedules(start, end).then(
                ({ shifts }) => {
                    success(shifts);
                },
                (e) => {
                    failure(e);
                    console.log(e, "failure");
                }
            );
        } else {
            success(this.state.items || []);
        }
        if (resetPopup) {
            updateState = {
                ...updateState,
                isPopoverOpen: false,
            };
        }
        if (updateState) {
            this.setState(updateState);
        }
    };
    renderEventDetails = ({ event, el }) => {
        const shift = event.extendedProps;

        const counselorCount =
            shift && shift.counselor_enrollment
                ? shift.counselor_enrollment.length
                : "-";

        ReactDOM.render(
            <div className="event-details">
                <div>
                    <b>
                        {moment(event.start).format(CONSTANT.TIME_FORMAT)} -{" "}
                        {moment(event.end).format(CONSTANT.TIME_FORMAT)}
                    </b>
                </div>
                <div className="schedule-title">{`${counselorCount}/${shift.capacity} Counselors`}</div>
                <div className="event-button">
                    <button
                        type="button"
                        className="btn join__button join__details__button"
                        onClick={() => this.onDetailsClicked(shift)}
                    >
                        Details
                    </button>
                </div>
            </div>,
            el
        );
        return el;
    };
    /**
     *
     * @param {AvailableShift} shift
     */
    onDetailsClicked = (shift) => {
        if (!shift.counselors) {
            this.props.loadAdminShiftDetails(shift);
        }
        this.setState({
            shift,
        });
    };
    componentDidMount() {
        const { startDate, endDate, items } = this.props;
        if (startDate && endDate && items) {
            this.applyItemsToState();
        }
    }

    handleEventClick = ({ event, el }) => {
        this.setState({
            isShiftDetail: true,
        });
    };
    handleAddCancel = (e) => {
        this.setState({
            isNewShift: false,
        });
    };
    handleViewCancel = (e) => {
        this.setState({
            shift: null,
        });
    };
    showModal = () => {
        this.setState({
            isNewShift: true,
        });
    };
    alertModal = (value) => {
        this.setState({ isAlert: value });
    };
    openPopover = (date, element) => {
        const forCopy = !this.state.confirmedCopyFromDate;
        const showCopy = this.shiftsWithinDateRange(date).length > 0;
        if (forCopy && !showCopy) {
            return;
        }

        const lastKnownClickedDate = moment(date).format(
            CONSTANT.INPUT_DATE_FORMAT
        );

        const popPosition = {
            top: element.pageY - element.offsetY,
            left: element.pageX - element.offsetX,
        };

        const sameDateClicked =
            this.state.lastKnownClickedDate === lastKnownClickedDate;

        let { isPopoverOpen, confirmedCopyFromDate } = this.state;
        if (confirmedCopyFromDate && sameDateClicked) {
            isPopoverOpen = false;
        } else if (!sameDateClicked) {
            isPopoverOpen = true;
        } else {
            isPopoverOpen = !isPopoverOpen;
        }

        this.setState({
            lastKnownClickedDate,
            isPopoverOpen,
            showCopy,

            pendingCopyDate: date,
            popOverPosition: popPosition,
        });
    };
    shiftsWithinDateRange = (date) => {
        const range = {
            start: moment(date).startOf("day"),
            end: moment(date).endOf("day"),
        };

        const {
            /**
             * @type {AvailableShift[]}
             */
            items,
        } = this.state;
        return items
            .filter((shift) => dateWithinRange(range, shift.start_date))
            .map((shift) => shift.id);
    };
    closePopover = (val) => {
        this.setState({
            isPopoverOpen: val,
            pendingCopyDate: null,
            lastKnownClickedDate: null,
        });
    };
    copyEvent = () => {
        const { pendingCopyDate } = this.state;
        this.setState({
            isCopyClicked: true,
            confirmedCopyFromDate: moment(pendingCopyDate).format(
                CONSTANT.INPUT_DATE_FORMAT
            ),
            pendingCopyDate: null,
            isPopoverOpen: false,
            // lastKnownClickedDate: null,
        });
        const copied = this.shiftsWithinDateRange(pendingCopyDate).length;
        this.props.alertSuccess(`Selected ${copied} shifts to be copied.`);
    };
    onPasteEvents = () => {
        const { confirmedCopyFromDate, pendingCopyDate } = this.state;
        this.props.alertSuccess("Copying...");
        this.props.copyShifts(
            moment(confirmedCopyFromDate).startOf("day"),
            moment(pendingCopyDate).startOf("day")
        );
        this.setState({
            confirmedCopyFromDate: null,
            isCopyClicked: false,
            pendingCopyDate: null,
            isPopoverOpen: false,
            showCopy: false,
            lastKnownClickedDate: null,
        });
    };
    onAddShift = ({ startDate, endDate, capacity }) => {
        this.props.newShift(startDate, endDate, capacity).then((added) => {
            if (added) {
                this.handleAddCancel();
            }
        });
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { startDate } = this.state;
        const { startDate: pStartDate } = this.props;
        const startDateChanged = pStartDate && startDate !== pStartDate;

        const itemsChanged = prevProps.items !== this.props.items;

        if (startDateChanged || itemsChanged) {
            this.applyItemsToState();
        }
    }
    applyItemsToState = () => {
        const { startDate, endDate, items } = this.props;
        this.commitItemsState(startDate, endDate, items);
    };

    commitItemsState = (startDate, endDate, items) => {
        const shifts = items.map((shift) => ({
            ...shift,
            className: "event-join",
        }));
        const { shift } = this.state;
        this.setState({
            startDate: startDate,
            endDate: endDate,
            shift: shift ? shifts.find((s) => s._id === shift._id) : shift,
            items: shifts,
        });
        if (this.calenderRef.current) {
            let calendarApi = this.calenderRef.current.getApi();
            calendarApi.refetchEvents();
        }
    };
    logEvent = (event) => {
        console.log({ event });
    };
    onViewCounselorDetails = (counselor) => {
        this.props.setActiveCounselor(counselor);
    };
    onUpdateShiftCapacity = (shiftId, capacity) => {
        this.props.updateShiftCapacity(shiftId, capacity);
    };
    onDeleteShift = (shift_id) => {
        this.props.deleteShift(shift_id);
    };
    onUpdateCounselor = (counselor) => {
        this.props.updateCounselor(
            counselor.id,
            counselor.profileDocumentId,
            counselor
        );
    };
    updateScrollerHeight() {
        const bodyHeight = document.body.clientHeight;
        var headerElHeight = document.getElementsByClassName(
            "fc-header-toolbar"
        )[0].clientHeight;
        return bodyHeight - headerElHeight;
    }

    render() {
        const {
            isPopoverOpen,
            popOverPosition,
            isCopyClicked,
            isNewShift,
            shift,

            showCopy,
            lastKnownClickedDate,
            confirmedCopyFromDate,
        } = this.state;
        const { loaders, config } = this.props;
        const showPasteButton =
            isCopyClicked && lastKnownClickedDate !== confirmedCopyFromDate;
        var scrollTime = moment().format("HH:mm:ss");
        return (
            <Content>
                <div className="schedule-page admin-schedule">
                    <LoadingSpinner
                        wrapperClassName="calenderLoader"
                        spinning={loaders.availableShifts}
                        dimensions="large"
                    >
                        <Popover
                            isOpen={isPopoverOpen}
                            position={["bottom", "left"]}
                            padding={10}
                            align={"end"}
                            contentLocation={popOverPosition}
                            content={({
                                position,
                                targetRect,
                                popoverRect,
                            }) => (
                                <ArrowContainer
                                    position={position}
                                    targetRect={targetRect}
                                    popoverRect={popoverRect}
                                    arrowColor={"red"}
                                    arrowSize={10}
                                    arrowStyle={{ opacity: 0.7 }}
                                    onClick={() =>
                                        this.setState({
                                            isPopoverOpen: !isPopoverOpen,
                                        })
                                    }
                                >
                                    <div className="popover-content">
                                        <div className="popover-buttons">
                                            {showCopy && (
                                                <button
                                                    onClick={this.copyEvent}
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                >
                                                    Copy
                                                </button>
                                            )}
                                            {showPasteButton && (
                                                <button
                                                    onClick={this.onPasteEvents}
                                                    type="button"
                                                    className="btn btn-outline-secondary schedule-paste"
                                                >
                                                    Paste
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </ArrowContainer>
                            )}
                        >
                            <FullCalendar
                                ref={this.calenderRef}
                                header={CALENDAR_CONFIG.header}
                                buttonText={CALENDAR_CONFIG.buttonText}
                                titleFormat={CALENDAR_CONFIG.titleFormat}
                                defaultView={"timeGridWeek"}
                                plugins={CALENDAR_CONFIG.plugins}
                                eventColor={"#5800AA"}
                                eventTextColor={"#FFFFFF"}
                                allDaySlot={false}
                                contentHeight={this.updateScrollerHeight}
                                columnHeaderFormat={
                                    CALENDAR_CONFIG.columnHeaderFormat
                                }
                                navLinks={true}
                                navLinkDayClick={this.openPopover}
                                eventRender={this.renderEventDetails}
                                events={this.loadEvents}
                                eventClick={this.handleEventClick}
                                scrollTime={scrollTime}
                                columnHeaderText={(date) => {
                                    return moment(date).format("ddd D");
                                }}
                            />
                        </Popover>
                    </LoadingSpinner>
                </div>
                <div className="create-shift-btn">
                    <button onClick={this.showModal} className="explore-btn">
                        <img src={Plus} alt="plus" />
                    </button>
                </div>
                {isNewShift && (
                    <AddShift
                        {...config}
                        alert={this.props.alert}
                        onCancel={this.handleAddCancel}
                        onSave={this.onAddShift}
                        saving={loaders.adding}
                    />
                )}
                {shift && (
                    <ViewShiftDetail
                        shift={shift}
                        onUpdateCounselor={this.onUpdateCounselor}
                        onViewCounselorDetails={this.onViewCounselorDetails}
                        loading={loaders.details}
                        shiftConfig={config}
                        saving={loaders.updating}
                        onDeleteShift={this.onDeleteShift}
                        onUpdateShiftCapacity={this.onUpdateShiftCapacity}
                        onCancel={this.handleViewCancel}
                    />
                )}
                {this.state.isAlert && (
                    <AlertModal
                        text={
                            "Please clear all shifts from this date<br/> before pasting."
                        }
                        buttonText={"Got it"}
                        onClick={() => this.alertModal(false)}
                    />
                )}
            </Content>
        );
    }
}

function mapStateToProps(state) {
    const { loaders } = state.schedule;
    const { config } = state.app;

    return {
        loaders,
        ...getAvailableShiftsByDateSelector(state),
        config,
    };
}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            ...scheduleActions,
            setActiveCounselor: counselorActions.setActiveCounselor,
            updateCounselor: counselorActions.updateCounselor,
            alertSuccess: alertActions.success,
        },
        dispatch
    );

const connectedSchedule = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminSchedulePage);
export { connectedSchedule as AdminSchedulePage };
