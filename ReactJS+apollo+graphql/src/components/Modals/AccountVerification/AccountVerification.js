import React from "react";
import "./style.scss";
import { Modal } from "antd";
import FormInput from "../../FormInput";
import Loading from "Components/Loading";

class AccountVerification extends React.Component {
    state = {
        code: "",
    };
    onVerifyCode = () => {
        const { code } = this.state;
        this.props.onVerify(code);
    };
    resendCode = () => {
        this.props.resendCode(this.props.phoneNumber);
    };

    render() {
        return (
            <Modal
                className="account-verify"
                visible={true}
                onCancel={this.props.updateVerifyCancel}
                closable={false}
                footer={null}
            >
                <div className="verification-text">
                    Please enter the verification code sent
                    <br />
                    to <span>{this.props.phoneNumber}</span>.
                </div>
                <div className="form-group">
                    <FormInput
                        label="Verification code"
                        type="text"
                        name="verification_code"
                        onChange={(e) =>
                            this.setState({
                                code: e.target.value,
                            })
                        }
                        className={"form-control field-input "}
                    />
                </div>
                <div className="form-href-link">
                    <Loading loading={this.props.loaders} />
                    {!this.props.loaders && (
                        <a onClick={this.resendCode}>Resend code</a>
                    )}
                </div>

                <div className="form-group">
                    <button className="submit-btn" onClick={this.onVerifyCode}>
                        Continue
                    </button>
                </div>
                <div className="form-group text-center">
                    <button
                        type="button"
                        className="btn btn-link center-block"
                        onClick={this.props.updateVerifyCancel}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        );
    }
}

export default AccountVerification;
