import React from "react";
import LoadingSpinner from "Components/Loading/LoadingSpinner";

const LoadingPage = () => {
    return (
        <div className="app-left">
            <div className="welcome-text" />
            <div className="account-step">
                <LoadingSpinner spinning={true} dimensions={"large"} />
            </div>
        </div>
    );
};
export default LoadingPage;
