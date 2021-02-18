import config from "config";
import { authHeader, logout, storage } from "../../helpers";
import { CONSTANT } from "Constants";
import * as QUERIES from "./queries";

import { trueVaultService } from "../truevault";
import { apollo, runMutation } from "../external.service";
import { counselorService } from "../counselor";
import { withContextToken } from "../helpers";

/**
 *
 * @param {Counselor} user
 */
const register = async (user) => {
    return await counselorService.updateCounselor(
        user.id,
        user.profileDocumentId,
        {
            ...user,
            onBoardingCompleted: true,
        }
    );
};

function getProfile(id) {
    return trueVaultService.users.get(id).then((users) => users[0]);
}

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

const onLoggedIn = ({ user, token, idp }) => {
    if (token) {
        storage(CONSTANT.STORAGE.TRUE_VAULT_TOKEN, token);
    }
    if (idp) {
        storage(CONSTANT.STORAGE.HASURA_TOKEN, idp);
    }
    if (user) {
        const { avatarUrl, ...cleaned } = user;
        storage(CONSTANT.STORAGE.USER, cleaned);
    }
};

const hydrate = (authToken) => {};

const forgotPassword = async (email) => {
    const {
        data: { forgotPassword },
    } = await apollo.mutate({
        mutation: QUERIES.FORGOT_PASSWORD,
        variables: {
            email,
        },
    });
    return forgotPassword === "OK";
};

const changePassword = async (password, token = null) => {
    // Will error out from backend and return with proper message
    return runMutation({
        mutation: QUERIES.UPDATE_PASSWORD,
        variables: {
            password,
        },
        ...withContextToken(token),
    });
};
const verifyTFA = async (code, token) => {
    const {
        data: { verifyTFA: newToken },
    } = await runMutation({
        mutation: QUERIES.VALIDATE_TFA,
        variables: {
            code,
        },
        ...withContextToken(token),
    });
    return newToken;
};
const initiateTFA = async (phoneNumber, token) => {
    return runMutation({
        mutation: QUERIES.INITIATE_TFA,
        ...withContextToken(token),
        variables: phoneNumber
            ? {
                  phoneNumber: phoneNumber,
              }
            : {},
    });
};

const continueOnboarding = async (token, password, phoneNumber) => {
    await apollo.mutate({
        mutation: QUERIES.CONTINUE_ONBOARDING,
        variables: {
            password,
            phoneNumber,
        },
        ...withContextToken(token),
    });
    return true;
};
/**
 *
 * @param token
 * @returns {Promise<{tokens: {token: any, idp: any}, user: (Object|TrueVaultUser|{id: any, userTypeId: number})}>}
 */
const me = async (token) => {
    const {
        data: {
            me: { userTypeId, onBoardingCompleted, truevault, idp, stripe },
        },
    } = await apollo.query({
        query: QUERIES.ME,
        ...withContextToken(token),
        fetchPolicy: "network-only",
    });
    const { attributes, id } = await trueVaultService.me(truevault);
    return {
        user: {
            id,
            ...attributes,
            userTypeId,
            onBoardingCompleted,
            stripe,
        },
        tokens: {
            token: truevault,
            idp,
        },
    };
};
const login = async (email, password) => {
    email = email.trim();
    password = password.trim();

    const {
        data: {
            login: {
                userTypeId,
                idp,
                onBoardingCompleted,
                truevault,
                stripe,
                phoneNumber,
            },
        },
    } = await apollo.query({
        query: QUERIES.LOGIN,
        variables: {
            email,
            password,
        },
        fetchPolicy: "network-only",
    });

    //const { attributes, id, username } = await trueVaultService.me(truevault);

    // FIXME : change order of building user so that the response from `me` is appended to the end
    return {
        user: {
            //...attributes,
            phoneNumber,
            userType: userTypeId,
            userTypeId,
            stripe,
            onBoardingCompleted,
        },

        idp,
    };
};
const paymentInformation = async (authorizationToken) => {
    const {
        data: { savePaymentInformation },
    } = await apollo.mutate({
        mutation: QUERIES.SAVE_PAYMENT_INFO,
        variables: {
            authorizationToken,
        },
    });
    return savePaymentInformation === "OK";
};
export const userService = {
    me,
    login,
    logout,
    onLoggedIn,
    getAll,
    register,
    getProfile,
    changePassword,
    forgotPassword,
    verifyTFA,
    initiateTFA,
    paymentInformation,
    continueOnboarding,
};
