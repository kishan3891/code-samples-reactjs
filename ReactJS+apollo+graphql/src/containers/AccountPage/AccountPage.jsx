import React from "react";
import "./style.scss";
import Content from "Components/Layout/Content";
import { Spin, Tabs } from "antd";
import AccountBio from "Components/Modals/AccountBio";
import AccountPhone from "Components/Modals/AccountPhone";
import AccountVerification from "Components/Modals/AccountVerification";
import Avatar from "Components/Avatar";
import EarningsList from "Components/EarningsList";
import { connect } from "react-redux";
import { counselorActions, userActions } from "../../actions";
import ProfileImage from "../../components/Counselor/ProfileImage";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { getCurrentPayPeriod, formatPhone } from "../../helpers";
import { getActiveCounselorSelector } from "../../reducers/counselor.reducer";

const TabPane = Tabs.TabPane;
const EARNINGS_PER_PAGE = 10;
class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileLoading: true,
            account: {
                profileDocumentId: "",
                file: "",
                id: "",
                name: "",
                email: "",
                phoneNumber: "",
                newPhoneNumber: "",
                firstName: "",
                lastName: "",
                licenseNumber: "",
                licenseState: "",
                licenseExpirationDate: "",
                insuranceNumber: "",
                insuranceExpirationDate: "",
                bio: "",
            },
            activeTab: "profile",
            isUpdateBio: false,
            isUpdatePhone: false,
            isUpdateVerify: false,
        };
    }

    handleStateChange = (field, value) => {
        const { account } = this.state;

        if (field === "file") {
            this.props.uploadAvatar(value);
        } else {
            // only bio can be updated

            this.updateProfile({
                ...account,
                bio: value,
            });

            this.handleCancel("isUpdateBio", false);
        }
    };

    componentDidMount() {
        const { counselor } = this.props;
        if (counselor && counselor.id) {
            this.setState({
                account: counselor,
            });
        }
    }

    componentDidUpdate() {
        const { counselor } = this.props;
        if (!this.state.account.id && counselor && counselor.id) {
            this.setState({
                account: counselor,
            });
        }
    }

    updateProfile = (account) => {
        this.props.updateCounselor(
            account.id,
            account.profileDocumentId,
            account
        );
        this.setState({
            account,
        });
    };

    showUpdateBio = (e) => {
        e.preventDefault();
        this.setState({
            isUpdateBio: true,
        });
    };
    showUpdatePhone = (e) => {
        e.preventDefault();
        this.setState({
            isUpdatePhone: true,
        });
    };
    showUpdateVerify = (phoneNumber) => {
        this.setState({
            newPhoneNumber: phoneNumber,
        });
        return this.props.initiateTFA(phoneNumber).then((sent) => {
            if (sent) {
                this.setState({
                    isUpdatePhone: false,
                    isUpdateVerify: true,
                });
            }
            return sent;
        });
    };
    resendCode = (phoneNumber) => {
        this.props.initiateTFA(phoneNumber);
    };
    handleCancel = (name, value) => {
        this.setState({ [name]: value });
    };

    onAccountVerification = (code) => {
        this.props.verifyTFA(code).then((verified) => {
            if (verified) {
                const { account } = this.state;
                const phone =
                    "+1" + this.state.newPhoneNumber.replace(/[^\d]/g, "");
                this.updateProfile({
                    ...account,
                    phoneNumber: phone,
                });
                this.setState({
                    isUpdateVerify: false,
                });
            }
        });
    };
    updateVerifyCancel = (e) => {
        this.setState({
            isUpdateVerify: false,
        });
    };
    changeTab = (activeKey) => {
        this.setState({
            activeTab: activeKey,
        });
        const { earnings, user } = this.props;
        if (activeKey === "earnings" && !earnings) {
            const payPeriod = getCurrentPayPeriod();
            this.props.loadEarnings(
                user.id,
                payPeriod.startDate,
                payPeriod.endDate,
                EARNINGS_PER_PAGE
            );
        }
    };

    logOut = (e) => {
        // e.preventDefault();
        this.props.logout();
    };

    render() {
        const {
            isUpdateBio,
            isUpdatePhone,
            isUpdateVerify,
            account: {
                name,
                phoneNumber,
                licenseNumber,
                licenseState,
                licenseExpirationDate,
                insuranceNumber,
                insuranceExpirationDate,
                bio,
            },
        } = this.state;
        const { earnings, loaders } = this.props;
        return (
            <Content>
                <div className="right-top-header space-rem clearfix">
                    <div className="container">
                        <div className="header-user-profile">
                            <ProfileImage />
                            <div className="head-user-right">
                                <span>Counslr</span>
                                <h5>{name}</h5>
                            </div>
                        </div>
                        <div className="payment-btn-section">
                            <button className="white-btn" onClick={this.logOut}>
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
                <div className="dash-middle-content account-page">
                    <Tabs
                        activeKey={this.state.activeTab}
                        onChange={this.changeTab}
                    >
                        <TabPane tab="Account" key="profile">
                            <Spin tip="Loading..." spinning={false}>
                                <div className="container">
                                    <div className="col-12 col-md-offset-5">
                                        <form>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <Avatar
                                                            onSelecfile={(
                                                                fileData
                                                            ) =>
                                                                this.handleStateChange(
                                                                    "file",
                                                                    fileData
                                                                )
                                                            }
                                                            imageUrl={
                                                                this.props
                                                                    .avatarUrl
                                                            }
                                                            className="left-upload-img"
                                                            breakText={true}
                                                            btnText={
                                                                "Upload New image"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="user-information">
                                                <div className="txt-fld">
                                                    <label>Bio</label>
                                                    <a
                                                        href="#"
                                                        onClick={
                                                            this.showUpdateBio
                                                        }
                                                    >
                                                        Edit{" "}
                                                    </a>
                                                    <textarea
                                                        name="bio"
                                                        readOnly={true}
                                                        placeholder="Example: Licensed Mental Health Counselor from Long Island, NY with 20 years experience working with college students. Lover of beaches and coffee."
                                                        className="form-control field-input"
                                                        value={bio}
                                                    />
                                                </div>

                                                <div className="txt-fld">
                                                    <label>Phone Number</label>
                                                    <a
                                                        href="#"
                                                        onClick={
                                                            this.showUpdatePhone
                                                        }
                                                    >
                                                        Edit{" "}
                                                    </a>
                                                    <input
                                                        type="text"
                                                        name="phonenumber"
                                                        readOnly={true}
                                                        className="form-control field-input"
                                                        value={formatPhone(
                                                            phoneNumber
                                                        )}
                                                    />
                                                </div>

                                                <div className="txt-fld">
                                                    <ul>
                                                        <li>
                                                            <h3> License </h3>
                                                        </li>
                                                        <li>
                                                            Number
                                                            <span>
                                                                {licenseNumber}
                                                            </span>
                                                        </li>
                                                        <li>
                                                            State
                                                            <span>
                                                                {licenseState}
                                                            </span>
                                                        </li>
                                                        <li>
                                                            Expiration date
                                                            <span>
                                                                {
                                                                    licenseExpirationDate
                                                                }
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="txt-fld">
                                                    <ul>
                                                        <li>
                                                            <h3> Insurance </h3>
                                                        </li>
                                                        <li>
                                                            Number{" "}
                                                            <span>
                                                                {
                                                                    insuranceNumber
                                                                }
                                                            </span>
                                                        </li>
                                                        <li>
                                                            Expiration date
                                                            <span>
                                                                {
                                                                    insuranceExpirationDate
                                                                }
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Spin>
                        </TabPane>
                        <TabPane tab="Payment" key="earnings">
                            <EarningsList {...earnings} type={"account-view"} />
                        </TabPane>
                    </Tabs>
                </div>
                {isUpdateBio && (
                    <AccountBio
                        bio={bio}
                        onCancel={() => this.handleCancel("isUpdateBio", false)}
                        onSave={(value) => this.handleStateChange("bio", value)}
                    />
                )}
                {isUpdatePhone && (
                    <AccountPhone
                        onClick={this.showUpdateVerify}
                        phoneNumber={phoneNumber}
                        updatePhoneCancel={() =>
                            this.handleCancel("isUpdatePhone", false)
                        }
                    />
                )}
                {isUpdateVerify && (
                    <AccountVerification
                        onVerify={this.onAccountVerification}
                        resendCode={this.resendCode}
                        loaders={loaders.initiateTFA}
                        phoneNumber={this.state.newPhoneNumber}
                        updateVerifyCancel={() =>
                            this.handleCancel("isUpdateVerify", false)
                        }
                    />
                )}
            </Content>
        );
    }
}

function mapStateToProps(state) {
    const { counselor, earnings } = state.counselor;
    const { user, loaders } = state.authentication;
    const { avatarUrl } = getActiveCounselorSelector(state);
    return {
        user,
        loaders,
        earnings,
        counselor,
        avatarUrl,
    };
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            ...counselorActions,
            ...userActions,
        },
        dispatch
    );

AccountPage.defaultProps = {
    loadEarnings: () => ({}),
};
AccountPage.propTypes = {
    loadEarnings: PropTypes.func,
};

// const mapDispatchToProps = {
//     getProfile: userActions.getProfile,
//     updateCounselor: counselorActions.updateCounselor,
//     uploadAvatar: userActions.uploadAvatar,
//     initiateTFA: userActions.initiateTFA,
//     verifyTFA: userActions.verifyTFA,

//     logout: userActions.logout,
// };

const connectedAccount = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountPage);
export { connectedAccount as AccountPage };
