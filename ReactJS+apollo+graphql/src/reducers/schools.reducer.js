import { schoolsConstants } from "../constants";
import { createReducer } from "@reduxjs/toolkit";
import { createDataReducers } from "./helpers";

const initialState = {
    loaders: {
        list: false,
        adding: false,
        updating: false,
    },
    items: [],
};

const listSchoolsReducers = createDataReducers(
    schoolsConstants.GET_ALL,
    "list",
    (state, { payload }) => {
        return {
            ...state,
            items: payload.schools,
        };
    }
);
const addSchoolReducers = createDataReducers(
    schoolsConstants.ADD_SCHOOL,
    "adding",
    (state, { payload: { school } }) => {
        return {
            ...state,
            items: [school, ...state.items],
        };
    }
);
const updateSchoolReducer = createDataReducers(
    schoolsConstants.UPDATE_SCHOOL,
    "updating",
    (state, { payload: { school } }) => {
        return {
            ...state,
            items: state.items.map((s) => {
                if (s.id === school.id) {
                    return school;
                }
                return s;
            }),
        };
    }
);

export const schools = createReducer(initialState, {
    ...listSchoolsReducers,
    ...addSchoolReducers,
    ...updateSchoolReducer,
    [schoolsConstants.CHANGE_ENABLE_STATUS.SUCCEEDED]: (
        state,
        { payload: { schoolId, enabled } }
    ) => {
        return {
            ...state,
            items: state.items.map((school) => {
                if (school.id === schoolId) {
                    return {
                        ...school,
                        enabled,
                    };
                }
                return school;
            }),
        };
    },
});

// export function schools(state = initialState, action) {
//     switch (action.type) {
//         case schoolsConstants.GETALL_SCHOOL_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };
//         case schoolsConstants.GETALL_SCHOOL_SUCCESS:
//             return {
//                 ...state,
//                 items: action.schools,
//                 loading: false,
//             };
//         case schoolsConstants.GETALL_SCHOOL_FAILURE:
//             return {
//                 ...state,
//                 error: action.error,
//             };
//         // Add school and OPEN close add school modal
//         case schoolsConstants.OPEN_ADD_SCHOOL:
//             return {
//                 ...state,
//                 isAddSchool: action.payload,
//             };
//         case schoolsConstants.ADD_SCHOOL_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };
//         case schoolsConstants.ADD_SCHOOL_SUCCESS:
//             return {
//                 ...state,
//                 items: [...state.items, action.school],
//                 loading: false,
//                 isAddSchool: false,
//             };
//         case schoolsConstants.ADD_SCHOOL_FAILURE:
//             return {
//                 ...state,
//                 error: action.error,
//             };
//         //Update school data
//         case schoolsConstants.OPEN_VIEW_SCHOOL:
//             return {
//                 ...state,
//                 isViewSchool: true,
//                 editToSchool: action.payload,
//             };
//         case schoolsConstants.CLOSE_VIEW_SCHOOL:
//             return {
//                 ...state,
//                 isViewSchool: action.payload,
//             };
//         //Manage account status modal
//         case schoolsConstants.OPEN_SCHOOL_DISABLE_MODAL:
//             return {
//                 ...state,
//                 isDisableButton: action.payload.status,
//                 accountId: action.payload.accountId,
//             };
//         case schoolsConstants.UPDATE_SCHOOL_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             };
//         case schoolsConstants.UPDATE_SCHOOL_SUCCESS:
//             return {
//                 ...state,
//                 items: state.items.map((article) => {
//                     if (article.id !== action.school.id) {
//                         return article;
//                     } else {
//                         return action.school;
//                     }
//                 }),
//                 editToSchool: action.school,
//                 loading: false,
//             };
//         case schoolsConstants.UPDATE_SCHOOL_FAILURE:
//             return {
//                 error: action.error,
//             };

//         case schoolsConstants.GETALL_REQUEST:
//             return {
//                 loading: true,
//             };
//         case schoolsConstants.GETALL_SUCCESS:
//             return {
//                 items: action.counselors,
//             };
//         case schoolsConstants.GETALL_FAILURE:
//             return {
//                 error: action.error,
//             };

//         case schoolsConstants.COUNSELOR_SCHEDULE_REQUEST:
//             return {
//                 ...state,
//                 viewLoader: true,
//             };
//         case schoolsConstants.COUNSELOR_SCHEDULE_SUCCESS:
//             return {
//                 ...state,
//                 viewLoader: false,
//             };
//         case schoolsConstants.COUNSELOR_SCHEDULE_FAILURE:
//             return {
//                 error: action.error,
//             };

//         case schoolsConstants.COUNSELOR_REVIEW_REQUEST:
//             return {
//                 ...state,
//                 viewLoader: true,
//             };
//         case schoolsConstants.COUNSELOR_REVIEW_SUCCESS:
//             return {
//                 ...state,
//                 viewLoader: false,
//                 counselorReviews: action.counselorReviews,
//             };
//         case schoolsConstants.COUNSELOR_REVIEW_FAILURE:
//             return {
//                 error: action.error,
//             };
//         default:
//             return state;
//     }
// }
