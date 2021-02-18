import { createDataReducers } from "./helpers";
import { schoolsConstants } from "../constants";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loaders: {
        details: true,
    },
    profile: null,
    school: {},
};

const loadDetailsReducers = createDataReducers(
    schoolsConstants.LOAD_SCHOOL_DETAILS,
    "details",
    (state, { payload: { school } }) => {
        return { ...state, school };
    },
    {
        start: () => ({
            ...initialState,
        }),
    }
);
// const fetchDocumentReducers = createDataReducers(
//     schoolsConstants.FETCH_COUNSELOR_DOCUMENT,
//     "profile",
//     (state, { payload: { profile } }) => {
//         return { ...state, profile };
//     }
// );

// const updateCounselorReducers = createDataReducers(
//     schoolsConstants.UPDATE_COUNSELOR,
//     "updating",
//     (state, { payload: { counselor, profile } }) => {
//         if (state.counselor.id === counselor.id) {
//             return {
//                 ...state,
//                 counselor: {
//                     ...profile,
//                     ...counselor,
//                 },
//             };
//         }
//         return state;
//     }
// );

// const counselorScheduleReducers = createDataReducers(
//     schoolsConstants.GET_COUNSELOR_SCHEDULE,
//     "schedule",
//     (state, { payload: { schedule } }) => {
//         return { ...state, schedule };
//     }
// );
// const counselorReviewsReducers = createDataReducers(
//     schoolsConstants.GET_COUNSELOR_REVIEWS,
//     "reviews",
//     (state, { payload: { reviews } }) => {
//         return { ...state, reviews };
//     }
// );

// const counselorEarningsReducers = createDataReducers(
//     schoolsConstants.GET_COUNSELOR_EARNINGS,
//     "earnings",
//     (state, { payload: { earnings } }) => {
//         return { ...state, earnings };
//     }
// );

// const counselorEarningHistoryReducers = createDataReducers(
//     schoolsConstants.LOAD_MORE_EARNINGS_HISTORY,
//     "earningHistory",
//     (state, { payload: { items } }) => {
//         const { earnings } = state;
//         const { earningHistory } = earnings;
//         return {
//             ...state,
//             earnings: {
//                 ...earnings,
//                 earningHistory: {
//                     total: earningHistory.total,
//                     items: [...earningHistory.items, ...items],
//                 },
//             },
//         };
//     }
// );

export const school = createReducer(initialState, {
    ...loadDetailsReducers,
    // ...fetchDocumentReducers,
    // ...counselorScheduleReducers,
    // ...counselorReviewsReducers,
    // ...counselorEarningsReducers,
    // ...counselorEarningHistoryReducers,
    // ...updateCounselorReducers,
});
