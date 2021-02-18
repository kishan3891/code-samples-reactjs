import * as QUERIES from "./queries";
import { apollo } from "../external.service";
import * as _ from "lodash";

import { CONSTANT, userConstants } from "../../constants";
import moment from "moment-timezone";
import { trueVaultService } from "../truevault";
import { multiDataFetcher } from "../cache.service";
import { sessionService } from "../session";

/**
 * @typedef {object} CounselorEnrollment
 * @property {number} id
 * @property {boolean} backup
 * @property {number} students
 * @property {int} [shift_id]
 * @property {string} [counselor_id]
 * @property {number} [shift_states_id]
 * @property {string} start_date
 * @property {string} end_date
 */

/**
 * @typedef {object} AvailableShift
 * @property {number} id
 * @property {number} [_id]
 * @property {number} [shift_states_id]
 * @property {string} start_date
 * @property {string} end_date
 * @property {number} capacity - max # of counselors
 * @property {number} count - total # of counselors currently booked in this slot
 * @property {number} backups - total # of backup slots, max is 9
 * @property {CounselorEnrollment[]} counselor_enrollment
 * @property {Counselor[]} [counselors]
 */

/**
 * @typedef {AvailableShift} CounslrShift
 * @property {string} start
 * @property {string} end
 * @property {number} total
 */

/**
 *
 * @param {number} id
 * @param {string} start_date
 * @param {string} end_date
 * @param shiftStateId
 * @param {number} capacity
 * @param {CounselorEnrollment[]} counselor_enrollment
 * @return {AvailableShift}
 */
const prepShift = ({
    id,
    start_date,
    end_date,
    shift_states: [{ id: shiftStateId, capacity, counselor_enrollment = [] }],
}) => {
    counselor_enrollment = counselor_enrollment.map(prepCounselorEnrollment);
    /**
     * @type AvailableShift
     */
    return {
        id,
        _id: id,
        start_date,
        end_date,
        start: start_date,
        end: end_date,
        capacity,
        shift_states_id: shiftStateId,
        count: counselor_enrollment.filter((e) => !e.backup).length,
        backups: counselor_enrollment.filter((e) => e.backup).length,
        sessions: _.sumBy(counselor_enrollment, "students"),
        counselor_enrollment,
    };
};

const list = async (startDate, endDate) => {
    const {
        data: { shift: shifts },
    } = await apollo.query({
        query: QUERIES.LIST_SCHEDULE,
        variables: {
            startDate,
            endDate,
            stateId: CONSTANT.DEFAULT_STATE_ID,
        },
        fetchPolicy: "no-cache",
    });
    return shifts.map(prepShift);
};

const getShiftsForAdmin = async (shiftIds) => {
    const {
        data: { shifts },
    } = await apollo.query({
        query: QUERIES.GET_SHIFT_ADMIN,
        variables: {
            shiftIds,
        },
    });
    return shifts.map(prepShift);
};
const newShift = async (startDate, endDate, capacity) => {
    const {
        data: { createShift: shiftId },
    } = await apollo.mutate({
        mutation: QUERIES.CREATE_SHIFT,
        variables: {
            startDate,
            endDate,
            capacity,
        },
    });
    const shifts = await getShiftsForAdmin([shiftId]);
    return shifts[0];
};
const deleteShift = async (shiftId) => {
    const {
        data: { deleteShift },
    } = await apollo.mutate({
        mutation: QUERIES.DELETE_SHIFT,
        variables: {
            shiftId,
        },
    });
    return deleteShift === "OK";
};
const copyShifts = async (fromDate, toDate) => {
    const {
        data: {
            copyShifts: { ids, copyErrors },
        },
    } = await apollo.mutate(
        {
            mutation: QUERIES.COPY_SHIFTS,
            variables: {
                fromDate,
                toDate,
                timeZone: moment.tz.guess(),
            },
        },
        {
            rs_shift_overlaps: {
                /*message: `Can't copy shifts to ${moment(toDate).format(
                    "MMM D"
                )}, please remove all shifts for that day.`,*/
                message: `copy shifts error`,
            },
        }
    );
    return {
        shifts: ids.length ? await getShiftsForAdmin(ids) : [],
        copyErrors,
    };
};

/**
 * @typedef CounselorShiftDetails
 * @property {number} id
 * @property {number} enrollment_id
 * @property {string} start_date
 * @property {string} end_date
 * @property {number} capacity
 * @property {CounslrSession[]} sessions
 *
 */
/**
 *
 * @param id
 * @return {Promise<CounselorShiftDetails>}
 */
const counselorShiftDetails = async (id) => {
    const {
        data: { shift_by_pk: shift },
    } = await apollo.query({
        query: QUERIES.GET_SHIFT_COUNSELOR,
        variables: {
            id,
        },
    });
    const {
        start_date,
        end_date,
        shift_states: [
            {
                capacity,
                counselor_enrollment: [{ enrollment_id, students_enrollment }],
            },
        ],
    } = shift;

    const sessions = await sessionService.mapStudentsProfileFromSessions(
        students_enrollment.map(({ session }) => {
            return session;
        })
    );

    return {
        id,
        _id: id,
        start: start_date,
        end: end_date,
        enrollment_id,
        start_date,
        end_date,
        capacity,
        sessions,
    };
};

/**
 *
 * @param {AvailableShift} shift
 * @return {Promise<{counselors: *, id: *}>}
 */
