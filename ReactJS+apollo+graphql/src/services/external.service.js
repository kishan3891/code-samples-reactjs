import ApolloBoostClient from "apollo-boost";
import * as axios from "axios";
import { logout, storage } from "../helpers";
import { CONSTANT } from "../constants";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";

import { getMainDefinition } from "apollo-utilities";

import { setContext } from "apollo-link-context";

const buildAuthHeaders = ({ useHasuraUserId, headers = {} }) => {
    const jwt = storage(CONSTANT.STORAGE.HASURA_TOKEN);
    const isAdmin = storage(CONSTANT.STORAGE.IS_ADMIN);

    const Authorization = jwt ? `Bearer ${jwt}` : "";
    const toAdd = {};
    if (!headers.Authorization && Authorization) {
        toAdd["Authorization"] = Authorization;
    }
    if (isAdmin) {
        if (useHasuraUserId) {
            const user = storage(CONSTANT.STORAGE.USER);
            if (user) {
                toAdd["x-hasura-user-id"] = user.id;
            }
        }
        // toAdd["x-hasura-admin-secret"] = "admin";
    }
    return {
        headers: {
            ...headers,
            ...toAdd,
        },
    };
};

const useError = ({ networkError }) => {
    console.log({ networkError });
    if (networkError) {
        logout();
    }
};

const authLink = setContext((_, context) => buildAuthHeaders(context));
const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WS_URI,
    options: {
        reconnect: true,
        lazy: true,
        connectionParams: () => {
            return buildAuthHeaders({});
        },
    },
});
const secondary = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
        authLink,
        onError(useError),
        split(
            ({ query }) => {
                const { kind, operation } = getMainDefinition(query);
                return (
                    kind === "OperationDefinition" &&
                    operation === "subscription"
                );
            },
            wsLink,
            createUploadLink({ uri: process.env.REACT_APP_GRAPHQL_URI })
        ),
    ]),
});
const upload = secondary;
const ws = secondary;

const _apollo = new ApolloBoostClient({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    request: async (operation) => {
        operation.setContext((context) => buildAuthHeaders(context));
    },
    onError: useError,
});

const createInstance = (config = {}, hooks = {}) => {
    const http = axios.create({
        ...config,
        defaults: {
            ...config.defaults,
        },
    });

    http.interceptors.request.use((config) => {
        const token = hooks.auth && hooks.auth();
        if (token && !config.headers["Authorization"]) {
            config.headers["Authorization"] = token;
        }
        return config;
    });
    http.interceptors.response.use(
        (response) => {
            const data = response.data;
            if (response.status === 401) {
                logout();
                window.location.reload(true);
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            // Edit response config
            return response;
        },
        (error) => {
            console.log(error);
            return Promise.reject(error);
        }
    );
    return http;
};
const http = createInstance();

/**
 *
 * @param {{query:DocumentNode,variables:OperationVariables|*,context:*}}options
 * @param {ApolloClient|ApolloBoostClient} [client]
 */
const runQuery = (options, client = _apollo) => {
    return new Promise((resolve, reject) => {
        client.query(options).then(resolve, (e) => reject(parseError(e)));
    });
};
const parseError = (e, errorOptions) => {
    const error = e.graphQLErrors[0];
    const message = error.message;
    const jwtExpired = message.includes("JWTExpired");

    if (jwtExpired) {
        e = new Error("Authorization token expired");
        e.expired = true;
    } else {
        e = new Error(message);
        const validatorErrors = error.extensions?.validationErrors || {};

        if (errorOptions) {
            Object.keys(errorOptions).forEach((name) => {
                if (validatorErrors[name]) {
                    e.options = errorOptions[name];
                }
            });
        }
    }
    return e;
};
/**
 *
 * @param {{mutation:DocumentNode|*,variables:OperationVariables|*,context:*}}options
 * @param errorOptions
 */
const runSubscription = (options) => {
    return ws.subscribe(options);
};
/**
 *
 * @param {{mutation:DocumentNode|*,variables:OperationVariables|*,context:*}}options
 * @param errorOptions
 */
const runMutation = (options, errorOptions = {}) => {
    return new Promise((resolve, reject) => {
        _apollo
            .mutate(options)
            .then(resolve, (e) => reject(parseError(e, errorOptions)));
    });
};
const apollo = {
    query: runQuery,
    mutate: runMutation,
    subscribe: runSubscription,
    _: _apollo,
};

export { http, apollo, createInstance, runMutation, upload, ws, runQuery };
