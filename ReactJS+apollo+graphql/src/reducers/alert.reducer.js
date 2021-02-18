import { alertConstants } from "../constants";

let id = 0;
const nextId = () => {
    return ++id;
};
export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: "success",
                id: nextId(),
                options: action.options,
                message: action.message,
            };
        case alertConstants.ERROR:
            return {
                type: "error",
                id: nextId(),
                options: action.options,
                message: action.message,
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
}
