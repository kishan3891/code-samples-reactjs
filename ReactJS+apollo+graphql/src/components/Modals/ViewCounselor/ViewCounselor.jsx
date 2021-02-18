import React from "react";
import { Modal, Tabs } from "antd";
import AccountDisabled from "Components/Modals/AccountDisabled";
import "./style.scss";
import DisableButton from "Components/Buttons/Disable";
import EnableButton from "Components/Buttons/Enable";
import { connect } from "react-redux";
import { counselorActions } from "Actions";
import { CONSTANT } from "Constants";
import CounselorDetailsTab from "../../Counselor/CounselorDetailsTab";
import CounselorScheduleTab from "../../Counselor/CounselorScheduleTab";
import CounselorReviewsTab from "../../Counselor/CounselorReviewsTab";
import { bindActionCreators } from "redux";
import CounselorEarningsTab from "../../Counselor/CounselorEarningsTab";
import PropTypes from "prop-types";
import { getCurrentPayPeriod } from "../../../helpers";

const TabPane = Tabs.TabPane;
// TODO : change to 10
const REVIEWS_PER_PAGE = 10;
const EARNINGS_PER_PAGE = null;
const type = "admin-view";

export class ViewCounselorUnconnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "details",
            isDisable: false,
            confirmDisable: false,
            isNotification: false,
            isLoading: true,
        };
    }

    confirmDisableChange = (value) => {
        this.setState({ confirmDisable: value });
    };

    changeEnableStatus = (enabled) => {
        const { counselor } = this.props;
        this.props.changeEnableStatus(counselor.id, enabled);
        this.confirmDisableChange(false);
    };

    changeTab = (activeKey) => {
        this.setState({
            activeTab: activeKey,
        });
        const { counselor, schedule, earnings, reviews } = this.props;
        const payPeriod = getCurrentPayPeriod();
        if (activeKey === "schedule" && !schedule) {
            this.props.loadSchedule(
                counselor.id,
                payPeriod.startDate,
                payPeriod.endDate
            );
        }
        if (activeKey === "earnings" && !earnings) {
            this.props.loadEarnings(
                counselor.id,
                payPeriod.startDate,
                payPeriod.endDate,
                EARNINGS_PER_PAGE,
                type
            );
        }
        if (activeKey === "reviews" && !reviews) {
            this.props.loadReviews(counselor.id, REVIEWS_PER_PAGE, null);
        }
    };
    onLoadMoreEarnings = () => {
        const { counselor } = this.props;
        this.props.loadEarnings(counselor.id, null, null, EARNINGS_PER_PAGE);
    };
    onLoadMoreReviews = (startIndex, endIndex) => {
        const { counselor, reviews } = this.props;

        this.props.loadReviews(counselor.id, REVIEWS_PER_PAGE, reviews.last);
    };
    onSaveProfileDetails = (counselor) => {
        this.props.updateCounselor(
            counselor.id,
            counselor.profileDocumentId,
            counselor
        );
    };

    render() {
        const { loaders, reviews, schedule, counselor, earnings } = this.props;

        const { firstName = "", lastName = "", bio = "", enabled } =
            counselor || {};
        const { isDisable, confirmDisable } = this.state;

        return (
            <React.Fragment>
                <Modal
                    visible={true}
                    onCancel={this.props.handleViewCancel}
                    footer={null}
                    wrapClassName={"counslr-view counslor-list"}
                >
                    <div className="view-counslor">
                        <div className="chating-section">
                            <div className="chat-header">
                                <div className="chat-top-header clearfix">
                                    <h3>{`${firstName} ${lastName}`}</h3>
                                </div>
                                <div className="right-btn">
                                    {!enabled ? (
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
                            className={isDisable ? "disabled-account" : ""}
                            activeKey={this.state.activeTab}
                            onChange={this.changeTab}
                        >
                            <TabPane tab="Details" key="details">
                                <CounselorDetailsTab
                                    onSaveProfileDetails={
                                        this.onSaveProfileDetails
                                    }
                                    loading={loaders.details}
                                    counselor={counselor}
                                />
                            </TabPane>
                            <TabPane
                                tab="Schedule"
                                key="schedule"
                                className="couns-schedule"
                            >
                                <CounselorScheduleTab
                                    loading={loaders.schedule}
                                    schedule={schedule}
                                />
                            </TabPane>
                            <TabPane tab="Earnings" key="earnings">
                                <CounselorEarningsTab
                                    loading={loaders.earnings}
                                    earnings={earnings}
                                    onLoadMore={this.onLoadMoreEarnings}
                                />
                            </TabPane>
                            <TabPane tab="Reviews" key="reviews">
                                <CounselorReviewsTab
                                    loading={loaders.reviews}
                                    reviews={reviews}
                                    onLoadMore={this.onLoadMoreReviews}
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                </Modal>
                {confirmDisable && (
                    <AccountDisabled
                        text={CONSTANT.ACC_DISABLED_TEXT}
                        onClick={() => this.changeEnableStatus(false)}
                        onCancel={() => this.confirmDisableChange(false)}
                    />
                )}
            </React.Fragment>
        );
    }
}

/**
 *
 * @param {RootState} state
 * @param ownProps
 * @return {{loaders: *, schedule: *, earnings: *, counselor: *, reviews: *}}
 */
const mapStateToProps = (state, ownProps) => {
    const { counselor, reviews, schedule, earnings, loaders } = state.counselor;
    return {
        counselor: ownProps.counselor || counselor,
        reviews,
        schedule,
        earnings,
        loaders,
    };
};
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(counselorActions, dispatch);

ViewCounselorUnconnected.defaultProps = {
    loadSchedule: () => ({}),
    loadEarnings: () => ({}),
};
ViewCounselorUnconnected.propTypes = {
    loadSchedule: PropTypes.func,
    loadEarnings: PropTypes.func,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewCounselorUnconnected);
