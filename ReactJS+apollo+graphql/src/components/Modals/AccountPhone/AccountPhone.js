import React from "react";
import "./style.scss";
import { Modal } from "antd";
import InputMask from "react-input-mask";
import ActionButton from "../../ActionButton";
import { formatPhone } from "../../../helpers";
class AccountPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatePhone: {
                schoolId: "",
                phoneNumber: formatPhone(this.props.phoneNumber),
            },
            submitted: false,
            formIsValid: false,
            errors: {},
        };
    }

    handleChange = (e) => {
        const { updatePhone } = this.state;
        updatePhone[e.target.name] = e.target.value;
        this.setState({ updatePhone });
        this.validateForm();
    };

    validateForm(submitted) {
        let fields = this.state.updatePhone;
        let errors = {};
        let formValid = true;
        var PhoneNumber = formatPhone(this.props.phoneNumber);

        if (typeof fields["phoneNumber"] !== "undefined") {
            const pattern = new RegExp(
                /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/gm
            );
            if (
                fields["phoneNumber"] !== "" &&
                !pattern.test(fields["phoneNumber"])
            ) {
                formValid = false;
                errors["phoneNumber"] = "Not a valid phone number.";
            } else if (PhoneNumber === fields["phoneNumber"]) {
                formValid = false;
                errors["phoneNumber"] = "Not a valid phone number.";
            }
        }
        this.setState({
            errors: errors,
            formIsValid: formValid,
            submitted: !!submitted,
        });
        return formValid;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm(true)) {
            this.setState({
                processing: true,
            });
            this.props.onClick(this.state.updatePhone.phoneNumber).then(() => {
                this.setState({ processing: false });
            });
        }
    };

    render() {
        const {
            errors,
            formIsValid,
            processing,
            updatePhone: { phoneNumber },
        } = this.state;
        return (
            <Modal
                visible={true}
                onCancel={this.props.updatePhoneCancel}
                wrapClassName={"account-modal"}
                closable={false}
                footer={null}
            >
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor={"phoneNumber"}>{"Phone Number"}</label>
                        <InputMask
                            placeholder="(123) 456-7890"
                            name="phoneNumber"
                            className={
                                errors.phoneNumber
                                    ? " form-control field-input err-input"
                                    : "form-control field-input"
                            }
                            value={phoneNumber}
                            mask="(999) 999-9999"
                            maskChar=" "
                            onChange={this.handleChange}
                        />
                        <span className="error-msg">{errors.phoneNumber}</span>
                    </div>
                    <div className="form-group">
                        <ActionButton
                            disabled={!formIsValid}
                            processing={processing}
                        >
                            Continue
                        </ActionButton>
                    </div>
                    <div className="form-group text-center">
                        <button
                            type="button"
                            className="btn btn-link center-block"
                            onClick={this.props.updatePhoneCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        );
    }
}

export default AccountPhone;
