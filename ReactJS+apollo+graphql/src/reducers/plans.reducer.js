import { createDataReducers } from "./helpers";
import { plansConstants } from "../constants";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loaders: {
        list: false,
    },
    planItems: [],
};

const listPlansReducers = createDataReducers(
    plansConstants.GET_ALL,
    "list",
    (state, { payload }) => {
        return {
            planItems: payload.plans,
        };
    }
);

export const plans = createReducer(initialState, {
    ...listPlansReducers,
});
