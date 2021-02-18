import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import createRootReducer from "../reducers";
import { routerMiddleware } from "connected-react-router";
import { history } from "../helpers/history";

const loggerMiddleware = createLogger();

const middleware = [
    routerMiddleware(history), // for dispatching history actions
    thunkMiddleware,
    loggerMiddleware,
];
/*
const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const enhancer = composeEnhancers(applyMiddleware(...middlewares));*/
export const store = configureStore({
    reducer: createRootReducer(history),

    middleware,
    devTools: process.env.NODE_ENV !== "production",
});
