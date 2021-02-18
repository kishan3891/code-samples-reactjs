import React from "react";
import "./style.scss";
import { Modal, Tabs } from "antd";
import * as moment from "moment";
import { CONSTANT } from "Constants";
import DataTable from "Components/DataTable";
import { newValidator } from "../../../helpers";
import ModifyShift from "../../ModifyShift";
import PropTypes from "prop-types";
import ViewCounselor from "../ViewCounselor/ViewCounselor";
import ConfirmModal from "../ConfirmModal";

const TabPane = Tabs.TabPane;

class ViewShiftDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "details",
            endTimeError: "",
            confirmDelete: false,
        };
        this.validator = newValidator();
    }

    confirmShiftDelete = (value) => {
        this.setState({ confirmDelete: value });
    };
    onDeleteShift = () => {
        this.props.onDeleteShift(this.props.shift.shift_states_id);
    };
    changeTab = (activeKey) => {
        this.setState({
            activeTab: activeKey,
        });
    };

    onSaveCounselorProfileDetails = (counselor) => {
        this.props.onUpdateCounselor(counselor);
    };
    onCloseCounselorDetails = () => {
        this.setState({
            counselor: null,
        });
    };
    renderHeader = () => {
        const {
            /**
             * @type {AvailableShift}
             */
            shift,
        } = this.props;

        const startTime = moment(shift.start_date).format(CONSTANT.TIME_FORMAT);
        const endTime = moment(shift.end_date).format(CONSTANT.TIME_FORMAT);
        const date = moment(shift.start_date).format(
            CONSTANT.SHORT_DATE_FORMAT
        );
        return (
            <h3>
                {date}
                <em className="schedule-time">
                    {startTime} - {endTime}
                </em>
            </h3>
        );
    };
    onViewCounselorDetails = (counselor) => {
        this.props.onViewCounselorDetails(counselor);
        this.setState({
            counselor,
        });
    };
    getConfirmDeleteMessage = () => {
        const { shift } = this.props;
        if (shift.sessions) {
            return `There are currently  ${shift.sessions} sessions scheduled on this shift. Are you sure you want to delete it?`;
        }
        return "Are you sure you want to delete this shift?";
    };
    onSaveShift = (shift) => {
        if (this.props.shift.capacity !== shift.capacity) {
            this.props.onUpdateShiftCapacity(shift.id, shift.capacity);
        }
    };
    render() {
        const emptyCounselors = (
            <div className="d-flex justify-content-center empty-counslr">
                No counselors yet.
            </div>
        );

        const { confirmDelete, counselor } = this.state;

        const columns = [
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                sorter: (a, b) => a.email.length - b.email.length,
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "Phone",
                dataIndex: "phoneNumber",
                key: "phoneNumber",
                sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "",
                key: "action",
                render: (text, record) => (
                    <span className="view-detail">
                        <a onClick={() => this.onViewCounselorDetails(record)}>
                            View Details
                        </a>
                    </span>
                ),
            },
        ];
        const { loading, shift, shiftConfig } = this.props;
        const total = shift.counselor_enrollment.length;

        return (
            <React.Fragment>
                <Modal
                    visible={true}
                    onCancel={this.props.onCancel}
                    footer={null}
                    wrapClassName={"counslr-view"}
                >
                    <div className="view-counslor">
                        <div className="chating-section">
                            <div className="chat-header">
                                <div className="chat-top-header clearfix">
                                    {this.renderHeader()}
                                </div>
                                <div className="right-btn">
                                    <button
                                        className="white-btn"
                                        onClick={() =>
                                            this.confirmShiftDelete(true)
                                        }
                                    >
                                        Delete shift
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Tabs
                            activeKey={this.state.activeTab}
                            onChange={this.changeTab}
                        >
                            <TabPane tab="Details" key="details">
                                <div className="container">
                                    <div className="container">
                                        <ModifyShift
                                            buttonText={"Save changes"}
                                            modifyShift={true}
                                            onSave={this.onSaveShift}
                                            {...shiftConfig}
                                            shift={shift}
                                        />
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane
                                tab={`Counslrs (${total}/${shift.capacity})`}
                                key="counselors"
                                className="view-shift-inner"
                            >
                                <div className="container">
                                    {total > 0 && (
                                        <DataTable
                                            rowKey="id"
                                            loading={loading}
                                            dataSource={shift.counselors}
                                            columns={columns}
                                        />
                                    )}
                                    {!total && emptyCounselors}
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </Modal>
                {counselor && (
                    <ViewCounselor
                        counselor={counselor}
                        onSaveProfileDetails={
                            this.onSaveCounselorProfileDetails
                        }
                        handleViewCancel={this.onCloseCounselorDetails}
                    />
                )}
                {confirmDelete && (
                    <ConfirmModal
                        text={this.getConfirmDeleteMessage()}
                        buttonText={"Delete shift"}
                        onClick={this.onDeleteShift}
                        onCancel={() => this.confirmShiftDelete(false)}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default ViewShiftDetail;

ViewShiftDetail.propTypes = {
    loading: PropTypes.bool,
    onUpdateCounselor: PropTypes.func,
    onDeleteShift: PropTypes.func,
    onUpdateShiftCapacity: PropTypes.func,
};
