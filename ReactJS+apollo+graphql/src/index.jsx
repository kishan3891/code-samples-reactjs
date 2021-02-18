import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
// setup fake backend
import { configureFakeBackend, store } from "./helpers";
import { App } from "./containers/App";
import { ApolloProvider } from "@apollo/react-hooks";
import { apollo } from "./services/external.service";
import * as serviceWorker from "./serviceWorker";
import "react-virtualized/styles.css";

Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_ENVIRONMENT,
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

configureFakeBackend();

render(
    <Sentry.ErrorBoundary fallback="An error has occurred">
        <ApolloProvider client={apollo}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </Sentry.ErrorBoundary>,
    document.getElementById("app")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
