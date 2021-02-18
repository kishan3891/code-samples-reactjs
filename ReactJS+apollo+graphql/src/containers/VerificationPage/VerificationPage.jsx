import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import AccountSetup from "Components/AccountSetup";
import "./style.scss";
import Backimage from "Images/left-arrow.svg";
import FormInput from "Components/FormInput";
import { isValidInput } from "Utils/isValidInput";
import NotificationAlert from "Components/NotificationAlert";
import { formatPhone, newValidator } from "../../helpers";
import ActionButton from "../../components/ActionButton";
import Loading from "../../components/Loading";

class VerificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            verificationCode: "",
            submitted: false,
            isNotification: false,
        };
        this.validator = newValidator();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const { verificationCode } = this.state;
        const { registerState } = this.props;
        this.setState({ submitted: true });
        this.props.verificationHandleSubmit();
        if (this.validator.allValid()) {
            this.props.verifyTFA(verificationCode).then((validated) => {
                if (validated) {
                    this.props.history.push(registerState ? "/profile" : "/");
                }
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };
    resendCode = () => {
        const { loaders } = this.props;
        this.props.initiateTFA(null);
        {
            !loaders.initiateTFA && this.setState({ isNotification: true });
        }
    };

    render() {
        const { user, loaders, verificationCodeError } = this.props;
        const { submitted, verificationCode } = this.state;
        return (
            <React.Fragment>
                <AccountSetup
                    welcomeText={"Welcome"}
                    stepText={"Step 2 of 3"}
                    accountText={"Verification"}
                    isFooter={true}
                />
                <div className="app-right">
                    <NotificationAlert
                        handleClose={(val) =>
                            this.setState({ isNotification: val })
                        }
                        title={"Resent verification code"}
                        isNotification={this.state.isNotification}
                        isClose={true}
                    />
                    <div className="login-form">
                        <div className="col-12 col-md-offset-3">
                            <form onSubmit={this.handleSubmit}>
                                <div className="veri-back-btn">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.props.history.goBack();
                                        }}
                                    >
                                        <img src={Backimage} alt="" />
                                        Back
                                    </a>
                                </div>
                                <div className="verification-text">
                                    Please enter the verification code sent{" "}
                                    <br />
                                    to{" "}
                                    <span>
                                        {formatPhone(user?.phoneNumber)}
                                    </span>
                                    .
                                </div>
                                <div className="form-group">
                                    <FormInput
                                        label="Verification code"
                                        type="text"
                                        name="verificationCode"
                                        value={verificationCode}
                                        onChange={this.handleChange}
                                        className={
                                            "form-control field-input " +
                                            isValidInput(
                                                "verificationCode",
                                                this.validator,
                                                submitted
                                            )
                                        }
                                    />
                                    {this.validator.message(
                                        "verificationCode",
                                        verificationCode,
                                        "required"
                                    )}
                                    {verificationCodeError && (
                                        <div className="srv-validation-message">
                                            Incorrect verification code, please
                                            try again.
                                        </div>
                                    )}
                                </div>
                                <div className="form-href-link">
                                    <Loading
                                        loading={loaders.initiateTFA}
                                        color="purple"
                                    />
                                    {!loaders.initiateTFA && (
                                        <a onClick={this.resendCode}>
                                            Resend code
                                        </a>
                                    )}
                                </div>
                                <div className="form-group">
                                    <ActionButton
                                        disabled={!this.validator.allValid()}
                                        processing={loaders.verifyTFA}
                                    >
                                        Continue
                                    </ActionButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { user, registerState } = state.registration;
    const { user: authUser, loaders } = state.authentication;
    // if there is no id for the authUser then we havn't fully logged in the user
    return {
        registerState,
        loaders,
        user: authUser && authUser.authToken ? authUser : user,
    };
}

const mapDispatchToProps = {
    verifyTFA: userActions.verifyTFA,
    initiateTFA: userActions.initiateTFA,
};

const connectedVerificationPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(VerificationPage);
export { connectedVerificationPage as VerificationPage };
