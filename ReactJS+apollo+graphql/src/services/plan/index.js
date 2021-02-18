import * as QUERIES from "./queries";
import { apollo } from "../external.service";

const listPlans = async () => {
    const {
        data: { plan },
    } = await apollo.query({
        query: QUERIES.GET_PLANS,
    });

    return plan;
};

export const planService = {
    QUERIES,
    listPlans,
};
