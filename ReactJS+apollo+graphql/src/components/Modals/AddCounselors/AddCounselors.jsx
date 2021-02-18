import React from "react";
import "./style.scss";
import { DatePicker, Modal, Select } from "antd";
import FormInput from "../../FormInput";
import { isValidInput } from "Utils/isValidInput";
import { showMessage } from "Utils/showMessage";
import { stateList } from "Utils/stateList";
import * as moment from "moment";
import Scrollbar from "react-scrollbars-custom";
import { CONSTANT } from "Constants";
import { newValidator } from "../../../helpers";

const { Option } = Select;

function disabledDate(current) {
    return current && current < moment().endOf("day");
}

class AddCounselors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counselor: {
                email: "",
                firstName: "",
                lastName: "",
                insuranceNumber: "",
                insuranceExpirationDate: "",
                licenseNumber: "",
                licenseState: "",
                licenseExpirationDate: "",
            },
            submitted: false,
            licenseNumberSubmitted: false,
        };
        this.validator = newValidator();
    }

    handleStateChange = (field, value) => {
        const { counselor } = this.state;
        counselor[field] = value;
        this.setState({
            counselor: {
                ...counselor,
                [field]: value,
            },
        });
    };

    handleChange = (e) => {
        const { counselor } = this.state;
        counselor[e.target.name] = e.target.value;
        this.setState({
            counselor: {
                ...counselor,
                [e.target.name]: e.target.value,
            },
            [`${e.target.name}Submitted`]: true,
        });
    };

    handleDateChange = (date, dateString, field) => {
        const { counselor } = this.state;

        this.setState({
            counselor: {
                ...counselor,
                [field]: dateString,
            },
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.validator.allValid()) {
            const { counselor } = this.state;
            this.props.onAddCounselor(counselor);
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    render() {
        let options = stateList.map((data) => (
            <Option key={data.name} value={data.abbreviation}>
                {data.name}
            </Option>
        ));

        const {
            submitted,
            counselor: {
                email,
                firstName,
                lastName,
                licenseNumber,
                insuranceNumber,
                licenseState,
                licenseExpirationDate,
                insuranceExpirationDate,
            },
            licenseNumberSubmitted,
        } = this.state;
        return (
            <Modal
                width={"30%"}
                visible={true}
                onCancel={this.props.onCancel}
                wrapClassName={"account-modal add-admin-pop"}
                footer={null}
            >
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="modal-right-head">
                        <h3>Add Counselors</h3>
                    </div>
                    <Scrollbar noScrollX={true} style={{ height: 500 }}>
                        <div className="form-group">
                            <FormInput
                                label="Email"
                                type="email"
                                name="email"
                                value={email}
                                placeholder="email@example.com"
                                onChange={this.handleChange}
                                error={showMessage(this.validator, "email")}
                                className={
                                    "form-control field-input " +
                                    isValidInput(
                                        "email",
                                        this.validator,
                                        submitted
                                    )
                                }
                            />
                            {this.validator.message(
                                "email",
                                email,
                                "required|email"
                            )}
                        </div>
                        <div className="form-group">
                            <FormInput
                                label="First name"
                                type="text"
                                name="firstName"
                                value={firstName}
                                placeholder="First"
                                onChange={this.handleChange}
                                className={
                                    "form-control field-input " +
                                    isValidInput(
                                        "firstName",
                                        this.validator,
                                        submitted
                                    )
                                }
                            />
                            {this.validator.message(
                                "firstName",
                                firstName,
                                "required"
                            )}
                        </div>
                        <div className="form-group">
                            <FormInput
                                label="Last name"
                                type="text"
                                name="lastName"
                                value={lastName}
                                placeholder="Last"
                                onChange={this.handleChange}
                                className={
                                    "form-control field-input " +
                                    isValidInput(
                                        "lastName",
                                        this.validator,
                                        submitted
                                    )
                                }
                            />
                            {this.validator.message(
                                "lastName",
                                lastName,
                                "required"
                            )}
                        </div>
                        <div className="form-group select-add-cunslr">
                            <FormInput
                                label="License"
                                type="text"
                                name="licenseNumber"
                                value={licenseNumber}
                                placeholder="000000000000000"
                                onChange={this.handleChange}
                                className={
                                    "form-control field-input " +
                                    isValidInput(
                                        "licenseNumber",
                                        this.validator,
                                        submitted
                                    )
                                }
                                error={
                                    licenseNumberSubmitted &&
                                    showMessage(this.validator, "licenseNumber")
                                }
                            />
                            {this.validator.message(
                                "licenseNumber",
                                licenseNumber,
                                "required|alpha_num"
                            )}
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <Select
                                        placeholder="State"
                                        onChange={(e) =>
                                            this.handleStateChange(
                                                "licenseState",
                                                e
                                            )
                                        }
                                        className={isValidInput(
                                            "licenseState",
                                            this.validator,
                                            submitted
                                        )}
                                    >
                                        {options}
                                    </Select>
                                    {this.validator.message(
                                        "licenseState",
                                        licenseState,
                                        "required"
                                    )}
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <DatePicker
                                        onChange={(date, dateString) =>
                                            this.handleDateChange(
                                                date,
                                                dateString,
                                                "licenseExpirationDate"
                                            )
                                        }
                                        placeholder="Exp date MM/DD/YY"
                                        format={CONSTANT.INPUT_DATE_FORMAT}
                                        disabledDate={disabledDate}
                                        showToday={false}
                                        className={isValidInput(
                                            "licenseExpirationDate",
                                            this.validator,
                                            submitted
                                        )}
                                    />
                                    {this.validator.message(
                                        "licenseExpirationDate",
                                        licenseExpirationDate,
                                        "required"
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <FormInput
                                label="Insurance"
                                type="text"
                                name="insuranceNumber"
                                value={insuranceNumber}
                                placeholder=""
                                onChange={this.handleChange}
                                className={
                                    "form-control field-input " +
                                    isValidInput(
                                        "insuranceNumber",
                                        this.validator,
                                        submitted
                                    )
                                }
                            />
                            {this.validator.message(
                                "insuranceNumber",
                                insuranceNumber,
                                "required"
                            )}
                            <div className="row">
                                <div className="col-md-6 col-sm-12"></div>
                                <div className="col-md-6 col-sm-12">
                                    <DatePicker
                                        onChange={(date, dateString) =>
                                            this.handleDateChange(
                                                date,
                                                dateString,
                                                "insuranceExpirationDate"
                                            )
                                        }
                                        placeholder="Exp date MM/DD/YY"
                                        format={CONSTANT.INPUT_DATE_FORMAT}
                                        disabledDate={disabledDate}
                                        showToday={false}
                                        className={isValidInput(
                                            "insuranceExpirationDate",
                                            this.validator,
                                            submitted
                                        )}
                                    />
                                    {this.validator.message(
                                        "insuranceExpirationDate",
                                        insuranceExpirationDate,
                                        "required"
                                    )}
                                </div>
                            </div>
                        </div>
                    </Scrollbar>
                    <div className="send-invitation">
                        <button
                            disabled={
                                !this.validator.allValid() || this.props.loading
                            }
                            type="submit"
                            className="submit-btn"
                        >
                            Send invitation
                        </button>
                        {!this.props.loading &&
                            this.props.alert &&
                            this.props.alert.type === "error" && (
                                <div className="error-msg text-center">
                                    {this.props.alert.message}
                                </div>
                            )}
                    </div>
                </form>
            </Modal>
        );
    }
}

export default AddCounselors;
