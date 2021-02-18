import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import { userActions } from "../../../actions";
import AccountSetup from "Components/AccountSetup";
import { userConstants } from "Constants";
import FormInput from "Components/FormInput";
import { isValidInput } from "Utils/isValidInput";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";

class AdminLoginPage extends React.Component {
    constructor(props) {
        super(props);
        //this.props.dispatch(userActions.logout());
        this.state = {
            user: {
                username: "",
                password: "",
            },
            submitted: false,
            type: "password",
            errors: {},
            serverError: null,
        };
        this.validator = new SimpleReactValidator();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
    }

    forgotPassword = () => {
        this.props.history.push("/admin/forgot-password");
    };

    handleChange = (e) => {
        const { user } = this.state;
        user[e.target.name] = e.target.value;
        this.setState({ user, serverError: null });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        if (this.validator.allValid()) {
            if (this.state.user.username == "email@example.com") {
                this.setState({ serverError: "Account not found" });
            } else {
                this.props.login(
                    user.username,
                    user.password,
                    userConstants.USER_TYPES.ADMIN
                );
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    render() {
        const { loggingIn } = this.props;
        const {
            submitted,
            errors,
            type,
            user: { username, password },
            serverError,
        } = this.state;
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
                    <div className="login-form login-page">
                        <div className="col-12 col-md-offset-3">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <FormInput
                                        label="Email"
                                        type="text"
                                        name="username"
                                        value={username}
                                        placeholder="email@example.com"
                                        onChange={this.handleChange}
                                        error={serverError}
                                        className={
                                            "form-control field-input " +
                                            (serverError != null
                                                ? "err-input"
                                                : "")
                                        }
                                    />
                                    {this.validator.message(
                                        "username",
                                        username,
                                        "required"
                                    )}
                                </div>
                                <div
                                    className={
                                        "form-group " +
                                        (errors.password
                                            ? "error-password"
                                            : "")
                                    }
                                >
                                    <FormInput
                                        label="Create Password"
                                        type={type}
                                        name="password"
                                        value={password}
                                        placeholder="........"
                                        className={
                                            "password-placeholder form-control field-input " +
                                            isValidInput(
                                                "password",
                                                this.validator,
                                                submitted
                                            )
                                        }
                                        onChange={this.handleChange}
                                        updateType={(fieldType) =>
                                            this.setState({ type: fieldType })
                                        }
                                    />
                                    {this.validator.message(
                                        "password",
                                        password,
                                        "required"
                                    )}
                                </div>
                                <div align="right">
                                    <button
                                        type="button"
                                        className="form-href-link"
                                        onClick={this.forgotPassword}
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="form-group">
                                    <button
                                        disabled={!this.validator.allValid()}
                                        className="submit-btn"
                                    >
                                        Log in
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

const mapDispatchToProps = {
    login: userActions.login,
};

const connectedAdminLoginPage = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AdminLoginPage)
);
export { connectedAdminLoginPage as AdminLoginPage };
