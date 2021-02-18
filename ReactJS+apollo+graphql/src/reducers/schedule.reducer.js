import { scheduleConstants } from "../constants";
import { createReducer, createSelector } from "@reduxjs/toolkit";
import { createDataReducers, recordUpdate } from "./helpers";
import * as _ from "lodash";
import moment from "moment";

const DEFAULT_SCHEDULE_CURRENT_VIEW = "timeGridWeek";
const SCHEDULE_LIST_VIEW_NAME = "listWeek";

/**
 * @typedef ScheduleStateLoaders
 * @property {boolean} schedule
 * @property {boolean} availableShifts
 * @property {boolean} mySchedule
 */
/**
 * @typedef ScheduleState
 * @property {ScheduleStateLoaders} loaders
 * @property {CounselorShiftDetails} shift
 * @property {CounselorSchedule[]} homeSchedule
 * @property {CounselorSchedule[]} schedule
 * @property {AvailableShift[]} availableShifts
 * @property {{start: null|number, currentView: string, end: null|number}} scheduleView
 */

/**
 *
 * @type {ScheduleState}
 */
const initialState = {
    /**
     * @type {CounselorShiftDetails}
     */
    shift: {},
    /**
     * @type {CounselorSchedule[]}
     */
    homeSchedule: [],
    /**
     * @type {CounselorSchedule[]}
     */
    schedule: [],
    /**
     * @type {AvailableShift[]}
     */
    availableShifts: [],
    scheduleView: {
        currentView: DEFAULT_SCHEDULE_CURRENT_VIEW,
        start: null,
        end: null,
    },

    loaders: {
        schedule: true,
        adding: false,
        updating: false,
        mySchedule: true,
        availableShifts: false,
    },
};

const newShiftReducers = createDataReducers(
    scheduleConstants.NEW_SHIFT,
    "adding",
    (state, { payload: { shift } }) => {
        return {
            ...state,
            availableShifts: [...state.availableShifts, shift],
        };
    }
);
const loadDetailsReducers = createDataReducers(
    scheduleConstants.LOAD_SHIFT_DETAILS,
    "details",
    (state, { payload: { shift } }) => {
        const updatedShift = {
            ...state.availableShifts.find((s) => s.id === shift.id),
            ...shift,
        };
        return {
            ...state,
            shift: updatedShift,
            availableShifts: state.availableShifts.map((s) => {
                return s.id === updatedShift.id ? updatedShift : s;
            }),
        };
    }
);

const deleteShiftReducers = createDataReducers(
    scheduleConstants.DELETE_SHIFT,
    "deleting",
    (state, { payload: { shiftId } }) => {
        return {
            ...state,
            shift: state.shift?.id === shiftId ? null : state.shift,
            availableShifts: state.availableShifts.filter((s) => {
                return s.id !== shiftId;
            }),
        };
    }
);
const setScheduleViewStateHook = (state, { payload: [start, end] }) => {
    return {
        ...state,
        scheduleView: {
            ...state.scheduleView,
            start: moment(start).utc(),
            end: moment(end).utc(),
        },
    };
};
const loadAvailableShiftsReducers = createDataReducers(
    scheduleConstants.LOAD_AVAILABLE_SHIFTS,
    "availableShifts",
    (state, { payload: { shifts } }) => {
        return {
            ...state,
            availableShifts: _.uniqBy(
                [...state.availableShifts, ...shifts],
                "id"
            ),
        };
    },
    {
        start: setScheduleViewStateHook,
    }
);

const joinShiftReducers = createDataReducers(
    scheduleConstants.JOIN_SHIFT,
    "joining",
    (state, { payload: { enrollment } }) => {
        return {
            ...state,

            availableShifts: state.availableShifts.map((shift) => {
                if (shift.shift_states_id === enrollment.shift_states_id) {
                    return {
                        ...shift,
                        //  className: "has-counselor-enrollment",
                        count: shift.count + 1,
                        counselor_enrollment: enrollment,
                    };
                }
                return shift;
            }),
        };
    }
);

const loadMyScheduleReducers = createDataReducers(
    scheduleConstants.LOAD_MY_SCHEDULE,
    "mySchedule",
    (state, { payload: { schedule, forHome } }) => {
        return {
            ...state,
            [forHome ? "homeSchedule" : "schedule"]: schedule,
        };
    },
    {
        start: setScheduleViewStateHook,
    }
);

const composeShiftsState = (scheduleView, shifts) => {
    const start = moment(scheduleView.start);
    const end = moment(scheduleView.end);
    return {
        startDate: start.valueOf(),
        endDate: end.valueOf(),
        currentView: scheduleView.currentView,
        items: shifts.filter((shift) => {
            return (
                start.isSameOrBefore(shift.start) &&
                end.isSameOrAfter(shift.end)
            );
        }),
    };
};
export const getAvailableShiftsByDateSelector = createSelector(
    (state) => state.schedule.scheduleView,
    (state) => state.schedule.availableShifts,
    composeShiftsState
);

