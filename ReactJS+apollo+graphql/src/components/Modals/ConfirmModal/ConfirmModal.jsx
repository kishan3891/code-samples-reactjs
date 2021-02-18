import React from "react";
import "./style.scss";
import { Modal } from "antd";
import Loading from "Components/Loading";

export default class ConfirmModal extends React.Component {
    render() {
        return (
            <Modal
                visible={true}
                onCancel={this.props.onCancel}
                wrapClassName={"disable-modal"}
                closable={false}
                footer={null}
            >
                <div
                    className="modal-text"
                    dangerouslySetInnerHTML={{ __html: this.props.text }}
                />
                <div className="form-group">
                    <button
                        className="disable-btn"
                        onClick={this.props.handleOnclick || this.props.onClick}
                    >
                        {this.props.loading ? (
                            <Loading loading={this.props.loading} />
                        ) : this.props.buttonText ? (
                            this.props.buttonText
                        ) : (
                            "Disable account"
                        )}
                    </button>
                </div>
                <div className="form-group text-center">
                    <button
                        type="button"
                        className="btn btn-link center-block btncancel"
                        onClick={this.props.onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        );
    }
}
