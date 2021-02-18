import NotificationAlert from "../NotificationAlert";
import FormInput from "../FormInput";
import { isValidInput } from "../../utils/isValidInput";
import { Select } from "antd";
import { CONSTANT } from "../../constants";
import React from "react";
import FormTextAreaInput from "Components/FormTextAreaInput";
import Loading from "Components/Loading";
import Avatar from "Components/Avatar";
import { newValidator } from "../../helpers";

const { Option } = Select;

const FormInputElement = ({
    onChange,
    name,
    placeholder,
    label,
    validator,
    submitted,
    value,
    phone,
}) => {
    return (
        <div className="form-group">
            <FormInput
                label={label}
                type="text"
                name={name}
                phone={phone}
                value={value}
                maxLength={100}
                placeholder={placeholder}
                onChange={(e) => onChange(name, e.target.value)}
                className={
                    "form-control field-input " +
                    isValidInput(name, validator, submitted)
                }
            />
            {validator.message(name, value, "required")}
        </div>
    );
};
export default class SchoolDetailsTab extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (props.school && !state.school.id) {
            state = {
                ...state,
                school: {
                    ...state.school,
                    ...props.school,
                },
            };
        }

        return state;
    }

    state = {
        school: {
            id: "",
            logo: "",
            name: "",
            state_id: "",
            plan: "",
            resources: "",
            isDisabled: "",
            sosInfo: "",
            emergency_services: [],
        },
        isDisablebtn: true,
    };
    servicesRef = React.createRef();

    validator = newValidator();

    handleStateChange = (field, value) => {
        const school = {
            ...this.state.school,
            [field]: value,
        };

        this.setState({
            school,
            isDisablebtn: false,
        });
        this.props.onSchoolProfileChanged(school);
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.validator.allValid()) {
            const { school } = this.state;
            this.props.onSaveProfileDetails(school);
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    render() {
        const {
            submitted,
            school: {
                logo,
                name,
                state,
                resources,
                more_resources_link,
                phone,
                address,
            },
            isDisablebtn,
        } = this.state;
        const { loading } = this.props;

        return (
            <>
                <NotificationAlert
                    title={"This account is disabled"}
                    isNotification={this.state.isNotification}
                />

                <div className="container">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <div className="user-image">
                                <span>Logo/Image</span>
                                <Avatar
                                    default={CONSTANT.DEFAULT_SCHOOL_IMG}
                                    onSelecfile={(fileData) =>
                                        this.handleStateChange("file", fileData)
                                    }
                                    className="left-upload-img shool-upload"
                                    btnText={"Upload an image"}
                                    breakText={true}
                                    removeText={true}
                                    imageUrl={logo}
                                />
                            </div>
                        </div>
                        <FormInputElement
                            label="Name"
                            name="name"
                            value={name}
                            placeholder={"School Name"}
                            validator={this.validator}
                            onChange={this.handleStateChange}
                            submitted={submitted}
                        />
                        <FormInputElement
                            label="Phone"
                            name="phone"
                            value={phone}
                            phone={true}
                            validator={this.validator}
                            onChange={this.handleStateChange}
                            submitted={submitted}
                        />

                        <div className="form-group">
                            <label htmlFor="state_id">State</label>
                            <Select
                                onChange={(e) =>
                                    this.handleStateChange("state_id", e)
                                }
                                defaultValue={state.id}
                                placeholder="Choose one"
                                size={"large"}
                                disabled
                            >
                                <Option value={9}>Florida</Option>
                                <Option value={32}>New York</Option>
                            </Select>
                        </div>
                        <FormInputElement
                            label="Address"
                            name="address"
                            value={address}
                            placeholder={"Address"}
                            validator={this.validator}
                            onChange={this.handleStateChange}
                            submitted={submitted}
                        />
                        <div className="form-group">
                            <FormTextAreaInput
                                onChange={(e) =>
                                    this.handleStateChange(
                                        "resources",
                                        e.target.value
                                    )
                                }
                                name="resources"
                                label={"Resources"}
                                value={resources}
                            />
                        </div>
                        <div className="form-group">
                            <FormInput
                                label="More Resources (Link)"
                                type="text"
                                name="more_resources_link"
                                value={more_resources_link}
                                placeholder="Resource Link"
                                onChange={(e) =>
                                    this.handleStateChange(
                                        "more_resources_link",
                                        e.target.value
                                    )
                                }
                                className={
                                    "form-control field-input " +
                                    isValidInput(
                                        "more_resources_link",
                                        this.validator,
                                        submitted
                                    )
                                }
                            />
                            {this.validator.message(
                                "more_resources_link",
                                name,
                                "link"
                            )}
                        </div>

                        {/* <div className="form-group">
                            <FormTextAreaInput
                                onChange={(e) =>
                                    this.handleStateChange(
                                        "sosInfo",
                                        e.target.value
                                    )
                                }
                                name="sosInfo"
                                label={"SOS Information"}
                                value={sosInfo}
                            />
                        </div> */}
                        <div className="send-invitation">
                            <button
                                disabled={
                                    isDisablebtn
                                        ? true
                                        : !this.validator.allValid() || loading
                                }
                                className="submit-btn"
                            >
                                {loading ? (
                                    <Loading loading={loading} />
                                ) : (
                                    `Save changes`
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}
