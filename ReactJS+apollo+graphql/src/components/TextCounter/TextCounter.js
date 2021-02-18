import React from "react";
import PropTypes from "prop-types";

const TextCounter = ({ value, maxLength, className = "" }) => {
    return (
        <span className={`text-counter ${className}`}>
            {value != null ? value.length : 0}/{maxLength} Characters
        </span>
    );
};

export default TextCounter;
TextCounter.propTypes = {
    value: PropTypes.string,
    maxLength: PropTypes.number.isRequired,
};
