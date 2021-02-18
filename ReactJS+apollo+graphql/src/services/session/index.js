import { trueVaultService } from "../truevault";
import * as QUERIES from "./queries";
import * as _ from "lodash";
import { apollo } from "../external.service";
import moment from "moment";
import { CONFIG_CACHE, multiDataFetcher } from "../cache.service";
import { userConstants } from "../../constants";
import { Observable, defer } from "rxjs";

/**
 * @typedef CounslrSession
 * @property {number} id
 * @property {string} note_document_id
 * @property {string} scheduled_end_date
 * @property {string} scheduled_start_date
 * @property {string} chat_channel_id
 * @property {number} session_status_id
 * @property {number} session_type_id
 * @property {string} start_date
 * @property {string} end_date
 * @property {Student} student
 */

/**
 * @typedef {object.<string,string>} SessionNote *
 * @property {number} session_id
 * @property {number} id
 * @property {string} date
 * @property {string} reasons
 * @property {object.<string,boolean>[]} symptoms
 * @property {string} questions
 * @property {string} concerns
 * @property {string} next_steps
 *
 * @description An object that has keys with of NotesConfig.id
 */
/**
 *
 * @return {Promise<SessionNote>}
 * @param {number} sessionId
 * @param noteDocumentId
 */
const getSessionNote = async (sessionId, noteDocumentId) => {
    return {
        session_id: sessionId,
        sessionId,
        ...(await trueVaultService.documents.notes.get(noteDocumentId)),
    };
};

/**
 *
 * @param studentId
 * @return {Promise<SessionNote[]>}
 */
const getPastSessionNotes = async (studentId) => {
    const {
        data: { getPastNotesDocumentIds: pastNotes },
    } = await apollo.query({
        query: QUERIES.GET_PAST_SESSION_NOTES_IDS,
        variables: {
            studentId,
        },
    });

    const notesByDocumentId = _.keyBy(
        _.filter(pastNotes, "note_document_id"),
        "note_document_id"
    );
    const ids = _.keys(notesByDocumentId);
    if (!ids.length) {
        return [];
    }
    return (await trueVaultService.documents.notes.list(ids)).map((note) => {
        return {
            ...note,
            saved: true,
            ...notesByDocumentId[note.id],
        };
    });
};
const saveSessionNotes = async (noteDocumentId, notes) => {
    return trueVaultService.documents.notes
        .update(noteDocumentId, notes)
        .catch((e) => {
            const {
                response: {
                    data: { error },
                },
            } = e;
            if (error.message === "Authorization Error") {
                throw new Error("Session notes can no longer be updated.");
            }
            throw e;
        });
};
const markSessionNotesSubmitted = (sessionId) =>
    apollo.mutate({
        mutation: QUERIES.MARK_SESSION_NOTES_SUBMITTED,
        variables: {
            sessionId,
        },
    });
/**
 *
 * @param counselorId
 * @param date
 * @return {Promise<CounslrSession[]>}
 */
const getSessionForDate = async (counselorId, date) => {
    const startDate = moment(date).startOf("day").subtract(1, "day");
    const endDate = moment(date).endOf("day");
    const {
        data: { sessions },
    } = await apollo.query({
        query: QUERIES.SESSIONS_FOR_DAY,
        variables: {
            counselorId,
            startDate,
            endDate,
        },
        fetchPolicy: "no-cache",
    });

    return await mapStudentsProfileFromSessions(sessions);
};

/**
 *
 * @param counselorId
 * @param date
 * @return {Observable<{sessions:CounslrSession[],subscription:Subscription }>}
 */
const watchSessionsForDate = (counselorId, date) => {
    const startDate = moment(date).startOf("day");
    // TODO : revert back to same day day
    const endDate = moment(date).add(1, "days").endOf("day");

    return new Observable((obs) => {
        // FIXME : For some reason this when calling mapStudents method it sends 2 requests
        // First one is empty response and second contains student information
        const subscription = apollo
            .subscribe({
                query: QUERIES.SUBSCRIBE_SESSIONS_FOR_DAY,
                variables: {
                    counselorId,
                    startDate,
                    endDate,
                },
            })
            .subscribe({
                next({ data: { sessions } }) {
                    defer(async () => {
                        return await mapStudentsProfileFromSessions(sessions);
                    }).subscribe({
                        next(sessions) {
                            obs.next({
                                sessions,
                                subscription,
                            });
                        },
                    });
                },
            });
    });
};

/**
 *
 * @param {CounslrSession[]} sessions
 * @return {Promise<CounslrSession[]>}
 */
const mapStudentsProfileFromSessions = async (sessions) => {
    const studentProfileDocumentIds = _.uniq(
        _.map(sessions, "student.profile_document_id")
    );
    const results = await multiDataFetcher(
        studentProfileDocumentIds,
        (ids) => trueVaultService.users.studentsByDocumentId(ids),
        userConstants.studentCacheKey
    );

    const studentByProfileDocumentId = _.keyBy(results, "id");
    const gender = CONFIG_CACHE.GENDER;
    return sessions.map((session) => {
        const student = session.student;
        const profile = studentByProfileDocumentId[student.profile_document_id];
        return {
            ...session,
            student: {
                ...profile,
                ...student,
                gender: gender.find((g) => g.id === profile?.genderId),
            },
        };
    });
};
const changeSessionStatus = async (sessionId, statusId) => {
    await apollo.mutate({
        mutation: QUERIES.CHANGE_SESSION_STATUS,
        variables: {
            sessionId,
            statusId,
        },
        fetchPolicy: "no-cache",
    });

    const {
        data: { session },
    } = await apollo.query({
        query: QUERIES.GET_SESSION_BY_ID,
        variables: {
            sessionId,
        },
        fetchPolicy: "no-cache",
    });
    const mapped = await mapStudentsProfileFromSessions([session]);

    return mapped[0];
};

export const sessionService = {
    getSessionNote,
    getPastSessionNotes,
    saveSessionNotes,
    markSessionNotesSubmitted,
    getSessionForDate,
    mapStudentsProfileFromSessions,
    changeSessionStatus,
    watchSessionsForDate,
};
