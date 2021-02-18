import React from "react";
import "./style.scss";
import { Modal } from "antd";
import Loading from "Components/Loading";
import PropTypes from "prop-types";

const AlertModal = ({
    onCancel,
    onClick,
    handleOnclick,
    loading,
    text,
    buttonText,
    alertType = "alert",
    wrapClassName = "",
    className = "modal-text",
    fragment = null,

    title = null,
}) => {
    onClick = onClick || handleOnclick;
    const buttonType = alertType === "alert" ? "submit-btn" : "disable-btn";
    if (alertType === "confirm") {
        alertType = "disable";
    }

    return (
        <Modal
            visible={true}
            onCancel={onCancel || onClick}
            wrapClassName={`${alertType}-modal ${wrapClassName}`}
            closable={false}
            footer={null}
        >
            {title && (
                <div className="alert-header">
                    <h3>{title}</h3>
                </div>
            )}
            {text && (
                <div
                    className={className}
                    dangerouslySetInnerHTML={{ __html: text }}
                />
            )}
            {fragment && fragment}
            <div className="form-group">
                <button className={`${buttonType}`} onClick={onClick}>
                    {loading ? (
                        <Loading loading={loading} />
                    ) : buttonText ? (
                        buttonText
                    ) : (
                        "Disable account"
                    )}
                </button>
            </div>
            {onCancel && (
                <div className="form-group text-center">
                    <button
                        type="button"
                        className="btn btn-link center-block btncancel"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </Modal>
    );
};

AlertModal.propTypes = {
    onCancel: PropTypes.func,
    text: PropTypes.string,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    buttonText: PropTypes.string.isRequired,
    alertType: PropTypes.oneOf(["alert", "disable", "confirm"]),
    wrapClassName: PropTypes.string,
    className: PropTypes.string,
};

export default AlertModal;
