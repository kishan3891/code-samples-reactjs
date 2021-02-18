import { CONSTANT, counselorConstants, userConstants } from "../constants";
import { counselorService, trueVaultService, userService } from "../services";
import { alertActions, appActions, counselorActions } from "./";
import { push, replace } from "connected-react-router";
import { createActionThunk } from "../constants/actionTypes";
import { storage, toFileBase64 } from "../helpers";

const location = window.location;
const register = createActionThunk(
    userConstants.REGISTER_REQUEST,
    async (user, registerState, { dispatch }) => {
        if (registerState === userConstants.REGISTER_STATE.ONBOARDING) {
            // trigger phone verification
            await userService.continueOnboarding(
                user.authToken,
                user.password,
                user.phoneNumber
            );
        }
        // store current state for next screen, this needs
        // to be dispatch before the location action is dispatched
        dispatch({
            type: userConstants.REGISTER_REQUEST.SUCCEEDED,
            payload: {
                registerState,
                user,
            },
        });

        if (registerState === userConstants.REGISTER_STATE.COMPLETE) {
            const { user: currentUser, tokens } = await userService.me(
                user.authToken
            );

            dispatch(
                alertActions.success(
                    "Thank you, your account has been verified!"
                )
            );
            userService.onLoggedIn({
                ...tokens,
            });
            user = {
                ...currentUser,
                authToken: null,
                onBoardingCompleted: true,
            };
            dispatch({
                type: userConstants.RESTORE_SESSION.SUCCEEDED,
                payload: {
                    user: {
                        ...user,
                    },
                },
            });
            if (currentUser.userTypeId === userConstants.USER_TYPES.COUNSELOR) {
                dispatch(appActions.bootup());
            }

            // dispatch(push("/home"));
        } else {
            dispatch(push("/verification"));
        }

        return {
            registerState,
            user,
        };
    }
);

const login = createActionThunk(
    userConstants.LOGIN_REQUEST,
    async (username, password, { dispatch }) => {
        const { user, idp } = await userService.login(username, password);
        user.authToken = idp;

        return dispatch(navigateToLandingPage(user));
    }
);

const restoreSession = createActionThunk(
    userConstants.RESTORE_SESSION,
    async ({ dispatch, getState }) => {
        const {
            router: {
                location: { query },
            },
        } = getState();

        if (query.token) {
            storage();
        }
        if (!query.token && !storage(CONSTANT.STORAGE.HASURA_TOKEN)) {
            dispatch(replace("/login"));

            return;
        }

        try {
            // fetch TV and db user info

            const token = query.token || storage(CONSTANT.STORAGE.HASURA_TOKEN);

            let { user, tokens } = await userService.me(token);
            if (
                query.token &&
                user.onBoardingCompleted &&
                location.hash.includes("sign-up")
            ) {
                dispatch(replace("/login"));
            }

            if (query.token) {
                // forgot password or initial onboarding request
                return {
                    user: {
                        email: user.email,
                        name: user.name,
                    },
                };
            }

            // store tokens for follow up calls
            userService.onLoggedIn({
                ...tokens,
            });

            if (query.code && query.scope) {
                dispatch(getPaymentDetailsToken(query.code));
            }
            const isAdmin = user.userTypeId === userConstants.USER_TYPES.ADMIN;
            dispatch(counselorActions.updateOrCreateSendBirdUser(user));
            dispatch(navigateToLandingPage(user, isAdmin));
            dispatch(appActions.bootup());
            // dispatch early so that information is stored in redux to allow for Route checking logic to work

            return { user };
        } catch (e) {
            if (!e.expired) {
                e.suppressError = true;
            }
            if (e.expired) {
                storage();
                dispatch(replace("/login"));
            }
            dispatch({
                type: userConstants.LOGIN_REQUEST.FAILED,
                payload: {},
            });

            throw e;
        }
    }
);
const tryAvatarFetch = (user) => {
    return async () => {
        if (!user.avatarBlobId) {
            return false;
        }
        return await trueVaultService.image(
            user.profileVaultId,
            user.avatarBlobId,
            "avatar.png"
        );
    };
};

const navigateToLandingPage = (user) => {
    return (dispatch) => {
        const isAdmin = user.userTypeId === userConstants.USER_TYPES.ADMIN;
        dispatch({
            type: userConstants.RESTORE_SESSION.SUCCEEDED,
            payload: {
                user,
            },
        });
        if (isAdmin) {
            storage(CONSTANT.STORAGE.IS_ADMIN, true);
            if (!user.id) {
                dispatch(push("/verification"));
                return {
                    user: {
                        ...user,
                        isAdmin: true,
                    },
                };
            }
            // if admin navigate to counselor page
            dispatch(replace("/"));
            return {
                user: {
                    ...user,
                    isAdmin: true,
                },
            };
        }

        // check if onboarding was completed by the counselor
        if (user.onBoardingCompleted) {
            // if (!user.avatarUrl) {
            //   dispatch(replace("/profile"));
            //} else {
            const page = location.pathname.split("/").pop();
            if (!user.id) {
                dispatch(push("/verification"));
            } else if (!page) {
                dispatch(replace("/"));
            }
            //}
        } else {
            dispatch(replace("/sign-up"));
        }
        return { user };
    };
};

