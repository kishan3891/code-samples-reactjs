import React from "react";

const Button = ({ buttonText, onClick, className, children, disabled }) => {
    return (
        <button onClick={onClick} className={className} disabled={disabled}>
            {buttonText}
            {children}
        </button>
    );
};

export default Button;
