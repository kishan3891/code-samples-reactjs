import { plansConstants } from "../constants";
import { planService } from "../services";
import { createActionThunk } from "../constants/actionTypes";

const listPlans = createActionThunk(plansConstants.GET_ALL, async () => {
    const plans = await planService.listPlans();
    return { plans };
});

export const planActions = {
    listPlans,
};
