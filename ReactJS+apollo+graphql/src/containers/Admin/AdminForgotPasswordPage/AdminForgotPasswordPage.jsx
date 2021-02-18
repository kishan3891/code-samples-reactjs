import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../../actions";
import AccountSetup from "Components/AccountSetup";
import "./style.scss";
import { Link } from "react-router-dom";
import FormInput from "Components/FormInput";
import SimpleReactValidator from "simple-react-validator";

class AdminForgotPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(userActions.logout());
        this.state = {
            user: {
                email: "",
            },
            submitted: false,
            isResetLink: false,
            errors: {},
            serverError: null,
        };
        this.validator = new SimpleReactValidator();
    }

    handleChange = (e) => {
        const { user } = this.state;
        user[e.target.name] = e.target.value;
        this.setState({ user, serverError: null });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.validator.allValid()) {
            if (this.state.user.email == "email@example.com") {
                this.setState({ serverError: "Account not found" });
            } else {
                this.setState({ isResetLink: true, serverError: "" });
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    render() {
        const {
            user: { email },
            submitted,
            errors,
            isResetLink,
            serverError,
        } = this.state;
        return (
            <React.Fragment>
                <AccountSetup
                    welcomeText={
                        'Counslr <span className="sub-text-main">Admin</span>'
                    }
                    accountText={"Reset password"}
                    isFooter={false}
                />
                <div className="app-right">
                    {!isResetLink && (
                        <div className="login-form btm-space">
                            <div className="col-12 col-md-offset-3">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group diff-space">
                                        <FormInput
                                            label="Email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            error={serverError}
                                            placeholder="email@example.com"
                                            onChange={this.handleChange}
                                            className={
                                                "form-control field-input " +
                                                (serverError != null
                                                    ? "err-input"
                                                    : "")
                                            }
                                        />
                                        {this.validator.message(
                                            "email",
                                            email,
                                            "required|email"
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <button
                                            disabled={
                                                !this.validator.allValid()
                                            }
                                            className="submit-btn"
                                        >
                                            Reset password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {isResetLink && (
                        <div className="login-form">
                            <div className="col-12 col-md-offset-3">
                                <div className="reset-password">
                                    <h3>Check your email</h3>
                                    <p>
                                        A reset password link has been sent{" "}
                                        <br />
                                        to <a href="#">email@example.com.</a>
                                    </p>
                                    <Link to={`/admin/login`}>Log in</Link>
                                </div>
                            </div>
                        </div>
                    )}
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

const connectedAdminForgotPassword = connect(mapStateToProps)(
    AdminForgotPasswordPage
);
export { connectedAdminForgotPassword as AdminForgotPasswordPage };
