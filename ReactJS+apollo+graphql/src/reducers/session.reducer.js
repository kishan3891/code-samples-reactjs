import { sessionConstants } from "../constants";
import { createReducer } from "@reduxjs/toolkit";
import { createDataReducers } from "./helpers";
import orderBy from "lodash/orderBy";

/**
 * @typedef SessionStateLoaders
 * @property {boolean} note
 * @property {boolean} pastNotes
 * @property {boolean} sessions
 */
/**
 * @typedef SessionState
 * @property {SessionStateLoaders} loaders
 * @property {CounslrSession} session
 * @property notes
 * @property {CounslrSession[]} session
 * @property pastNotes
 */

/**
 *
 * @type {SessionState}
 */
const initialState = {
    loaders: {
        note: false,
        pastNotes: false,
        sessions: true,
    },

    session: null,
    sessions: [],
    notes: null,
    pastNotes: [],
};

const loadSessionNotesReducer = createDataReducers(
    sessionConstants.LOAD_SESSION_NOTES,
    "notes",
    (state, { payload: { notes } }) => {
        return {
            ...state,
            notes: notes,
        };
    }
);

const loadPastSessionNotesReducer = createDataReducers(
    sessionConstants.LOAD_PAST_SESSION_NOTES,
    "pastNotes",
    (state, { payload: { notes } }) => {
        return {
            ...state,
            pastNotes: orderBy(notes, "date", "desc"),
        };
    }
);
const saveSessionNotesReducer = createDataReducers(
    sessionConstants.SAVE_SESSION_NOTES,
    "savingNotes",
    (state, { payload: { notes, silent } }) => {
        if (silent) {
            return state;
        }
        let pastNotes = state.pastNotes || [];
        if (!pastNotes.find((n) => n.id === notes.id)) {
            pastNotes = orderBy([...pastNotes, notes], "date", "desc");
        } else {
            pastNotes = pastNotes.map((note) => {
                return note.id === notes.id ? notes : note;
            });
        }
        return {
            ...state,
            pastNotes,
            notes: {
                ...state.notes,
                ...notes,
            },
        };
    }
);
const loadSessionsForDayReducer = createDataReducers(
    sessionConstants.GET_SESSION_FOR_DATE,
    "sessions",
    "sessions"
);

const changeSessionStatusReducer = createDataReducers(
    sessionConstants.CHANGE_SESSION_STATUS,
    "sessionStatus",
    (state, { payload: { session } }) => {
        return {
            ...state,
            sessions: state.sessions.map((s) => {
                if (s.id === session.id) {
                    return {
                        ...s,
                        ...session,
                    };
                }
                return s;
            }),
        };
    }
);
export const session = createReducer(initialState, {
    ...loadSessionNotesReducer,
    ...loadPastSessionNotesReducer,
    ...saveSessionNotesReducer,
    ...loadSessionsForDayReducer,
    ...changeSessionStatusReducer,

    [sessionConstants.SET_ACTIVE_SESSION]: (
        state,
        { payload: { session } }
    ) => ({
        ...state,
        session,
    }),
});
