import React from "react";
import "./style.scss";
import { Modal, Tabs } from "antd";
import AccountDisabled from "../AccountDisabled/";
import PlanSelector from "Components/PlanSelector";
import DisableButton from "Components/Buttons/Disable";
import EnableButton from "Components/Buttons/Enable";
import Loading from "Components/Loading";
import { CONSTANT } from "Constants";
import SchoolDetailsTab from "../../School/SchoolDetailsTab";
import { newValidator } from "../../../helpers";
import EmergencyServicesTable from "../../School/EmergencyServicesTable";

const TabPane = Tabs.TabPane;

export default class ViewSchool extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (props.school && !state.school.id) {
            return {
                ...state,
                school: props.school,
                isDisabled: !props.school.enabled,
            };
        }
        return state;
    }
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "details",
            isDisableButton: false,
            max_charecter: 500,
            isNotification: false,
            isDisabled: false,
            plan: 1,
            school: {
                id: "",
                file: "",
                name: "",
                state: "",
                plan: "",
                resources: "",
                isDisabled: "",
                sosInfo: "",
            },
        };
        this.validator = newValidator();
    }

    handleStateChange = (field, value) => {
        const { school } = this.state;

        this.setState({
            school: {
                ...school,
                [field]: value,
            },
        });
    };
    handleAccountStatus = (enabled) => {
        this.handleStateChange("enabled", enabled);
    };

    confirmDisableChange = (value) => {
        this.setState({ confirmDisable: value });
    };
    changeEnableStatus = (enabled) => {
        const { school } = this.props;
        this.props.changeEnableStatus(school.id, enabled);
        this.confirmDisableChange(false);
        this.setState({ isDisabled: !enabled });
    };
    onSchoolProfileChanged = (school) => {
        this.setState({
            school: {
                ...this.state.school,
                ...school,
            },
        });
    };
    onSaveEmergencyServices = (services) => {
        this.setState(
            {
                school: {
                    ...this.state.school,
                    emergency_services: services,
                },
            },
            this.onSave
        );
    };
    onSave = () => {
        const { school } = this.state;
        this.props.onSaveSchoolInformation(school);
    };

    render() {
        const { loading, planItems } = this.props;
        const { isDisabled, school, confirmDisable } = this.state;
        const { name = "", state = {}, plan = {} } = school;

        return (
            <React.Fragment>
                <Modal
                    visible={true}
                    footer={null}
                    onCancel={this.props.handleViewCancel}
                    wrapClassName={"counslr-view"}
                >
                    <div className="view-counslor">
                        <div className="chating-section">
                            <div className="chat-header">
                                <div className="chat-top-header clearfix">
                                    <h3>
                                        {`${name}`} <em>{state.value}</em>
                                    </h3>
                                </div>
                                <div className="right-btn">
                                    {isDisabled ? (
                                        <EnableButton
                                            onClick={() =>
                                                this.changeEnableStatus(true)
                                            }
                                        />
                                    ) : (
                                        <DisableButton
                                            onClick={() =>
                                                this.confirmDisableChange(true)
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <Tabs
                            className={isDisabled ? "disabled-account" : ""}
                            activeKey={this.state.activeTab}
                            onChange={(activeKey) =>
                                this.setState({
                                    activeTab: activeKey,
                                })
                            }
                        >
                            <TabPane tab="Details" key="details">
                                <SchoolDetailsTab
                                    loading={loading}
                                    onSchoolProfileChanged={
                                        this.onSchoolProfileChanged
                                    }
                                    onSaveProfileDetails={this.onSave}
                                    school={school}
                                />
                            </TabPane>
                            <TabPane tab="Emergency Services">
                                <div className="container">
                                    <EmergencyServicesTable
                                        onSave={this.onSaveEmergencyServices}
                                        items={school?.emergency_services || []}
                                    />
                                </div>
                            </TabPane>
                            <TabPane tab="Plan" key="plan">
                                <div className="container">
                                    <div className="payment-main-outer plan-tab">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12">
                                                <PlanSelector
                                                    selectedPlan={plan.id}
                                                    extraClass={
                                                        "view-plan-selector"
                                                    }
                                                    planItems={planItems}
                                                    text={CONSTANT.PLANS_TITLE}
                                                    subText={
                                                        CONSTANT.PLANS_SUBTITLE
                                                    }
                                                    onChangePlan={(planId) =>
                                                        this.handleStateChange(
                                                            "plan_id",
                                                            planId
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="send-invitation">
                                            <button
                                                disabled={loading}
                                                type="button"
                                                onClick={this.onSave}
                                                className="submit-btn"
                                            >
                                                {loading ? (
                                                    <Loading
                                                        loading={loading}
                                                    />
                                                ) : (
                                                    `Save changes`
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </Modal>
                {confirmDisable && (
                    <AccountDisabled
                        text={CONSTANT.SCHOOL_DISABLED_TEXT}
                        onClick={() => this.changeEnableStatus(false)}
                        onCancel={() => this.confirmDisableChange(false)}
                    />
                )}
            </React.Fragment>
        );
    }
}
