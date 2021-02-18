import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({
    component: Component,
    checker = () => "/login",
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) => {
            const redirectTo = checker();
            return redirectTo && rest.path !== redirectTo ? (
                <Redirect
                    to={{
                        pathname: redirectTo,
                        state: { from: props.location },
                    }}
                />
            ) : (
                <Component
                    {...props}
                    verificationCodeError={rest?.verificationCodeError}
                    verificationHandleSubmit={rest?.verificationHandleSubmit}
                />
            );
        }}
    />
);

export const CounselorRoute = ({
    component: Component,
    user,
    checker,
    requiresOnboarding = true,
    ...rest
}) => {
    return (
        <PrivateRoute
            component={Component}
            checker={() => {
                if (checker && checker()) {
                    return null;
                }
                if (!user) {
                    return "/login";
                }
                if (requiresOnboarding && !user.onBoardingCompleted) {
                    return "/sign-up";
                }
            }}
            {...rest}
        />
    );
};

export const AdminRoute = ({ component: Component, user, ...rest }) => {
    return (
        <PrivateRoute
            component={Component}
            checker={() => {
                return user && user.isAdmin;
            }}
            {...rest}
        />
    );
};
