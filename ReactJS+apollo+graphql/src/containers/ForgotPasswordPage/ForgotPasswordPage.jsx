import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import AccountSetup from "Components/AccountSetup";
import "./style.scss";
import { Link } from "react-router-dom";
import FormInput from "Components/FormInput";
import SimpleReactValidator from "simple-react-validator";
import ActionButton from "../../components/ActionButton";

class ForgotPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: "",
            },
            submitted: false,
            resetLinkSubmitted: false,
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

        if (this.validator.allValid()) {
            this.setState({ submitted: true });
            this.props
                .forgotPassword(this.state.user.email)
                .then((sent) => {
                    this.setState({
                        resetLinkSubmitted: true,
                    });
                })
                .catch((error) => {
                    this.setState({
                        serverError: error.message,
                        submitted: false,
                    });
                });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    render() {
        const {
            user: { email },
            submitted,
            resetLinkSubmitted,
            serverError,
        } = this.state;
        return (
            <React.Fragment>
                <AccountSetup
                    welcomeText={"Counslr"}
                    accountText={"Reset password"}
                    isFooter={false}
                />
                <div className="app-right">
                    {!resetLinkSubmitted && (
                        <div className="login-form btm-space">
                            <div className="col-12 col-md-offset-3">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group diff-space">
                                        <FormInput
                                            label="Email"
                                            type="email"
                                            name="email"
                                            value={email}
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
                                            "email",
                                            email,
                                            "required|email"
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <ActionButton
                                            disabled={
                                                !this.validator.allValid()
                                            }
                                            processing={submitted}
                                        >
                                            Send Reset Link
                                        </ActionButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {resetLinkSubmitted && (
                        <div className="login-form">
                            <div className="col-12 col-md-offset-3">
                                <div className="reset-password">
                                    <h3>Check your email</h3>
                                    <p>
                                        A link to reset your password has been
                                        sent <br />
                                        to{" "}
                                        <span className="reset-email-text">
                                            {email}
                                        </span>
                                        .
                                    </p>
                                    <Link to={`/login`}>Log in</Link>
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

const mapDispatchToProps = {
    forgotPassword: userActions.forgotPassword,
};

const connectedLoginPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordPage);
export { connectedLoginPage as ForgotPasswordPage };
