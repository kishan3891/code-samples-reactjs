import { userConstants } from "../constants";

const profileInitialState = {
    user_profile: {},
    profileLoading: false,
};

export function users(state = profileInitialState, action) {
    switch (action.type) {
        case userConstants.GET_PROFILE_REQUEST:
            return {
                profileLoading: true,
            };
        case userConstants.GET_PROFILE_SUCCESS:
            return {
                profileLoading: false,
                user_profile: action.user_profile,
            };
        case userConstants.GET_PROFILE_FAILURE:
            return {
                error: action.error,
            };
        default:
            return state;
    }
}
