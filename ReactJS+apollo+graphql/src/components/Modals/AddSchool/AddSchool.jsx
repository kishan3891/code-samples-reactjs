import React from "react";
import "./style.scss";
import { Modal, Select } from "antd";
import FormInput from "../../FormInput";
import { isValidInput } from "../../../utils/isValidInput";
import PlanSelector from "../../../components/PlanSelector";
import Avatar from "../../../components/Avatar";
import Scrollbar from "react-scrollbars-custom";
import FormTextAreaInput from "Components/FormTextAreaInput";
import { CONSTANT } from "Constants";
import { newValidator } from "../../../helpers";

const { Option } = Select;

class AddSchool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            school: {
                logo: "",
                name: "",
                state_id: "9",
                resources: "",
                sosInfo: "",
                plan_id: "",
            },
            submitted: false,
        };
        this.validator = newValidator();
    }

    handleStateChange = (field, value) => {
        const { school } = this.state;
        school[field] = value;
        this.setState({ school });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.validator.allValid()) {
            const { school } = this.state;
            this.props.onAddSchool(school);
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    render() {
        const {
            submitted,
            school: {
                name,
                state_id,
                resources,
                plan_id,
                sosInfo,
                more_resources_link,
            },
        } = this.state;

        return (
            <React.Fragment>
                <Modal
                    width={"30%"}
                    visible={true}
                    onCancel={this.props.onCancel}
                    wrapClassName={"account-modal add-admin-pop"}
                    footer={null}
                >
                    <div className="modal-right-head">
                        <h3>Add School</h3>
                    </div>
                    <form className="add-school" onSubmit={this.handleSubmit}>
                        <Scrollbar noScrollX={true} style={{ height: 500 }}>
                            <div className="form-group">
                                <label>Logo/Image</label>
                                <Avatar
                                    default={CONSTANT.DEFAULT_SCHOOL_IMG}
                                    onSelecfile={(fileData) =>
                                        this.handleStateChange("file", fileData)
                                    }
                                    className="left-upload-img shool-upload"
                                    btnText={"Upload an image"}
                                    breakText={true}
                                />
                            </div>
                            <div className="form-group">
                                <FormInput
                                    label="Name"
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="School name"
                                    onChange={(e) =>
                                        this.handleStateChange(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    className={
                                        "form-control field-input " +
                                        isValidInput(
                                            "name",
                                            this.validator,
                                            submitted
                                        )
                                    }
                                />
                                {this.validator.message(
                                    "name",
                                    name,
                                    "required"
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="state_id">State</label>
                                <Select
                                    onChange={(e) =>
                                        this.handleStateChange("state_id", e)
                                    }
                                    defaultValue={state_id}
                                    placeholder="Choose one"
                                    size={"large"}
                                    disabled
                                >
                                    <Option value="9">New York</Option>
                                </Select>
                            </div>
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
                            <div className="form-group">
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
                            </div>
                            <div className="form-group">
                                <label htmlFor="plan">Plan</label>
                                <PlanSelector
                                    selectedPlan={plan_id}
                                    planItems={this.props.planItems}
                                    extraClass={"add-plan-selector"}
                                    text={CONSTANT.PLANS_TITLE}
                                    subText={CONSTANT.PLANS_SUBTITLE}
                                    onChangePlan={(planId) =>
                                        this.handleStateChange(
                                            "plan_id",
                                            planId
                                        )
                                    }
                                />
                            </div>
                        </Scrollbar>
                        <div className="send-invitation">
                            <button
                                disabled={
                                    !this.validator.allValid() ||
                                    this.props.loading
                                }
                                className="submit-btn"
                            >
                                Create school
                            </button>
                        </div>
                    </form>
                </Modal>
            </React.Fragment>
        );
    }
}

export default AddSchool;