const adminShiftDetails = async (shift) => {
    const { start_date, end_date } = shift;
    const counselorIds = shift.counselor_enrollment.map((e) => e.counselor_id);
    let pendingCounselorDetails = Promise.resolve({
        data: { user: [] },
    });
    if (counselorIds.length) {
        pendingCounselorDetails = apollo.query({
            query: QUERIES.EXTRA_COUNSELOR_DETAILS,
            variables: {
                counselorIds,
            },
        });
    }

    const counselors = await multiDataFetcher(
        counselorIds,
        (ids) => trueVaultService.users.counselors(ids),
        userConstants.counselorCacheKey
    );
    const {
        data: { user },
    } = await pendingCounselorDetails;

    const userById = _.keyBy(user, "id");

    return {
        id: shift._id,
        ...shift,
        counselors: counselors.map((counselor) => {
            return {
                ...counselor,
                ...userById[counselor.id],
            };
        }),
        start: start_date,
        end: end_date,
    };
};
/**
 *
 * @param shiftStatesId
 * @return {Promise<CounselorEnrollment>}
 */
const joinShift = async (shiftStatesId) => {
    const {
        data: { insertCounselorEnrollment: enrollmentId },
    } = await apollo.mutate(
        {
            mutation: QUERIES.JOIN_SHIFT,
            variables: {
                shiftStatesId,
                timeZone: moment.tz.guess(),
            },
        },
        {
            rs_scheduled_max_hours: {
                modal: true,
                title: "Max hours",
                buttonType: "submit",
                buttonText: "Got it",
            },
        }
    );
    return counselorEnrollmentById(enrollmentId);
};

/**
 *
 * @param counselorEnrollmentId
 * @return {Promise<CounselorEnrollment>}
 */
const leaveShift = async (counselorEnrollmentId) => {
    const {
        data: {
            leaveShift: {
                id,
                counselor_id,
                backup,
                shift_states_id,
                start_date,
                end_date,
            },
        },
    } = await apollo.mutate({
        mutation: QUERIES.LEAVE_SHIFT,
        variables: {
            counselorEnrollmentId,
        },
    });

    return {
        id,
        counselor_id,
        backup,
        students: 0,
        shift_states_id,
        start_date,
        end_date,
    };
};

/**
 *
 * @param {CounselorEnrollment} enrollment
 * @return {CounselorEnrollment}
 */
const prepCounselorEnrollment = (enrollment) => {
    enrollment = {
        ...enrollment,
        students: _.get(
            enrollment,
            "students_enrollment_aggregate.aggregate.count",
            enrollment.students
        ),
    };
    delete enrollment["students_enrollment_aggregate"];
    return enrollment;
};
/**
 *
 * @param id
 * @return {Promise<CounselorEnrollment>}
 */
const counselorEnrollmentById = async (id) => {
    const {
        data: { counselor_enrollment_by_pk: enrollment },
    } = await apollo.query({
        query: QUERIES.COUNSELOR_ENROLLMENT,
        variables: {
            id,
        },
    });

    return prepCounselorEnrollment(enrollment);
};

/**
 *
 * @param counselorId
 * @param startDate
 * @param endDate
 * @return {Promise<any>}
 */
const availableShifts = async (counselorId, startDate, endDate) => {
    const {
        data: { availableShifts: shifts },
    } = await apollo.query({
        query: QUERIES.AVAILABLE_SHIFTS,
        variables: {
            counselorId,
            startDate,
            endDate,
            stateId: CONSTANT.DEFAULT_STATE_ID,
        },
    });
    return shifts;
};

/**
 * @typedef {object} CounselorSchedule
 * @property {string} start
 * @property {string} end
 * @property {array<CounselorEnrollment>} enrollments
 */
/**
 *
 * @param counselorId
 * @param [startDate=null]
 * @param [endDate=null]
 * @returns {Promise<[CounselorSchedule]>}
 */
const getScheduleFor = async (
    counselorId,
    startDate = null,
    endDate = null
) => {
    const shifts = await apollo
        .query({
            query: QUERIES.GET_SCHEDULE_FOR_COUNSELOR,
            variables: {
                counselorId,
                startDate,
                endDate,
            },
            fetchPolicy: "network-only",
        })
        .then((response) => {
            return response.data.shift;
        });

    const grouped = _.groupBy(shifts, ({ start_date }) => {
        return moment(start_date).format("MM/DD/YYYY");
    });

    const mapped = _.mapValues(grouped, (values) => {
        const enrollments = _.flatMap(
            values,
            ({
                id: shift_id,
                shift_states: [{ counselor_enrollment = [] }],
                start_date,
                end_date,
            }) => {
                return _.sortBy(
                    _.map(counselor_enrollment, (enrollment) => ({
                        shift_states_id: enrollment.shift_states_id,
                        id: enrollment.id,
                        enrollment_id: enrollment.id,
                        shift_id,
                        backup: _.get(enrollment, "backup", false),
                        students: _.get(
                            enrollment,
                            "students_enrollment_aggregate.aggregate.count",
                            0
                        ),
                        start: start_date,
                        end: end_date,
                        start_date: start_date,
                        end_date: end_date,
                    })),
                    "backup"
                );
            }
        );
        const first = values[0];
        const last = values[values.length - 1];
        return {
            startDate: first.start_date,
            endDate: last.end_date,
            start: first.start_date,
            end: last.end_date,
            enrollments,
        };
    });

    return _.values(mapped);
};

const updateShiftCapacity = (shiftId, capacity) => {
    return apollo.mutate({
        mutation: QUERIES.UPDATE_SHIFT_CAPACITY,
        variables: {
            shiftId,
            capacity,
            stateId: CONSTANT.DEFAULT_STATE_ID,
        },
    });
};
export const scheduleService = {
    list,
    newShift,
    copyShifts,
    deleteShift,
    counselorShiftDetails,
    adminShiftDetails,
    joinShift,
    leaveShift,
    availableShifts,
    updateShiftCapacity,
    getScheduleFor,
};
