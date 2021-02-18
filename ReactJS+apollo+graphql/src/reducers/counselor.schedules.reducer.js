import { counselorScheduleConstants } from "../constants";

const initialState = {
    items: [],
    loading: false,
    isViewSchedule: false,
};

export function counselorSchedules(state = initialState, action) {
    switch (action.type) {
        case counselorScheduleConstants.GETALL_COUNSELOR_SCHEDL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case counselorScheduleConstants.GETALL_COUNSELOR_SCHEDL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.counselorSchedules,
            };
        case counselorScheduleConstants.GETALL_COUNSELOR_SCHEDL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case counselorScheduleConstants.OPEN_CLOSE_MODAL_VIEW_SHIFT:
            return {
                ...state,
                isViewSchedule: action.payload,
            };

        default:
            return state;
    }
}
