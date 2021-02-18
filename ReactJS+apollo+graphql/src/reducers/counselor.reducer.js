import { createDataReducers } from "./helpers";
import { counselorConstants } from "../constants";
import { createReducer, createSelector } from "@reduxjs/toolkit";

/**
 * @typedef CounselorStateLoaders
 * @property {boolean} counselor
 * @property {boolean} list
 * @property {boolean} adding
 * @property {boolean} details
 * @property {boolean} schedule
 * @property {boolean} earnings
 * @property {boolean} earningHistory
 * @property {boolean} reviews
 */
/**
 * @typedef CounselorState
 * @property {CounselorStateLoaders} loaders
 * @property {CounslrUser[]} items
 * @property {CounselorProfile|null} [profile]
 * @property {Counselor|null} counselor
 * @property {CounselorReviews} reviews
 * @property {CounselorSchedule|null} schedule
 * @property {CounselorEarnings|null} earnings
 */

/** *
 * @type {CounselorState}
 */
const initialState = {
    loaders: {
        counselor: true,
        list: false,
        adding: false,
        details: true,
        schedule: true,
        earnings: true,
        earningHistory: true,
        reviews: true,
    },
    /**
     * @type {CounslrUser[]}
     */
    items: [],
    /**
     * @type {CounselorProfile|null}
     */
    profile: null,
    /**
     * @type {Counselor|null}
     */
    counselor: null,
    reviews: null,
    /**
     * @type {CounselorSchedule|null}
     */
    schedule: null,
    /**
     * @type {CounselorEarnings|null}
     */
    earnings: null,
};

const loadDetailsReducers = createDataReducers(
    counselorConstants.LOAD_COUNSELOR_DETAILS,
    "details",
    "counselor",
    {
        start: (state) => ({
            ...state,
            profile: null,
            counselor: null,
            reviews: null,
            schedule: null,
            earnings: null,
        }),
        end: (state) => ({
            ...state,
            loaders: {
                ...state.loaders,
                counselor: false,
            },
        }),
    }
);
const fetchDocumentReducers = createDataReducers(
    counselorConstants.FETCH_COUNSELOR_DOCUMENT,
    "profile",
    (state, { payload: { profile } }) => {
        return { ...state, profile };
    }
);

const updateCounselorReducers = createDataReducers(
    counselorConstants.UPDATE_COUNSELOR,
    "updating",
    (state, { payload: { counselor, profile } }) => {
        return {
            ...state,
            items: state.items.map((article) => {
                if (article.id !== counselor.id) {
                    return article;
                } else {
                    return counselor;
                }
            }),
            counselor:
                state.counselor?.id === counselor.id
                    ? {
                          ...profile,
                          ...counselor,
                      }
                    : state.counselor,
        };
    }
);

const counselorScheduleReducers = createDataReducers(
    counselorConstants.GET_COUNSELOR_SCHEDULE,
    "schedule",
    (state, { payload: { schedule } }) => {
        return { ...state, schedule };
    }
);
const counselorReviewsReducers = createDataReducers(
    counselorConstants.GET_COUNSELOR_REVIEWS,
    "reviews",
    (
        state,
        {
            payload: {
                reviews: { total, last, positive, negative, items },
            },
        }
    ) => {
        return {
            ...state,
            reviews: {
                total,
                last,
                positive,
                negative,
                items: [...(state.reviews?.items || []), ...items],
            },
        };
    }
);

const counselorEarningsReducers = createDataReducers(
    counselorConstants.GET_COUNSELOR_EARNINGS,
    "earnings",
    (state, { payload: { earnings } }) => {
        return { ...state, earnings };
    }
);

const counselorEarningHistoryReducers = createDataReducers(
    counselorConstants.LOAD_MORE_EARNINGS_HISTORY,
    "earningHistory",
    (state, { payload: { items } }) => {
        const { earnings } = state;
        const { earningHistory } = earnings;
        return {
            ...state,
            earnings: {
                ...earnings,
                earningHistory: {
                    total: earningHistory.total,
                    items: [...earningHistory.items, ...items],
                },
            },
        };
    }
);

const addCounselorReducers = createDataReducers(
    counselorConstants.ADD_COUNSELOR,
    "adding",
    (state, { payload: { counselor } }) => {
        return {
            ...state,
            items: [...state.items, counselor],
        };
    }
);

const listCounselorsReducers = createDataReducers(
    counselorConstants.GET_ALL,
    "list",
    (state, { payload }) => {
        return {
            items: payload.counselors,
        };
    }
);

export const getActiveCounselorSelector = createSelector(
    ({ authentication: { user } }) => (user?.isAdmin ? null : user),
    ({ counselor: { counselor } }) => counselor,
    (user, counselor) => {
        const active = {
            ...user,
            ...counselor,
            avatarUrl: user?.avatarUrl || counselor?.avatarUrl,
        };
        if (active.avatarUrl) {
            active.avatarUrl = `${active.avatarUrl}?r=${Math.random()}`;
        }
        return active;
    }
);

export const counselor = createReducer(initialState, {
    ...loadDetailsReducers,
    ...fetchDocumentReducers,
    ...counselorScheduleReducers,
    ...counselorReviewsReducers,
    ...counselorEarningsReducers,
    ...counselorEarningHistoryReducers,
    ...updateCounselorReducers,
    ...addCounselorReducers,
    ...listCounselorsReducers,

    [counselorConstants.SET_ACTIVE_COUNSELOR]: (
        state,
        { payload: { counselor } }
    ) => ({
        ...state,
        reviews: null,
        earnings: null,
        counselor,
    }),
    [counselorConstants.CHANGE_ENABLE_STATUS.SUCCEEDED]: (
        state,
        { payload: { counselorId, enabled } }
    ) => {
        return {
            ...state,
            items: state.items.map((counselor) => {
                if (counselor.id === counselorId) {
                    return {
                        ...counselor,
                        enabled,
                    };
                }
                return counselor;
            }),
            counselor:
                state.counselor?.id === counselorId
                    ? {
                          ...state.counselor,
                          enabled,
                      }
                    : state.counselor,
        };
    },
});
