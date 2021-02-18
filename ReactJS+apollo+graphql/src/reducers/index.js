import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { users } from "./users.reducer";

import { counselor } from "./counselor.reducer";
import { registration } from "./registration.reducer";
import { schedule } from "./schedule.reducer";
import { schools } from "./schools.reducer";
import { school } from "./school.reducer";
import { plans } from "./plans.reducer";
import { app } from "./app.reducer";
import { counselorSchedules } from "./counselor.schedules.reducer";
import { session } from "./session.reducer";
import { alert } from "./alert.reducer";

import { connectRouter } from "connected-react-router";

/**
 * @typedef RootState
 * @property {ScheduleState} schedule
 * @property {AppState} app
 * @property {SessionState} session
 * @property {CounselorState} counselor
 */

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        authentication,
        users,
        counselor,

        registration,
        school,
        schools,
        alert,
        /**
         * @type
         */
        schedule,
        counselorSchedules,
        session,
        plans,
        app,
    });
export default createRootReducer;
