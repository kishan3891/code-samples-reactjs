import moment from "moment";

export const canViewDateRange = (start, end) => {
    const now = moment();

    const plus4Week = now.clone().startOf("week").add(3, "weeks");
    start = moment(start).startOf("day");
    return !plus4Week.isBefore(start);
};
