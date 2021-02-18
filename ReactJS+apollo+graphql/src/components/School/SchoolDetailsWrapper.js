import React from "react";
import LoadingSpinner from "Components/Loading/LoadingSpinner";

export default function SchoolDetailsWrapper({ children, loading }) {
    if (!loading) {
        return children;
    }
    return (
        <LoadingSpinner spinning={loading} wrapperClassName="counslr-spinner">
            {children}
        </LoadingSpinner>
    );
}
