import React from "react";
import Content from "Components/Layout/Content";
import SessionModal from "Components/SessionModal";
import MySchedule from "Components/MySchedule";
import "./style.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatMoney } from "../../helpers";
import * as moment from "moment";
import ProfileImage from "../../components/Counselor/ProfileImage";
import PaymentNotification from "../../components/PaymentInfoNotification/PaymentNotification";
import { scheduleActions } from "../../actions";
import { bindActionCreators } from "redux";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingDetails: false,
            shifts: [],
        };
    }

    componentDidMount() {
        const startDate = moment().startOf("day");
        this.props.loadMyScheduleForHome(startDate, null);
        var homeClassName = document.getElementsByClassName(
            "content-wrapper"
        )[0];
        if (homeClassName) {
            homeClassName.id = "home-content";
            document.getElementById("home-content").style.overflow = "hidden";
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.shift && !this.props.shift && prevState.showingDetails) {
            this.setState({
                showingDetails: false,
            });
        }
    }

    loadData = () => {
        const { counselor } = this.props;
        this.setState({
            counselor,
        });
    };

    /**
     *
     * @param {CounselorEnrollment} enrollment
     */
    onEnrollmentClicked = (enrollment) => {
        this.props.loadCounselorShiftDetails(enrollment.shift_id);
        this.setState({
            showingDetails: true,
        });
    };
    handleCancel = (e) => {
        this.setState({
            showingDetails: false,
        });
    };

    render() {
        const { showingDetails } = this.state;
        const {
            user,
            homeSchedule,
            loaders,
            earnings,
            counselorLoaders,
        } = this.props;

        const nextPayout = earnings?.nextPayout || {};

        return (
            <Content>
                {!user.stripe && <PaymentNotification />}
                <div className="right-top-header">
                    <div className="container clearfix">
                        <div className="header-user-profile">
                            <ProfileImage />
                            <div className="head-user-right">
                                <span>Counslr</span>
                                <h5>{user.name}</h5>
                                <Link to="/account">Account Details</Link>
                            </div>
                        </div>
                        <div className="header-period-sec">
                            <LoadingSpinner
                                spinning={counselorLoaders.earnings}
                                wrapperClassName="counslr-spinner"
                            >
                                <ul>
                                    <li>
                                        <span>This Period: </span>
                                        <span>{nextPayout.period}</span>
                                    </li>
                                    <li>
                                        <font>
                                            {nextPayout.hoursWorked || "0"}
                                            hrs
                                        </font>
                                        <font>
                                            {nextPayout.amount
                                                ? `$${formatMoney(
                                                      nextPayout.amount
                                                  )}`
                                                : "0$"}
                                        </font>
                                    </li>
                                    <li>
                                        <em>Worked</em>
                                        <em>
                                            {nextPayout.sessions || "0"}{" "}
                                            Sessions
                                        </em>
                                    </li>
                                </ul>
                            </LoadingSpinner>
                        </div>
                    </div>
                </div>
                <div className="dash-middle-content home-middle-content">
                    <div className="container">
                        <MySchedule
                            items={homeSchedule}
                            loading={loaders.mySchedule}
                            onEnrollmentClicked={this.onEnrollmentClicked}
                        />

                        <div className="middle-btm-cont">
                            <ul className="clearfix">
                                <li>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://counslr.zendesk.com/hc/en-us"
                                    >
                                        <h5>Knowledge Base</h5>
                                        <p>
                                            Resources, training, help, and FAQs
                                        </p>
                                    </a>
                                </li>
                                <li>
                                    <Link to="/account">
                                        <h5>Settings</h5>
                                        <p>
                                            {" "}
                                            Edit your profile and payment
                                            details
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {showingDetails && (
                    <SessionModal visible={true} onCancel={this.handleCancel} />
                )}
            </Content>
        );
    }
}

/**
 *
 * @param {RootState} state
 * @return {{loaders: *, counselor: *, homeSchedule: *, user}}
 */
function mapStateToProps(state) {
    const { counselor, earnings, loaders: counselorLoaders } = state.counselor;
    const { user } = state.authentication;
    const { loaders, homeSchedule, shift } = state.schedule;
    return {
        shift,
        loaders,
        counselorLoaders,
        counselor,
        user,
        earnings,
        homeSchedule,
    };
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            ...scheduleActions,
        },
        dispatch
    );

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export { connectedHome as HomePage };
