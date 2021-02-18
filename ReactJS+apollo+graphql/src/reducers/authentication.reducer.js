import { counselorConstants, userConstants } from "../constants";
import { createReducer } from "@reduxjs/toolkit";
import { createDataReducers } from "./helpers";

/**
 * @state.authentication
 * @type {{loaders: {avatarRefresh: boolean, avatar: boolean, login: boolean, restoreSession: boolean, verifyTFA: boolean, initiateTFA: boolean, register: boolean}, loading: boolean, user: null}}
 */
const initialState = {
    user: null,

    loaders: {
        avatarRefresh: false,
        avatar: false,
        login: false,
        register: false,
        restoreSession: false,
        verifyTFA: false,
        initiateTFA: false,
    },
    loading: false,
};

const defaultReducer = (state, { payload: { user } = {} }) => {
    return {
        ...state,
        loading: false,
        user: user
            ? {
                  ...user,
                  isAdmin: user.userTypeId === userConstants.USER_TYPES.ADMIN,
              }
            : null,
    };
};

const avatarReducers = createDataReducers(
    counselorConstants.UPLOAD_AVATAR,
    "avatar",
    (state, { payload: { avatarUrl } }) => {
        return {
            ...state,
            user: {
                ...state.user,
                avatarUrl,
            },
        };
    }
);
const loginReducers = createDataReducers(
    userConstants.LOGIN_REQUEST,
    "login",
    defaultReducer
);
const restoreSessionReducers = createDataReducers(
    userConstants.RESTORE_SESSION,
    "restoreSession",
    defaultReducer
);

const initiateTFAReducers = createDataReducers(
    userConstants.INITIATE_TFA,
    "initiateTFA"
);
const verifyTFAReducers = createDataReducers(
    userConstants.VERIFY_TFA,
    "verifyTFA"
);
export const authentication = createReducer(initialState, {
    ...avatarReducers,
    ...loginReducers,
    ...restoreSessionReducers,
    ...initiateTFAReducers,
    ...verifyTFAReducers,
    [userConstants.REGISTER_REQUEST.SUCCEEDED]: (
        state,
        {
            payload: {
                user: { onBoardingCompleted },
            },
        }
    ) => ({
        ...state,
        user: {
            ...state.user,
            onBoardingCompleted,
        },
    }),
    [userConstants.LOGIN_REQUEST.FAILED]: (state, { payload: { error } }) => ({
        ...initialState,
        serverError: error,
        loading: false,
    }),
    [userConstants.LOGOUT]: (state) => ({
        ...initialState,
    }),
    softReset: (state) => ({
        ...initialState,
        loading: false,
    }),
});
