import { makeThunkActionType } from "./actionTypes";

export const userConstants = {
    LOGIN_REQUEST: makeThunkActionType("USERS_LOGIN_REQUEST"),
    RESTORE_SESSION: makeThunkActionType("RESTORE_SESSION"),

    LOGOUT: "USERS_LOGOUT",

    VALIDATE_CODE: makeThunkActionType("VALIDATE_CODE"),

    REGISTER_REQUEST: makeThunkActionType("USERS_REGISTER_REQUEST"),

    GET_PROFILE_REQUEST: "GET_PROFILE_REQUEST",
    GET_PROFILE_SUCCESS: "GET_PROFILE_SUCCESS",
    GET_PROFILE_FAILURE: "GET_PROFILE_FAILURE",
    CHANGE_PASSWORD: makeThunkActionType("CHANGE_PASSWORD"),
    INITIATE_TFA: makeThunkActionType("INITIATE_TFA"),
    VERIFY_TFA: makeThunkActionType("VERIFY_TFA"),
    FORGOT_PASSWORD: makeThunkActionType("FORGOT_PASSWORD"),
    REGISTER_STATE: {
        COMPLETE: "COMPLETE",
        ONBOARDING: "ONBOARDING",
        CHANGE_PASSWORD: "CHANGE_PASSWORD",
    },
    USER_TYPES: {
        STUDENT: 1,
        COUNSELOR: 2,
        ADMIN: 3,
    },
    studentCacheKey: (value) =>
        `${typeof value === "string" ? value : value.id}_student`,
    counselorCacheKey: (value) =>
        `${typeof value === "string" ? value : value.id}_student`,
};
