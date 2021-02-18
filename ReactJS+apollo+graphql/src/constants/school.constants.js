import { makeThunkActionType } from "./actionTypes";

export const schoolsConstants = {
    OPEN_ADD_SCHOOL: "OPEN_ADD_SCHOOL",
    OPEN_VIEW_SCHOOL: "OPEN_VIEW_SCHOOL",
    CLOSE_VIEW_SCHOOL: "CLOSE_VIEW_SCHOOL",
    OPEN_SCHOOL_DISABLE_MODAL: "OPEN_SCHOOL_DISABLE_MODAL",
    ACCOUNT_ENA_DIS: "ACCOUNT_ENA_DIS",

    UPDATE_SCHOOL: makeThunkActionType("UPDATE_SCHOOL"),
    ADD_SCHOOL: makeThunkActionType("ADD_SCHOOL"),
    CHANGE_ENABLE_STATUS: makeThunkActionType("CHANGE_ENABLE_STATUS"),

    GET_ALL: makeThunkActionType("SCHOOLS_GET_ALL"),
    FETCH_SCHOOL_PROFILE: makeThunkActionType("FETCH_SCHOOL_PROFILE"),
    LOAD_SCHOOL_DETAILS: makeThunkActionType("LOAD_SCHOOL_DETAILS"),
};
