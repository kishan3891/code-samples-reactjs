import React from "react";
import LoadingSpinner from "Components/Loading/LoadingSpinner";

export default function CounselorTabWrapper({
    children,
    loading,
    full,
    counselornotfound,
}) {
    if (!loading && full) {
        return children;
    }
    if (full) {
        return (
            <LoadingSpinner spinning={loading} dimensions="large">
                {children}
            </LoadingSpinner>
        );
    } else {
        return (
            <div className="container">
                <div className="payment-main-outer">
                    <div className="row">
                        <div
                            className={
                                counselornotfound
                                    ? "col-sm-12 col-md-12 no-counselor"
                                    : "col-sm-12 col-md-12"
                            }
                        >
                            <LoadingSpinner
                                wrapperClassName={"reviewLoading"}
                                spinning={loading}
                                dimensions="large"
                            >
                                {children}
                            </LoadingSpinner>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
