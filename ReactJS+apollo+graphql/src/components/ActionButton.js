import React from "react";
import Loading from "./Loading";
import PropTypes from "prop-types";

const ActionButton = ({
    disabled,
    className = "submit-btn",
    onClick,
    processing,
    children,
}) => {
    className += `${processing ? " processing" : ""}`;

    return (
        <button
            disabled={disabled}
            className={className}
            onClick={(e) => !processing && onClick && onClick(e)}
        >
            {processing ? <Loading loading={processing} /> : children}
        </button>
    );
};
export default ActionButton;
ActionButton.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    processing: PropTypes.bool,
    className: PropTypes.string,
};
