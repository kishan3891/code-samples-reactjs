import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../../actions";
import AccountSetup from "Components/AccountSetup";
import "./style.scss";
import FormInput from "Components/FormInput";
import SimpleReactValidator from "simple-react-validator";
import { isValidInput } from "Utils/isValidInput";
import NotificationAlert from "Components/NotificationAlert";

class AdminVerificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(userActions.logout());
        this.state = {
            username: "",
            verification_code: "",
            submitted: false,
            isNotification: false,
        };
        this.validator = new SimpleReactValidator();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.validator.allValid()) {
            this.props.history.push("/admin/login");
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    resendCode = (val) => {
        this.setState({ isNotification: val });
    };

    render() {
        const { loggingIn } = this.props;
        const { submitted, verification_code } = this.state;
        return (
            <React.Fragment>
                <AccountSetup
                    welcomeText={
                        'Counslr <span className="sub-text-main">Admin</span>'
                    }
                    stepText={"Welcome Back"}
                    accountText={"Log in"}
                    isFooter={false}
                />
                <div className="app-right">
                    <NotificationAlert
                        handleClose={(val) => this.resendCode(val)}
                        title={"Resent verification code"}
                        isNotification={this.state.isNotification}
                        isClose={true}
                    />
                    <div className="login-form">
                        <div className="col-12 col-md-offset-3">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="verification-text">
                                    Please enter the verification code sent{" "}
                                    <br />
                                    to <span>(123) 456-7890</span>.
                                </div>
                                <div className="form-group">
                                    <FormInput
                                        label="Verification code"
                                        type="text"
                                        name="verification_code"
                                        value={verification_code}
                                        onChange={this.handleChange}
                                        className={
                                            "form-control field-input " +
                                            isValidInput(
                                                "verification_code",
                                                this.validator,
                                                submitted
                                            )
                                        }
                                    />
                                    {this.validator.message(
                                        "verification_code",
                                        verification_code,
                                        "required"
                                    )}
                                </div>
                                <div className="form-href-link">
                                    <a
                                        href="#"
                                        onClick={() => this.resendCode(true)}
                                    >
                                        Resend code
                                    </a>
                                </div>
                                <div className="form-group">
                                    <button
                                        disabled={!this.validator.allValid()}
                                        className="submit-btn"
                                    >
                                        Continue
                                    </button>
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
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
    };
}

const connectedAdminVerificationPage = connect(mapStateToProps)(
    AdminVerificationPage
);
export { connectedAdminVerificationPage as AdminVerificationPage };
