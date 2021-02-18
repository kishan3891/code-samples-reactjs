import React from "react";
import { connect } from "react-redux";
import AccountSetup from "Components/AccountSetup";
import FormInput from "Components/FormInput";
import "./style.scss";

class AdminSetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "email@example.com",
                password: "",
            },
            formIsValid: false,
            submitted: false,
            errors: {},
            type: "password",
            serverError: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { user } = this.state;
        user[e.target.name] = e.target.value;
        this.setState({ user });
        this.validateForm();
    }

    validateForm(e) {
        let fields = this.state.user;
        let errors = {};
        let formValid = true;
        if (typeof fields["password"] !== "undefined") {
            var pattern = new RegExp(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{3,}$/gm
            );
            formValid = fields["password"] == "" ? false : true;
            if (formValid && !pattern.test(fields["password"])) {
                formValid = false;
                errors["password"] =
                    "Password must contain at least 1 capital letter, 1 number & 1 special character.";
            }
        }
        this.setState({ errors: errors, formIsValid: formValid });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.validateForm();
        if (this.state.formIsValid) {
            if (this.state.user.password == "Test@123") {
                this.setState({ serverError: "Cannot reuse old password." });
            } else {
                this.setState({ submitted: true, serverError: "" });
                this.props.history.push("/admin/verification");
            }
        }
    }

    render() {
        const {
            submitted,
            type,
            user: { email, password },
            formIsValid,
            errors,
            serverError,
        } = this.state;
        return (
            <React.Fragment>
                <AccountSetup
                    welcomeText={
                        'Counslr <span className="sub-text-main">Admin</span>'
                    }
                    accountText={"Set new password"}
                    isFooter={false}
                />
                <div className="app-right">
                    <div className="login-form btm-space">
                        <div className="col-12 col-md-offset-3">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label>Anna Rain</label>
                                    <div>{email}</div>
                                </div>
                                <div
                                    className={
                                        "form-group password-input " +
                                        (errors.password != "" || serverError
                                            ? "error-password"
                                            : "")
                                    }
                                >
                                    <FormInput
                                        label="New Password"
                                        type={type}
                                        name="password"
                                        value={password}
                                        placeholder="........"
                                        className={
                                            "password-placeholder form-control field-input " +
                                            (errors.password || serverError
                                                ? "err-input"
                                                : "")
                                        }
                                        onChange={this.handleChange}
                                        updateType={(fieldType) =>
                                            this.setState({ type: fieldType })
                                        }
                                    />
                                    {serverError ? (
                                        <span
                                            className={
                                                "password-text error-msg validation-height "
                                            }
                                        >
                                            {serverError}
                                        </span>
                                    ) : (
                                        <span
                                            className={
                                                "password-text " +
                                                (errors.password
                                                    ? "error-msg"
                                                    : "")
                                            }
                                        >
                                            Password must contain at least 1
                                            capital letter, 1 number & 1 special
                                            character
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <button
                                        disabled={!formIsValid}
                                        className="submit-btn"
                                    >
                                        Set password
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

const connectedAdminSetPasswordPage = connect(mapStateToProps)(
    AdminSetPasswordPage
);
export { connectedAdminSetPasswordPage as AdminSetPasswordPage };
