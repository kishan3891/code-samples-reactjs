import { counselorConstants, userConstants } from "../constants";
import { counselorService, scheduleService } from "../services";
import { alertActions } from "./alert.actions";

import { createActionThunk } from "../constants/actionTypes";
import { cache, dataFetcher } from "../services/cache.service";
import { SendBirdAction } from "./sendbird";

const sb = new SendBirdAction();

/**
 *
 * @function updateCounselor
 * @param {string} id
 * @param {string} documentId
 * @param {Counselor} data
 * @returns {Promise<{counselor:CounslrUser,profile:CounselorProfile}>}
 */
const updateCounselor = createActionThunk(
    counselorConstants.UPDATE_COUNSELOR,
    async (id, documentId, data, { dispatch }) => {
        if (!data.sendBirdUserId) {
            const sendBirdUserId = await dispatch(
                updateOrCreateSendBirdUser(data)
            );
            if (sendBirdUserId) {
                data.sendBirdUserId = sendBirdUserId;
            }
        }
        const { user, profile } = await counselorService.updateCounselor(
            id,
            documentId,
            data
        );

        cache.set(userConstants.counselorCacheKey(user), {
            ...user,
            ...profile,
        });
        cache.set(
            counselorConstants.FETCH_COUNSELOR_DOCUMENT.cacheKey(documentId),
            profile
        );
        if (!data.suppressAlert) {
            dispatch(alertActions.success("Counselor updated successfully"));
        }
        return { counselor: user, profile };
    }
);
/**
 * @function createCounselor
 * @param {Counselor} data
 * @returns {Promise<{counselor:CounslrUser}>}
 */
const createCounselor = createActionThunk(
    counselorConstants.ADD_COUNSELOR,
    async (data, { dispatch }) => {
        const { user: counselor, profile } = await counselorService.create(
            data
        );
        dispatch(alertActions.success("Counselor added successfully"));
        dispatch(
            updateCounselor(counselor.id, counselor.profileDocumentId, {
                ...profile,
                ...counselor,
                suppressAlert: true,
            })
        );

        return { counselor };
    }
);

const updateOrCreateSendBirdUser = (counselor) => {
    return async (dispatch) => {
        const { id: counselorId, sendBirdUserId, avatarUrl } = counselor;
        const nickname = counselor.firstName + " " + counselor.lastName;
        const userId = sendBirdUserId || counselorId;
        try {
            const user = await sb.connect(userId, nickname, avatarUrl);
            return user.userId;
        } catch (e) {
            return null;
        }
    };
};

/**
 *
 * @type function
 * @function loadCounselorFullProfile
 * @param {CounslrUser|TrueVaultUser} counselor
 * @return {Promise<{Counselor}>}
 */
const loadCounselorFullProfile = createActionThunk(
    counselorConstants.LOAD_COUNSELOR_DETAILS,
    async (counselor, { dispatch }) => {
        const { profile } = await dispatch(
            getCounselorProfile(counselor.profileDocumentId)
        );
        counselor = {
            ...profile,
            ...counselor,
        };
        dispatch(updateOrCreateSendBirdUser(counselor));
        return {
            counselor,
        };
    }
);

const setActiveCounselor = (counselor) => {
    return {
        type: counselorConstants.SET_ACTIVE_COUNSELOR,
        payload: {
            counselor,
        },
    };
};

const loadCounselorReview = createActionThunk(
    counselorConstants.GET_COUNSELOR_REVIEWS,
    async (counselorId) => {
        const reviews = await counselorService.getCounselorReview(counselorId);
        return { reviews };
    }
);

const listCounselors = createActionThunk(
    counselorConstants.GET_ALL,
    async () => {
        const counselors = await counselorService.listUsers();
        return { counselors };
    }
);

/**
 * @type function
 * @param {string} profileDocumentId
 * @returns {Promise<CounselorProfile>}
 */
const getCounselorProfile = createActionThunk(
    counselorConstants.FETCH_COUNSELOR_DOCUMENT,
    async (documentId) => {
        const profile = await dataFetcher(
            counselorConstants.FETCH_COUNSELOR_DOCUMENT.cacheKey(documentId),
            () =>
                counselorService.listProfiles(documentId).then((users) => {
                    return users[0];
                })
        );
        return { profile };
    }
);
const loadEarnings = createActionThunk(
    counselorConstants.GET_COUNSELOR_EARNINGS,
    async (counselorId, startDate, endDate, limit, type) => {
        const earnings = await counselorService.getEarnings(
            counselorId,
            startDate,
            endDate,
            limit,
            type
        );
        return { earnings };
    }
);

const loadMoreEarningsHistory = createActionThunk(
    counselorConstants.LOAD_MORE_EARNINGS_HISTORY,
    async (counselorId, startDate, endDate) => {
        const items = await counselorService.getEarningHistory(
            counselorId,
            startDate,
            endDate
        );
        return { items };
    }
);

const changeEnableStatus = createActionThunk(
    counselorConstants.CHANGE_ENABLE_STATUS,
    async (counselorId, enabled) => {
        enabled = await counselorService.changeEnableStatus(
            counselorId,
            enabled
        );
        return { counselorId, enabled };
    }
);
const loadSchedule = createActionThunk(
    counselorConstants.GET_COUNSELOR_SCHEDULE,
    async (counselorId, startDate = null, endDate = null) => {
        const schedule = await scheduleService.getScheduleFor(
            counselorId,
            null,
            endDate
        );
        return { schedule };
    }
);
const loadReviews = createActionThunk(
    counselorConstants.GET_COUNSELOR_REVIEWS,
    async (counselorId, limit, lastId) => {
        const reviews = await counselorService.getReviewsFor(
            counselorId,

            limit,
            lastId
        );
        return { reviews };
    }
);

export const counselorActions = {
    listCounselors,
    createCounselor,
    updateCounselor,
    setActiveCounselor,
    loadSchedule,
    loadEarnings,
    loadReviews,
    loadMoreEarningsHistory,
    getCounselorProfile,
    loadCounselorReview,
    loadCounselorFullProfile,
    changeEnableStatus,
    updateOrCreateSendBirdUser,
};
