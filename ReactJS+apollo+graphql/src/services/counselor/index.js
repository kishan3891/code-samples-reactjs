import * as QUERIES from "./queries";
import config from "config";
import moment from "moment-timezone";

import { apollo } from "../external.service";
import { trueVaultService } from "../truevault";
import { authHeader, toFileBase64, toSnake } from "../../helpers";
import * as _ from "lodash";
import { CONSTANT, userConstants } from "../../constants";
import { multiDataFetcher } from "../cache.service";

/**
 * @typedef CounslrUser
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} profileDocumentId
 * @property {string} profileVaultId
 * @property {string} avatarBlobId
 * @property {string} avatarUrl
 * @property {string} [phoneNumber]
 * @property {string} name
 * @property {string} reverseName
 * @property {boolean} onBoardingCompleted
 * @property {number} userType
 * @property {boolean} isAdmin
 */

/**
 * @typedef {object} BaseProfile
 * @property {string} firstName
 * @property {string} lastName
 */
/**
 * @typedef {object} UserProfile
 * @property {string} id
 * @property {string} dateOfBirth
 * @property {number} ethnicityId
 * @property {number} genderId

 */
/**
 * @typedef {BaseProfile} CounselorProfile
 * @property {string} insuranceExpirationDate
 * @property {string} insuranceNumber
 * @property {string} licenseExpirationDate
 * @property {string} licenseNumber
 * @property {string} nickname
 */

/**
 * @typedef {CounslrUser|UserProfile} Student
 * @property {string} nickname
 */
/**
 * @typedef {CounslrUser|CounselorProfile} Counselor
 */

/**
 * Creates a new counselor
 * @param {Counselor} data
 * @returns {Promise<{profile:CounselorProfile, user: CounslrUser}>}
 */

const create = async (data) => {
    data = toSnake(data);
    const {
        data: { createCounselorUser: counselorId },
    } = await apollo.mutate({
        mutation: QUERIES.CREATE_COUNSELOR,
        variables: _.pick(data, ["email", "first_name", "last_name"]),
    });
    const user = await trueVaultService.users.get(counselorId);
    return updateCounselor(counselorId, user.profileDocumentId, {
        ...data,
        ...user,
    });
};
/**
 *  Updates a counselor profile document and user profile
 * @param {string} id
 * @param {string} documentId
 * @param {Counselor} data
 * @param {boolean} [fetchBefore=false]
 * @returns {Promise<{profile: CounselorProfile, user: CounslrUser}>}
 */
const updateCounselor = async (id, documentId, data, fetchBefore = false) => {
    return Promise.all([
        trueVaultService.documents.counselors.update(documentId, data),
        trueVaultService.users.update(id, data, fetchBefore),
    ]).then(([documentResponse, userResponse]) => {
        return {
            user: { id, ...userResponse },
            profile: documentResponse,
        };
    });
};

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/counselors`, requestOptions).then(
        handleResponse
    );
}

function getcounselorReview(counselorId) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/reviews`, requestOptions).then(
        handleResponse
    );
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

/**
 *
 *
 * @param page
 * @param limit
 */
const listUsers = async (page = 1, limit = 50) => {
    const {
        data: { user: users },
    } = await apollo.query({
        query: QUERIES.GET_COUNSELORS,
        variables: { /*page: 1, */ limit: 100 },
    });
    const userById = _.keyBy(users, "id");
    const ids = _.map(users, "id");

    const chunks = _.chunk(ids, 50);

    const requests = await Promise.all(
        chunks.map((ids) =>
            multiDataFetcher(
                ids,
                (ids) => trueVaultService.users.counselors(ids),
                userConstants.counselorCacheKey
            )
        )
    );
    const counselors = requests.reduce((acc, current) => {
        return [...acc, ...current];
    }, []);

    return counselors
        .map((counselor) => ({
            ...counselor,
            enabled: userById[counselor.id].enabled,
        }))
        .sort((a, b) => a.reverseName.localeCompare(b.reverseName));
};
const listProfiles = (id) => {
    return trueVaultService.documents.counselors.list(id);
};

/**
 * @typedef {object} CounselorBaseEarnings
 * @property {number} sessions
 * @property {amount} number
 */