const getPaymentDetailsToken = (code) => {
    return async (dispatch) => {
        await userService.paymentInformation(code);

        dispatch(
            alertActions.success(
                "Thank you, your payment information saved successfully!"
            )
        );
    };
};

function logout(redirect) {
    userService.logout(redirect);
    return { type: userConstants.LOGOUT };
}

const finalizeLogin = async (token, dispatch) => {
    const { user, tokens } = await userService.me(token);
    const { profileVaultId, profileDocumentId } = user;
    if (profileVaultId && profileDocumentId) {
        trueVaultService.ids.profileVaultId(profileVaultId);
        trueVaultService.ids.documentVaultId(profileDocumentId);
    }
    userService.onLoggedIn({
        ...tokens,
    });
    dispatch(counselorActions.updateOrCreateSendBirdUser(user));
    dispatch(navigateToLandingPage(user));
    dispatch(appActions.bootup());
};

const uploadAvatar = createActionThunk(
    counselorConstants.UPLOAD_AVATAR,
    /**
     *
     * @param {File} file
     * @param getState
     * @return {Promise<{avatarUrl}>}
     */
    async (file, { getState }) => {
        const {
            authentication: { user },
        } = getState();

        const size = file.size / Math.pow(1024, 2);
        if (size > CONSTANT.MAX_AVATAR_SIZE_IN_BYTES) {
            throw new Error(
                `Image must be <=${CONSTANT.MAX_AVATAR_SIZE_IN_MB} mb`
            );
        }
        if (!file.type.includes("image/")) {
            throw new Error(
                "Only images of type jpg,jpeg or png are supported."
            );
        }

        file = await resizeAvatar(file, 500, 500);
        const avatarUrl = await counselorService.uploadAvatar(
            user.profileDocumentId,
            file
        );

        return { avatarUrl };
    }
);

/**
 *
 * @param file
 * @return {Promise<HTMLImageElement>}
 */
const toImage = async (file) => {
    return new Promise(async (resolve) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.src = await toFileBase64(file);
    });
};
const resizeAvatar = async (file, width, height) => {
    const image = await toImage(file);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let ratio = 1;
    if (image.width > width || image.height > height) {
        const wRatio = width / image.width;
        const hRatio = height / image.height;
        ratio = Math.min(wRatio, hRatio);
    }
    if (ratio === 1) {
        return file;
    }

    canvas.width = image.width * ratio;
    canvas.height = image.height * ratio;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            resolve(
                new File([blob], "avatar.png", {
                    type: "image/png",
                })
            );
        }, "image/png");
    });
};
const forgotPassword = createActionThunk(
    userConstants.FORGOT_PASSWORD,
    async (email) => {
        return await userService.forgotPassword(email);
    }
);
const attemptPasswordChange = createActionThunk(
    userConstants.CHANGE_PASSWORD,
    async (password, token, { dispatch }) => {
        await userService.changePassword(password, token);
        dispatch({
            type: "softReset",
        });
        dispatch(alertActions.success("Password changed successfully!"));
        return true;
    }
);

const continueOnboarding = (user) => {
    return (dispatch) => {
        dispatch(register(user, userConstants.REGISTER_STATE.ONBOARDING));
    };
};
const initiateTFA = createActionThunk(
    userConstants.INITIATE_TFA,
    async (phoneNumber = null, { dispatch, getState }) => {
        const {
            registration: { user = {} },
            authentication: { user: authUser },
        } = getState();

        await userService.initiateTFA(
            phoneNumber,
            authUser?.authToken || user?.authToken
        );
        return true;
    }
);
const verifyTFA = createActionThunk(
    userConstants.VERIFY_TFA,
    async (code, { dispatch, getState }) => {
        const {
            registration: { user },
            authentication: { user: authUser },
            counselor: { counselor },
        } = getState();
        const token = await userService.verifyTFA(
            code,
            authUser?.authToken || user?.authToken
        );
        if (authUser && !authUser.id) {
            // store token temp
            userService.onLoggedIn({
                idp: token,
            });
            await finalizeLogin(token, dispatch);
        } else {
            dispatch(
                register(
                    user || counselor,
                    userConstants.REGISTER_STATE.COMPLETE
                )
            );
        }
        return true;
    }
);

export const userActions = {
    restoreSession,
    login,
    logout,
    forgotPassword,
    attemptPasswordChange,
    register,
    uploadAvatar,

    continueOnboarding,
    initiateTFA,
    verifyTFA,
    REGISTER_STATE: userConstants.REGISTER_STATE,
};
