import { CONSTANT, scheduleConstants } from "../constants";
import { scheduleService } from "../services";
import { alertActions } from "./";
import { createActionThunk } from "../constants/actionTypes";
import moment from "moment";

const listSchedules = createActionThunk(
    scheduleConstants.LOAD_AVAILABLE_SHIFTS,
    async (startDate, endDate) => {
        const shifts = await scheduleService.list(startDate, endDate);
        return { shifts, startDate, endDate };
    }
);
const newShift = createActionThunk(
    scheduleConstants.NEW_SHIFT,
    async (startDate, endDate, capacity, { dispatch }) => {
        const shift = await scheduleService.newShift(
            startDate,
            endDate,
            capacity
        );
        dispatch(alertActions.success("A new shift has been created!"));
        return { shift };
    }
);
const copyShifts = createActionThunk(
    scheduleConstants.COPY_SHIFTS,
    async (fromDate, toDate, { dispatch }) => {
        const { shifts, copyErrors } = await scheduleService.copyShifts(
            fromDate,
            toDate
        );
        if (!shifts.length) {
            dispatch(
                alertActions.error(
                    `Unable to copy shifts from ${moment(fromDate).format(
                        CONSTANT.INPUT_DATE_FORMAT
                    )} to ${moment(toDate).format(CONSTANT.INPUT_DATE_FORMAT)}`
                )
            );
        }
        if (shifts.length !== 0) {
            dispatch(
                alertActions.success(
                    `${shifts.length} new shifts have been created!`
                )
            );
        }
        return { shifts, copyErrors };
    }
);

/**
 *
 * @type function
 * @function loadShiftDetail
 */
const loadCounselorShiftDetails = createActionThunk(
    scheduleConstants.LOAD_SHIFT_DETAILS,
    async (id) => {
        const shift = await scheduleService.counselorShiftDetails(id);
        return { shift };
    }
);
const loadAdminShiftDetails = createActionThunk(
    scheduleConstants.LOAD_SHIFT_DETAILS,
    async (shift) => {
        shift = await scheduleService.adminShiftDetails(shift);

        return { shift };
    }
);

const joinShift = createActionThunk(
    scheduleConstants.JOIN_SHIFT,
    async (shiftStatesId, { dispatch }) => {
        const enrollment = await scheduleService.joinShift(shiftStatesId);
        dispatch(alertActions.success("You have joined a shift"));

        return { enrollment };
    }
);
const availableShifts = createActionThunk(
    scheduleConstants.LOAD_AVAILABLE_SHIFTS,
    async (startDate, endDate, counselorId) => {
        const shifts = await scheduleService.availableShifts(
            counselorId,
            startDate,
            endDate
        );
        return { shifts, startDate, endDate };
    }
);

const prepareLoadingState = (currentView, loading = true) => (dispatch) => {
    dispatch({
        type: scheduleConstants.PREPARE_LOADING_STATE,
        payload: {
            currentView,
            loading,
        },
    });
};

const loadMyScheduleForHome = createActionThunk(
    scheduleConstants.LOAD_MY_SCHEDULE,
    async (startDate, endDate = null, { getState }) => {
        const {
            authentication: { user },
        } = getState();

        const schedule = await scheduleService.getScheduleFor(
            user.id,
            startDate,
            endDate
        );
        return { schedule, forHome: true };
    }
);

const loadMySchedule = createActionThunk(
    scheduleConstants.LOAD_MY_SCHEDULE,
    async (startDate, endDate = null, { getState }) => {
        const {
            authentication: { user },
        } = getState();

        const schedule = await scheduleService.getScheduleFor(
            user.id,
            startDate,
            endDate
        );
        return { schedule };
    }
);
const setScheduleViewState = ({ currentView, startDate, endDate }) => {
    return (dispatch) => {
        dispatch({
            type: scheduleConstants.SET_SCHEDULE_VIEW_STATE,
            payload: {
                currentView,
            },
        });
    };
};

/**
 * @name leaveShift
 * @namespace scheduleActions
 * @type {Function}
 * @param {number} counselorEnrollmentId
 */
const leaveShift = createActionThunk(
    scheduleConstants.LEAVE_SHIFT,
    async (counselorEnrollmentId, { dispatch }) => {
        const enrollment = await scheduleService.leaveShift(
            counselorEnrollmentId
        );
        dispatch(alertActions.success("You left a shift!"));
        return { enrollment };
    }
);

const updateShiftCapacity = createActionThunk(
    scheduleConstants.UPDATE_SHIFT_CAPACITY,
    async (shiftId, capacity, { dispatch }) => {
        await scheduleService.updateShiftCapacity(shiftId, capacity);
        dispatch(alertActions.success("Shift capacity has been updated!"));
        return { shiftId, capacity };
    }
);
const deleteShift = createActionThunk(
    scheduleConstants.DELETE_SHIFT,
    async (shiftId, { dispatch }) => {
        await scheduleService.deleteShift(shiftId);
        dispatch(alertActions.success("A shift has been deleted!"));
        return { shiftId };
    }
);

export const scheduleActions = {
    listSchedules,
    newShift,
    deleteShift,
    copyShifts,
    joinShift,
    leaveShift,
    loadCounselorShiftDetails,
    loadAdminShiftDetails,
    loadMySchedule,
    availableShifts,
    loadMyScheduleForHome,
    prepareLoadingState,
    setScheduleViewState,
    updateShiftCapacity,
};
