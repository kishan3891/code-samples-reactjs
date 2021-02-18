import { userConstants } from "../constants";
import { createDataReducers } from "./helpers";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    registerState: null,
    loaders: {},
};
const registrationReducers = createDataReducers(
    userConstants.REGISTER_REQUEST,
    "register",
    (state, { payload: { user, registerState } = {} }) => ({
        ...state,
        user,
        registerState,
    })
);
export const registration = createReducer(initialState, {
    ...registrationReducers,
});
