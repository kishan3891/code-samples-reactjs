import { alertConstants } from "../constants";

export const alertActions = {
    success,
    error,
    clear,
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message, options = {}) {
    if (message && message.hasOwnProperty("message")) {
        options = message.options || options;
        message = options.message || message.message;
    }
    return { type: alertConstants.ERROR, message, options };
}

function clear() {
    return { type: alertConstants.CLEAR };
}
