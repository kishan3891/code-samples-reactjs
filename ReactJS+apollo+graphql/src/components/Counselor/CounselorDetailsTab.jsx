import NotificationAlert from "../NotificationAlert";
import FormInput from "../FormInput";
import { showMessage } from "../../utils/showMessage";
import { isValidInput } from "../../utils/isValidInput";
import { DatePicker, Select } from "antd";
import { CONSTANT } from "../../constants";
import * as moment from "moment";
import React from "react";
import { stateList } from "../../utils/stateList";
import { newValidator } from "../../helpers";

function disabledDate(current) {
    return current && current < moment().endOf("day");
}

export default class CounselorDetailsTab extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (
            props.counselor &&
            (!state.counselor.id ||
                state.counselor.enabled !== props.counselor.enabled)
        ) {
            state = {
                ...state,
                counselor: {
                    ...state.counselor,
                    ...props.counselor,
                },
            };
        }
        state.loading = props.loading;
        return state;
    }

    state = {
        loading: true,
        counselor: {
            id: "",
            name: "",
            email: "",
            firstName: "",
            lastName: "",
            enabled: true,
            licenseNumber: "",
            licenseState: "",
            licenseExpirationDate: "",
            insuranceNumber: "",
            insuranceExpirationDate: "",
        },
        isDisablebtn: true,
    };
    validator = newValidator();
    handleStateChange = (field, value) => {
        const { counselor } = this.state;
        counselor[field] = value;
        this.setState({ counselor, isDisablebtn: false });
    };
    handleChange = (e) => {
        const { counselor } = this.state;
        counselor[e.target.name] = e.target.value;
        this.setState({ counselor, isDisablebtn: false });
    };
    handleDateChange = (date, dateString, field) => {
        const { counselor } = this.state;
        counselor[field] = dateString;
        this.setState({ counselor, isDisablebtn: false });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.validator.allValid()) {
            const { counselor } = this.state;
            this.props.onSaveProfileDetails(counselor);
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };
    buildDefaultDateValue = (value) => {
        return value ? moment(value, CONSTANT.INPUT_DATE_FORMAT) : null;
    };

    render() {
        const {
            submitted,
            counselor: {
                id,
                email,
                firstName,
                lastName,
                enabled,
                licenseNumber,
                insuranceNumber,
                licenseState,
                licenseExpirationDate,
                insuranceExpirationDate,
            },
            isDisablebtn,
        } = this.state;

        if (!id) {
            return null;
        }

        let options = stateList.map((data) => (
            <Select.Option key={data.name} value={data.abbreviation}>
                {data.name}
            </Select.Option>
        ));
        return (
            <>
                <NotificationAlert
                    title={"This account is disabled"}
                    isNotification={!enabled}
                />
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
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
                                placeholder=""
                                onChange={this.handleChange}
                                error={showMessage(
                                    this.validator,
                                    "licenseNumber"
                                )}
                                className={
                                    "form-control field-input " +
                                    isValidInput(
                                        "licenseNumber",
                                        this.validator,
                                        submitted
                                    )
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
                                        value={licenseState}
                                        placeholder="State"
                                        onChange={(e) =>
                                            this.handleStateChange(
                                                "licenseState",
                                                e
                                            )
                                        }
                                        disabled
                                    >
                                        {options}
                                    </Select>
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
                                        defaultValue={this.buildDefaultDateValue(
                                            licenseExpirationDate
                                        )}
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
                                label="Insurance #"
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
                                        defaultValue={this.buildDefaultDateValue(
                                            insuranceExpirationDate
                                        )}
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

                        <div className="send-invitation">
                            <button
                                disabled={
                                    isDisablebtn
                                        ? true
                                        : !this.validator.allValid() ||
                                          this.props.loading
                                }
                                className="submit-btn"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}
