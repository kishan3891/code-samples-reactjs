import React from "react";
import "./style.scss";
import Content from "Components/Layout/Content";
import FullCalendar from "@fullcalendar/react";

import counslrTimeGridPlugin from "./timegrid";
import listPlugin from "Lib/list/main.esm";
import ReactDOM from "react-dom";
import SessionModal from "Components/SessionModal";
import AlertModal from "Components/Modals/AlertModal";

import { connect } from "react-redux";
import LoadingSpinner from "Components/Loading/LoadingSpinner";
import { bindActionCreators } from "redux";
import { counselorActions, scheduleActions } from "../../actions";
import AvailableShiftRenderer from "./AvailableShiftRenderer";
import { getScheduleViewShiftByDateSelector } from "../../reducers/schedule.reducer";
import MyShiftRenderer from "./MyShiftRenderer";
import moment from "moment";
import { CONSTANT } from "Constants";

const GRID_WEEK_VIEW_NAME = "timeGridWeek";
const LIST_WEEK_VIEW_NAME = "listWeek";
const CALENDAR_CONFIG = {
    header: {
        right: "prev,today,next",
        left: `title,${GRID_WEEK_VIEW_NAME},${LIST_WEEK_VIEW_NAME}`,
    },
    buttonText: {
        week: "All",
        list: "My Schedule",
        today: "Today",
    },
    titleFormat: {
        month: "long",
        year: "numeric",
    },
    defaultView: GRID_WEEK_VIEW_NAME,
    plugins: [counslrTimeGridPlugin, listPlugin],
    columnHeaderFormat: {
        day: "numeric",
        weekday: "short",
    },
};