/**
 * @typedef {CounselorBaseEarnings} CounselorNextPayoutEarnings
 * @property {string} start
 * @property {string} end
 * @property {number} sessions
 * @property {number} hoursWorked
 * @property {string} period
 */
/**
 * @typedef {object} CounselorEarningHistoryEntry
 * @property {('shift'|'session')} type
 * @property {string} start
 * @property {string} end
 * @property {number} amount
 *
 */
/**
 * @typedef {object} CounselorEarningHistory
 * @property {string} date
 * @property {number} total
 * @property {CounselorEarningHistoryEntry[]} breakdown
 */
/**
 * @typedef {object} CounselorEarnings
 * @property {CounselorBaseEarnings} allTime
 * @property {CounselorNextPayoutEarnings} nextPayout
 * @property {CounselorEarningHistory[]} earningHistory
 */
/**
 *
 * @param counselorId
 * @param startDate
 * @param endDate
 * @param limit
 * @returns {Promise<CounselorEarnings>}
 */
const getEarnings = async (
    counselorId,
    startDate = null,
    endDate = null,
    limit = 10,
    type = null
) => {
    if (type === "admin-view") {
        const {
            data: {
                allTime: { aggregate: allTime },
                shifts,

                sessions: {
                    aggregate: { count: sessions },
                },
                allTimeSessions: {
                    aggregate: { count: allTimeSessions },
                },
                totalEarningHistory: { aggregate: totalEarningHistory },
                nextPayout: { aggregate: nextPayout },
                earningHistory,
            },
        } = await apollo.query({
            query: QUERIES.GET_EARNINGS,
            variables: {
                counselorId,
                limit,
            },
        });
        const {
            data: {
                currentPeriod: { amount, hoursWorked },
            },
        } = await apollo.query({
            query: QUERIES.GET_CURRENT_PERIOD_EARNINGS_FOR_COUNSELOR,
            variables: {
                counselorId,
                startDate,
                endDate,
                timeZone: moment.tz.guess(),
            },
        });
        return {
            allTime: {
                sessions: allTimeSessions,
                amount: allTime.sum.amount,
            },
            nextPayout: {
                hoursWorked,
                sessions,
                amount,
                start: moment(startDate).toISOString(),
                end: moment(endDate).toISOString(),
                period: `${moment(startDate).format(
                    CONSTANT.MONTH_DATE_FORMAT
                )} - ${moment(endDate).format(CONSTANT.MONTH_DATE_FORMAT)}`,
            },
            currentPayout: {
                amount,
            },
            earningHistory: {
                items: parseEarningHistory(earningHistory),
                total: totalEarningHistory.count,
            },
        };
    }
    const {
        data: {
            allTime: { aggregate: allTime },
            shifts,

            sessions: {
                aggregate: { count: sessions },
            },
            allTimeSessions: {
                aggregate: { count: allTimeSessions },
            },
            totalEarningHistory: { aggregate: totalEarningHistory },
            nextPayout: { aggregate: nextPayout },
            earningHistory,
        },
    } = await apollo.query({
        query: QUERIES.GET_EARNINGS,
        variables: {
            counselorId,
            startDate,
            endDate,
            limit,
        },
    });
    const {
        data: {
            currentPeriod: { amount, hoursWorked },
        },
    } = await apollo.query({
        query: QUERIES.GET_CURRENT_PERIOD_EARNINGS,
        variables: {
            startDate,
            endDate,
            timeZone: moment.tz.guess(),
        },
    });
    /*
    const hoursWorked = shifts
        .reduce((totalHours, shift) => {
            const shiftHours = moment.duration(
                moment(shift.end_date).diff(moment(shift.start_date))
            );
            return totalHours.add(shiftHours.asHours(), "hours");
        }, moment.duration(0, "hours"))
        .asHours();*/

    return {
        allTime: {
            sessions: allTimeSessions,
            amount: allTime.sum.amount,
        },
        nextPayout: {
            hoursWorked,
            sessions,
            amount,
            start: moment(startDate).toISOString(),
            end: moment(endDate).toISOString(),
            period: `${moment(startDate).format(
                CONSTANT.MONTH_DATE_FORMAT
            )} - ${moment(endDate).format(CONSTANT.MONTH_DATE_FORMAT)}`,
        },

        earningHistory: {
            items: parseEarningHistory(earningHistory),
            total: totalEarningHistory.count,
        },
    };
};

