import React from "react";

const ReviewIcon = ({ positive }) => {
    if (positive) {
        return (
            <span className="review-icon icon-positive-circle">
                <i className="icon-positive" />
            </span>
        );
    }
    return (
        <span className="review-icon icon-negative-circle">
            <i className="icon-negative" />
        </span>
    );
};

export default ReviewIcon;
