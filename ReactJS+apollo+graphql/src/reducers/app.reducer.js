import { CONSTANT } from "../constants";
import { createDataReducers } from "./helpers";
import { createReducer } from "@reduxjs/toolkit";

/**
 * @typedef AppState
 * @property {Sexuality[]} sexuality
 * @property {Gender[]} gender
 * @property {Ethnicity[]} ethnicity
 * @property {NotesConfig[]} notesConfig
 * @property {CounslrConfig} config
 */
/**
 *
 * @type {AppState}
 */
const initialState = {
    /**
     * @type {CounslrConfig}
     */
    config: {
        maxShiftCapacity: 1,
        minShiftHoursDuration: 1,
        maxShiftHoursDuration: 1,
        maxBackupsPerShift: 1,
    },
    /**
     * @type {NotesConfig[]}
     */
    notesConfig: [],
    /**
     * @type {Sexuality[]}
     */
    sexuality: [],
    /**
     * @type {Gender[]}
     */
    gender: [],
    /**
     * @type {Ethnicity[]}
     */
    ethnicity: [],
};

const bootupReducers = createDataReducers(
    CONSTANT.BOOT_UP,
    "bootup",
    (state, { payload }) => {
        return {
            ...state,
            ...payload,
        };
    }
);

export const app = createReducer(initialState, {
    ...bootupReducers,
});