/**
 *
 * @param earningHistory
 * @returns {Array<CounselorEarningHistory>}
 */
const parseEarningHistory = (earningHistory) => {
    return _.flatMap(
        earningHistory,
        ({ start_date, end_date, shift_states }) => {
            return _.flatMap(shift_states, ({ counselor_enrollment }) => {
                const breakdown = _.map(
                    _.filter(counselor_enrollment, "payout"),
                    ({ payout: { session, amount } }) => {
                        const isShiftPayout = !session;
                        return {
                            type: isShiftPayout ? "shift" : "session",
                            amount: amount,
                            start: isShiftPayout
                                ? start_date
                                : session.start_date,
                            end: isShiftPayout ? end_date : session.end_date,
                        };
                    }
                );
                return {
                    date: start_date,
                    total: _.sumBy(breakdown, "amount"),
                    breakdown,
                };
            });
        }
    );
};
/**
 *
 * @param counselorId
 * @param startDate
 * @param endDate
 * @returns {Promise<Array<CounselorEarningHistory>>}
 */
const getEarningHistory = async (counselorId, startDate, endDate) => {
    const {
        data: { earningHistory },
    } = await apollo.query({
        query: QUERIES.GET_EARNING_HISTORY,
        variables: {
            counselorId,
            startDate,
            endDate,
        },
    });
    return parseEarningHistory(earningHistory);
};

const trueVaultToken = async () => {
    const {
        data: { getTruevaultUserAccessToken: token },
    } = await apollo.query({
        query: QUERIES.GET_TRUE_VAULT_TOKEN,
    });
    return token;
};

const changeEnableStatus = async (counselorId, enabled) => {
    const {
        data: {
            update_user: { returning },
        },
    } = await apollo.mutate({
        mutation: QUERIES.CHANGE_ENABLE_STATUS,
        variables: {
            counselorId,
            enabled,
        },
    });
    return returning[0].enabled;
};

const uploadAvatar = async (documentId, file) => {
    file = await toFileBase64(file);
    const {
        data: { uploadAvatar: avatarUrl },
    } = await apollo.mutate({
        mutation: QUERIES.UPLOAD_AVATAR,
        variables: {
            file,
        },
    });
    const document = await trueVaultService.documents.counselors.get(
        documentId
    );
    document.avatarUrl = avatarUrl;
    await trueVaultService.documents.counselors.update(documentId, document);

    return avatarUrl;
};

/**
 * @typedef {object} CounselorReviews
 * @property {number} total
 * @property {number} [last]
 * @property {CounselorReview[]} items
 */
/**
 * @typedef {object} CounselorReview
 * @property {boolean} helpful
 * @property {string} comment
 * @property {string} date
 */
/**
 *
 */
/**
 *
 * @param counselorId
 * @param lastId
 * @param limit
 * @return {Promise<CounselorReviews>}
 */
const getReviewsFor = async (counselorId, limit = 10, lastId = null) => {
    const {
        data: {
            total_positive: {
                aggregate: { positive },
            },
            total_feedback: {
                aggregate: { total },
            },
            session_feedback,
        },
    } = await apollo.query({
        query: QUERIES.GET_REVIEWS_FOR_COUNSELOR,
        variables: {
            counselorId,
            lastId,
            limit,
        },
    });

    const negative = total - positive;
    return {
        total,
        positive: !positive ? 0 : Math.round((positive / total) * 100),
        negative: !negative ? 0 : Math.round((negative / total) * 100),
        last: session_feedback[session_feedback.length - 1]?.id,
        items: session_feedback.map(
            ({ helpful, comment, session: { scheduled_start_date: date } }) => {
                return {
                    helpful,
                    comment,
                    date,
                };
            }
        ),
    };
};

export const counselorService = {
    QUERIES,
    getAll,
    create,
    updateCounselor,
    uploadAvatar,
    getEarnings,
    getEarningHistory,
    getReviewsFor,
    listUsers,
    trueVaultToken,
    listProfiles,

    changeEnableStatus,
};
