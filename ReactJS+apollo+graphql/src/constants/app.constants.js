import finderImage from "../images/finder.svg";
import smallSchedule from "../images/small-schedule.png";
import defaultSchool from "../images/defaultSchool.png";
import scheduleIcon from "../images/schedule.svg";
import { makeThunkActionType } from "./actionTypes";
import Logoimage from "../images/admin-logo-white.png";
import BlueLogo from "../images/admin-logo.png";

export const CONSTANT = {
    SEARCH_IMAGE: finderImage,
    SCHEDULE_ICON_SM: smallSchedule,
    SCHEDULE_ICON: scheduleIcon,
    MAX_BACKUP_SLOTS: 9,
    MAX_AVATAR_SIZE_IN_MB: 150,
    MAX_AVATAR_SIZE_IN_BYTES: 1000000 * 150,
    LOGO_WHITE: Logoimage,
    LOGO_BLUE: BlueLogo,
    TIME_FORMAT: "h:mma",
    INPUT_DATE_FORMAT: "MM/DD/YYYY",
    REVIEW_DATE_FORMAT: "MMM DD, YYYY",
    SHORT_DATE_FORMAT: "MMM D, YYYY",
    EARNING_DATE_FORMAT: "MMMM D, YYYY",
    SHIFT_VIEW_DATE_FORMAT: "MMMM D, YYYY",
    MONTH_DATE_FORMAT: "MMM D",

    ACC_DISABLED_TEXT: "Are you sure you want to disable this account?",
    SCHOOL_DISABLED_TEXT:
        "Are you sure you want to disable this school? It will no longer be available in the app for sign in.",

    //ADMIN SCHOOL MODULE
    DEFAULT_SCHOOL_IMG: defaultSchool,
    PLANS_TITLE: ["Counslr", "Counslr+"],
    PLANS_SUBTITLE: [
        "1 scheduled session per month",
        "1 scheduled session per week",
    ],

    APP_ID: process.env.REACT_APP_SENDBIRD_APP_ID,
    USER_ID: "user_id",
    DISPLAY_NONE: "none",
    DISPLAY_BLOCK: "block",
    DISPLAY_FLEX: "flex",
    ACTIVE_CLASSNAME: "active",
    KEY_ENTER: 13,
    FILE_ID: "attach_file_id",
    UPDATE_INTERVAL_TIME: 5 * 1000,
    COLOR_RED: "#DC5960",
    MESSAGE_REQ_ID: "reqId",
    KEY_MESSAGE_LAST_TIME: "origin",
    STORAGE: {
        TRUE_VAULT_TOKEN: "token",
        HASURA_TOKEN: "idp",
        USER: "user",
        IS_ADMIN: "admin",
    },
    //Session timer value
    SESSION_TIME: 45,
    SESSION_RESET_TIME: 60,
    SESSION_FIRST_WARN: 40,
    SESSION_LAST_WARN: 44,
    DEFAULT_STATE_ID: 32, // NY
    BOOT_UP: makeThunkActionType("BOOT_UP"),
};
