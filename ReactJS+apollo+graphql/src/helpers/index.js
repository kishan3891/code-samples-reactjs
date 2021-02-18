import * as _ from "lodash";
import SimpleReactValidator from "simple-react-validator";
import moment from "moment";

export * from "./fake-backend";
export * from "./history";
export * from "./store";
export * from "./auth-header";
export * from "./symptoms";
export * from "./logger";
export * from "./data-proxy";

export const toFileBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
export function storage(key, value) {
    if (!key) {
        localStorage.clear();
        return;
    }
    if (value) {
        if (_.isObjectLike(value)) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }
    value = localStorage.getItem(key);
    if (value && value.startsWith("{")) {
        value = JSON.parse(value);
    }
    return value;
}

export function logout(redirect = true) {
    storage();
    if (!redirect) {
        return;
    }
    if (window.location.href.includes("/admin")) {
        window.location = "/#/admin/login";
    } else {
        window.location.reload("/#/login");
    }
    // window.location = "/admin/login";
}

export const compareByAlpha = (a, b, sortOrder) => {
    return (a || "").localeCompare(b);
};

export const coalesce = (obj, keyList) => {
    let resolvedValue;
    if (_.isObject(obj)) {
        _.some(keyList, (key) => {
            resolvedValue = _.get(obj, key);
            return !_.isUndefined(resolvedValue);
        });
    }
    return resolvedValue;
};

export const formatMoney = (
    amount,
    decimalCount = 2,
    decimal = ".",
    thousands = ","
) => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(
            (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount
                ? decimal +
                  Math.abs(amount - i)
                      .toFixed(decimalCount)
                      .slice(2)
                : "")
        );
    } catch (e) {
        console.log(e);
    }
};

export const formatPhone = (phone) => {
    const cleaned = ("" + phone).replace(/[^\dX]/g, "");

    const match = cleaned
        .substr(-10, 10)
        .match(/^([\w\d]{3})([\w\d]{3})([\w\d]{4})/);
    if (match) {
        return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
};
export const newValidator = () => {
    return new SimpleReactValidator({
        validators: {
            counslrPassword: {
                message: `Your password must be at least 8 characters long and contain each of the following:<br/>• At least one uppercase letter<br/>• At least one number<br/>• At least one special character`,
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(
                        val,
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[."',:;()_`~#?!@$%^&*\-\=\/+<>\[\]\{\}\|\\\(\)]).{6,}$/gm
                    );
                },
                required: true,
            },
        },
    });
};

export const getCurrentPayPeriod = () => {
    const today = moment();
    const range = {
        startDate: today.clone(),
        endDate: today.clone(),
    };
    if (today.date() <= 15) {
        range.startDate.startOf("month");
        range.endDate.date(15);
    } else {
        range.startDate.date(16);
        range.endDate.endOf("month");
    }
    range.startDate.startOf("day");
    range.endDate.endOf("day");
    return range;
};
export const dateWithinRange = (
    { start, end },
    date,
    options = { excludeStart: false, excludeEnd: false }
) => {
    start = moment(start).valueOf();
    end = moment(end).valueOf();
    date = moment(date);
    let oStart = date.valueOf();
    let oEnd = date.valueOf();
    let excludeStart = options.excludeStart || false;
    let excludeEnd = options.excludeEnd || false;

    if (options.hasOwnProperty("exclusive")) {
        excludeStart = excludeEnd = options.exclusive;
    }

    const startInRange = start < oStart || (start <= oStart && !excludeStart);
    const endInRange = end > oEnd || (end >= oEnd && !excludeEnd);

    return startInRange && endInRange;
};

export const trimNameForChatList = (name) => {
    name = name || "";
    return name.length > 13 ? name.substr(0, 10) + "..." : name;
};
