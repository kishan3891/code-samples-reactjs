import { createActionThunk } from "../constants/actionTypes";
import { CONSTANT } from "../constants";
import { fetchSettings } from "../services";
import { counselorActions } from "./counselor.actions";
import { getCurrentPayPeriod } from "../helpers";

/**
 * @callback getState
 * @name getState
 * @return {{hello:boolean}}
 */

const bootupCounselor = () => {
    return (dispatch, getState) => {
        const {
            authentication: { user },
        } = getState();

        if (user && user.id && !user.isAdmin) {
            // if doing counselor login then load the full profile
            dispatch(counselorActions.loadCounselorFullProfile(user));

            const payPeriod = getCurrentPayPeriod();
            const limit = 10;
            dispatch(
                counselorActions.loadEarnings(
                    user.id,
                    payPeriod.startDate,
                    payPeriod.endDate,
                    limit
                )
            );
        }
    };
};
const bootup = createActionThunk(CONSTANT.BOOT_UP, async ({ dispatch }) => {
    dispatch(bootupCounselor());
    return await fetchSettings();
});

export const appActions = {
    bootup,
    bootupCounselor,
};
