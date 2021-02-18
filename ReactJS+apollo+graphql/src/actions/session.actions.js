import { sessionConstants } from "../constants";
import { sessionService } from "../services";
import { alertActions } from "./";
import { createActionThunk } from "../constants/actionTypes";
import { cache, dataFetcher, updateCache } from "../services/cache.service";
import isEqual from "lodash/isEqual";

const getSessionNotes = createActionThunk(
    sessionConstants.LOAD_SESSION_NOTES,
    async (session) => {
        const notes = await sessionService.getSessionNote(
            session.id,
            session.note_document_id
        );
        return { notes };
    }
);

/**
 *
 * @param {Session} session
 * @return {function(...[*]=)}
 */
const setActiveSession = (session) => {
    return (dispatch) => {
        dispatch({
            type: sessionConstants.SET_ACTIVE_SESSION,
            payload: { session },
        });
        dispatch(getSessionNotes(session));
        dispatch(getPastSessionNotes(session.student.id));
    };
};

const getPastSessionNotes = createActionThunk(
    sessionConstants.LOAD_PAST_SESSION_NOTES,
    async (studentId) => {
        const notes = await sessionService.getPastSessionNotes(studentId);
        return { notes };
    }
);

const saveSessionNotes = createActionThunk(
    sessionConstants.SAVE_SESSION_NOTES,
    async (session, notes, silent, { dispatch }) => {
        if (!session.end_date) {
            if (!silent) {
                throw new Error(
                    "Can only save notes when session has been completed"
                );
            }
        }
        const cacheKey = sessionConstants.LOAD_SESSION_NOTES.cacheKey(
            session.id
        );
        const previousNotes = cache.get(cacheKey);
        if (silent && isEqual(notes, previousNotes)) {
            return { session, notes, silent };
        }

        try {
            await sessionService.saveSessionNotes(
                session.note_document_id,
                notes
            );

            if (!silent) {
                await sessionService.markSessionNotesSubmitted(session.id);
            }
        } catch (e) {
            if (!silent) {
                throw e;
            }
        }
        notes = {
            ...notes,
            saved: true,
            date: session.scheduled_start_date,
        };
        cache.set(cacheKey, notes);
        updateCache(
            sessionConstants.LOAD_PAST_SESSION_NOTES.cacheKey(
                session.student.id
            ),
            (cached) => {
                cached = cached || [];
                if (!cached.find((n) => n.id === session.note_document_id)) {
                    cached.push(notes);
                }
                return cached;
            }
        );
        if (!silent) {
            dispatch(alertActions.success("Session notes saved!"));
        }

        return { session, notes, silent };
    }
);

const getSessionsForDate = createActionThunk(
    sessionConstants.GET_SESSION_FOR_DATE,
    async (counselorId, date) => {
        const sessions = await sessionService.getSessionForDate(
            counselorId,
            date,
            () => {}
        );
        return { sessions };
    }
);
const changeSessionStatus = createActionThunk(
    sessionConstants.CHANGE_SESSION_STATUS,
    async (session, statusId) => {
        session = await sessionService.changeSessionStatus(
            session.id,
            statusId
        );
        return { session };
    }
);

let subscriptions = [];
const watchSessionsForDate = (counselorId, date) => {
    return (dispatch) => {
        let init = false;
        subscriptions.forEach((s) => s.unsubscribe());
        subscriptions = [];

        dispatch({
            type: sessionConstants.GET_SESSION_FOR_DATE.START,
        });
        const s = sessionService
            .watchSessionsForDate(counselorId, date)
            .subscribe({
                next({ sessions, subscription }) {
                    dispatch({
                        type: sessionConstants.GET_SESSION_FOR_DATE.SUCCEEDED,
                        payload: {
                            sessions,
                        },
                    });
                    if (!init) {
                        subscriptions.push(subscription);
                        init = true;
                        dispatch({
                            type: sessionConstants.GET_SESSION_FOR_DATE.ENDED,
                        });
                    }
                },
            });
        subscriptions.push(s);
    };
};

export const sessionActions = {
    getSessionNotes,
    setActiveSession,
    getPastSessionNotes,
    saveSessionNotes,
    getSessionsForDate,
    changeSessionStatus,
    watchSessionsForDate,
};