const getMyScheduleSelector = createSelector(
    (state) => state.schedule.schedule,
    /**
     *
     * @param {CounselorSchedule[]} schedule
     */
    (schedule) =>
        schedule.flatMap(({ enrollments }) => {
            return enrollments;
        })
);
const getShiftsForActiveViewSelector = createSelector(
    (state) => state.schedule.scheduleView.currentView,
    (state) => state.schedule.availableShifts,
    getMyScheduleSelector,
    (currentView, availableShifts, schedule) => {
        return currentView === DEFAULT_SCHEDULE_CURRENT_VIEW
            ? availableShifts
            : schedule;
    }
);

export const getScheduleViewShiftByDateSelector = createSelector(
    (state) => state.schedule.scheduleView,
    getShiftsForActiveViewSelector,
    composeShiftsState
);
const loaderForScheduleView = (view) => {
    return view === DEFAULT_SCHEDULE_CURRENT_VIEW
        ? "availableShifts"
        : "mySchedule";
};

/**
 *
 * @param {CounselorSchedule[]} schedule
 * @param enrollmentId
 */
const removeShiftByEnrollmentId = (schedule, enrollmentId) => {
    return _.filter(
        schedule.map((day) => {
            const enrollments = day.enrollments.filter(
                (enrollment) => enrollment.id !== enrollmentId
            );
            // if no enrollments go ahead and remove the schedule for that day
            if (!enrollments.length) {
                return null;
            }
            return {
                ...day,
                enrollments,
            };
        })
    );
};

const leaveShiftReducers = createDataReducers(
    scheduleConstants.LEAVE_SHIFT,
    "leaveShift",
    (state, { payload: { enrollment } }) => {
        return {
            ...state,
            shift:
                state.shift?.enrollment_id === enrollment.id
                    ? null
                    : state.shift,
            homeSchedule: removeShiftByEnrollmentId(
                state.homeSchedule,
                enrollment.id
            ),
            schedule: removeShiftByEnrollmentId(state.schedule, enrollment.id),
            availableShifts: state.availableShifts.map(
                ({ counselor_enrollment, ...shift }) => {
                    const found = counselor_enrollment?.id === enrollment.id;

                    return {
                        ...shift,
                        counselor_enrollment: found
                            ? null
                            : counselor_enrollment,
                        count: found ? shift.count - 1 : shift.count,
                    };
                }
            ),
        };
    }
);

const copyShiftsReducers = createDataReducers(
    scheduleConstants.COPY_SHIFTS,
    "copying",
    (state, { payload: { shifts } }) => {
        return {
            ...state,
            availableShifts: [...state.availableShifts, ...shifts],
        };
    }
);

const prepareLoadingStateHandler = (
    state,
    { payload: { currentView, loading } }
) => {
    const loaderName = loaderForScheduleView(currentView);

    const otherViewLoaderName = loaderForScheduleView(
        currentView === DEFAULT_SCHEDULE_CURRENT_VIEW
            ? SCHEDULE_LIST_VIEW_NAME
            : DEFAULT_SCHEDULE_CURRENT_VIEW
    );
    const currentLoadingState = state.loaders[loaderName];
    if (!currentLoadingState) {
        return {
            ...state,
            loaders: {
                ...state.loaders,
                [loaderName]: loading,
                [otherViewLoaderName]: false,
            },
        };
    }
    return state;
};

const updateShiftCapacityHandler = (
    state,
    { payload: { shiftId, capacity } }
) => ({
    ...state,
    shift: recordUpdate(state.shift, shiftId, { capacity }),

    availableShifts: recordUpdate(state.availableShifts, shiftId, { capacity }),
});
export const schedule = createReducer(initialState, {
    ...newShiftReducers,
    ...loadDetailsReducers,
    ...loadAvailableShiftsReducers,
    ...joinShiftReducers,
    ...loadMyScheduleReducers,
    ...leaveShiftReducers,
    ...deleteShiftReducers,
    ...copyShiftsReducers,
    [scheduleConstants.PREPARE_LOADING_STATE]: prepareLoadingStateHandler,
    [scheduleConstants.UPDATE_SHIFT_CAPACITY
        .SUCCEEDED]: updateShiftCapacityHandler,
    [scheduleConstants.SET_SCHEDULE_VIEW_STATE]: (
        state,
        { payload: { currentView } }
    ) => ({
        ...state,
        scheduleView: {
            ...state.scheduleView,
            currentView,
        },
    }),
});