class SchedulePage extends React.Component {
    calendarComponentRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            showingDetails: false,
            isAlert: false,
            events: {},
            items: null,
            defaultDate: new Date(),
            currentView: GRID_WEEK_VIEW_NAME,
            scroll: true,
        };
        this._callback = {};
        //this._loadEvents = debounce(this._loadEvents, 1000);
        this._eventSourcesByName = {
            timeGridWeek: {
                id: GRID_WEEK_VIEW_NAME,
                events: this._buildEventsLoader(
                    GRID_WEEK_VIEW_NAME,
                    this.loadAvailableShifts
                ),
            },

            listWeek: {
                id: LIST_WEEK_VIEW_NAME,
                events: this._buildEventsLoader(
                    LIST_WEEK_VIEW_NAME,
                    this.loadMySchedule
                ),
            },
        };
    }

    _buildEventsLoader = (forView, eventsLoaders) => {
        return (info, success, failure) => {
            const { loadingView } = this.state;

            if (this.hasViewingRangeChanged(info.start, info.end)) {
                this.props.prepareLoadingState(forView);
                if (forView !== loadingView) {
                    this.setState({
                        loadingView: forView,
                    });
                }
            }

            this._loadEvents(forView, eventsLoaders, info, success, failure);
        };
    };

    hasViewingRangeChanged = (start, end) => {
        const { startDate, endDate } = this.state;
        return (
            !startDate ||
            (startDate.valueOf() !== start.valueOf() &&
                endDate.valueOf() !== end.valueOf())
        );
    };

    _loadEvents = (forView, itemsLoader, { start, end }, success, failure) => {
        const { startDate, endDate } = this.state;
        if (
            !startDate ||
            (startDate.valueOf() !== start.valueOf() &&
                endDate.valueOf() !== end.valueOf())
        ) {
            const canApply = () => this.state.currentView === forView;
            this.setState({
                startDate: start.valueOf(),
                endDate: end.valueOf(),
            });
            itemsLoader(start, end).then(
                ({ shifts, schedule }) => {
                    if (canApply()) {
                        success(schedule || shifts);
                        this.setState({
                            loadingView: null,
                            switchingViews: null,
                        });
                    }
                },
                (e) => {
                    if (canApply()) failure(e);
                }
            );
        } else {
            success(this.state.items || []);
        }
    };

    loadMySchedule = (start, end) => {
        return this.props.loadMySchedule(start, end);
    };
    loadAvailableShifts = (start, end) => {
        const counselorId = this.props.user.id;
        return this.props.availableShifts(start, end, counselorId);
    };
    componentWillUnmount() {
        this.props.setScheduleViewState({ currentView: GRID_WEEK_VIEW_NAME });
    }

    componentDidMount() {
        this.updateEventSource(GRID_WEEK_VIEW_NAME);
    }

    updateScrollerHeight() {
        const bodyHeight = document.body.clientHeight;
        var headerElHeight = document.getElementsByClassName(
            "fc-header-toolbar"
        )[0].clientHeight;
        return bodyHeight - headerElHeight;
    }

    updateEventSource = (viewName) => {
        const api = this.calendarComponentRef.current.getApi();
        const prevEventSource = api.getEventSourceById(
            viewName === GRID_WEEK_VIEW_NAME
                ? LIST_WEEK_VIEW_NAME
                : GRID_WEEK_VIEW_NAME
        );
        if (prevEventSource) {
            prevEventSource.remove();
        }
        this.setState(
            {
                switchingViews: this.state.currentView,
                startDate: null,
                endDate: null,
            },
            () => {
                api.addEventSource(this._eventSourcesByName[viewName]);
                this.props.setScheduleViewState({ currentView: viewName });
            }
        );
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { currentView } = this.props;

        const currentViewChanged = currentView !== prevProps.currentView;

        const itemsChanged = prevProps.items !== this.props.items;
        let updatedState;
        if (itemsChanged || currentViewChanged) {
            updatedState = {
                currentView,
                items: this.props.items,
            };
            if (this.state.scroll) {
                if (currentView === "timeGridWeek") {
                    var hours = moment().format("HH");
                    var minute = moment().format("mm");
                    var currTime = "";
                    if (minute >= 30) {
                        currTime = hours + ":30:00";
                    } else {
                        currTime = hours + ":00:00";
                    }
                    if (
                        document.querySelector("[data-time='" + currTime + "']")
                    ) {
                        var data = document.querySelector(
                            "[data-time='" + currTime + "']"
                        ).offsetTop;
                        if (data) {
                            //data.scrollIntoView(true);
                            var scrollid = document.getElementsByClassName(
                                "fc-scroller"
                            )[0];
                            scrollid.id = "fc-scroll";
                            if (minute >= 10 && minute < 25) {
                                data = data + 25;
                            } else if (minute >= 25 && minute < 30) {
                                data = data + 20;
                            } else if (minute >= 30 && minute < 40) {
                                data = data + 30;
                            } else if (minute >= 40 && minute < 50) {
                                data = data + 40;
                            } else if (minute >= 50 && minute <= 59) {
                                data = data + 50;
                            }
                            console.log(data, "data");
                            document.getElementById(
                                "fc-scroll"
                            ).scrollTop = data;
                        }
                    }
                }
            }
        }
        if (prevProps.shift && !this.props.shift && prevState.showingDetails) {
            updatedState = {
                ...updatedState,
                showingDetails: false,
            };
        }
        if (updatedState) {
            this.setState(updatedState, () => {
                if (updatedState.items) {
                    this.refetchEvents();
                }
            });
        }
    }

    onJoinShift = (shift) => {
        this.setState({
            scroll: false,
        });
        this.props.joinShift(shift.shift_states_id);
    };

    handleCancel = (e) => {
        this.setState({
            showingDetails: false,
            scroll: false,
        });
    };
    alertModal = (value) => {
        this.setState({ isAlert: value });
    };

    onEventClicked = ({ event: { extendedProps: object } }) => {
        if (object.counselor_enrollment) {
            this.loadShiftDetails(object._id);
        } else if (object.shift_id) {
            this.loadShiftDetails(object.shift_id);
        }
    };
    loadShiftDetails = (shiftId) => {
        this.props.loadCounselorShiftDetails(shiftId);
        this.setState({
            showingDetails: true,
            scroll: false,
        });
    };
    refetchEvents = () => {
        if (this.calendarComponentRef.current) {
            let calendarApi = this.calendarComponentRef.current.getApi();
            calendarApi.refetchEvents();
        }
    };
    viewSkeletonRender = (e) => {
        const { currentView } = this.state;
        if (currentView !== e.view.type) {
            this.updateEventSource(e.view.type);
            if (e.view.type === "timeGridWeek") {
                this.setState({
                    scroll: true,
                });
            }
        } else {
            this.setState({
                switchingViews: null,
            });
        }
    };
    renderEventDetails = ({ event, el, view }) => {
        const content =
            view.type === "listWeek" ? (
                <MyShiftRenderer
                    event={event}
                    onClick={({ extendedProps }) =>
                        this.loadShiftDetails(extendedProps.shift_id)
                    }
                />
            ) : (
                <AvailableShiftRenderer
                    event={event}
                    onClick={this.onJoinShift}
                />
            );

        ReactDOM.render(content, el);
        return el;
    };
    renderNoEvents = ({ el }) => {
        const onClick = (e) => {
            e.preventDefault();
            this.calendarComponentRef.current
                .getApi()
                .changeView(GRID_WEEK_VIEW_NAME);
        };

        const noEvents = (
            <>
                <img src={CONSTANT.SEARCH_IMAGE} alt="Search" />
                You haven't joined any shifts. Go back to{" "}
                <a href="" onClick={onClick}>
                    All
                </a>{" "}
                and join a shift
                <br /> to see it in your schedule.
            </>
        );

        ReactDOM.render(noEvents, el);

        return el;
    };
    onEventSourceSuccess = (events) => {
        return events.map((shift) => {
            return {
                ...shift,
                className: shift.counselor_enrollment
                    ? `has-counselor-enrollment ${
                          shift.counselor_enrollment.backup ? "as-backup" : ""
                      }`
                    : "event-join",
            };
        });
    };
    render() {
        const { loaders, currentView } = this.props;
        const { defaultDate, showingDetails } = this.state;
        const isLoading = loaders.availableShifts || loaders.mySchedule;

        // grid view to flow correctly
        var scrollTime = moment().format("HH:mm:ss");
        return (
            <Content>
                <div className="schedule-page admin-schedule user-schedule">
                    <LoadingSpinner
                        wrapperClassName="calenderLoader"
                        spinning={isLoading}
                        dimensions={`large`}
                    >
                        <FullCalendar
                            header={CALENDAR_CONFIG.header}
                            buttonText={CALENDAR_CONFIG.buttonText}
                            titleFormat={CALENDAR_CONFIG.titleFormat}
                            defaultView={CALENDAR_CONFIG.defaultView}
                            plugins={CALENDAR_CONFIG.plugins}
                            allDaySlot={false}
                            defaultDate={defaultDate}
                            listDayFormat={false}
                            eventClick={this.onEventClicked}
                            navLinks={false}
                            contentHeight={this.updateScrollerHeight}
                            columnHeaderFormat={
                                CALENDAR_CONFIG.columnHeaderFormat
                            }
                            ref={this.calendarComponentRef}
                            columnHeaderText={(date) => {
                                return moment(date).format("ddd D");
                            }}
                            eventRender={this.renderEventDetails}
                            viewSkeletonRender={this.viewSkeletonRender}
                            eventSourceSuccess={this.onEventSourceSuccess}
                            renderNoEvents={this.renderNoEvents}
                            scrollTime={scrollTime}
                        />
                    </LoadingSpinner>
                </div>

                {showingDetails && (
                    <SessionModal
                        visible={true}
                        onCancel={() => this.handleCancel()}
                    />
                )}

                {this.state.isAlert && (
                    <AlertModal
                        className={"modal-text text-left"}
                        title={"Max hours"}
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
    const { loaders, shift } = state.schedule || {};
    const { counselor } = state.counselor || {};
    const { user } = state.authentication;

    return {
        user,
        shift,
        ...getScheduleViewShiftByDateSelector(state),
        loaders,
        counselor,
    };
}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            ...scheduleActions,
            ...counselorActions,
        },
        dispatch
    );

const connectedSchedule = connect(
    mapStateToProps,
    mapDispatchToProps
)(SchedulePage);

export { connectedSchedule as SchedulePage };
