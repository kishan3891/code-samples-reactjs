import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import AccountSetup from "Components/AccountSetup";
import FormInput from "Components/FormInput";
import "./style.scss";
import { newValidator, storage } from "../../helpers";
import { isValidInput } from "../../utils/isValidInput";
import Loading from "../../components/Loading";
import { showMessage } from "../../utils/showMessage";
import { Link } from "react-router-dom";

class SetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        storage();
        this.state = {
            user: {
                email: "email@example.com",
                password: "",
            },
            formIsValid: false,
            submitted: false,
            errors: {},
            fieldType: "password",
            passwordSubmitted: false,
            serverError: "",
            passwordChanged: false,
        };

        this.validator = newValidator();
    }

    handleChange = (e) => {
        const { user } = this.state;
        user[e.target.name] = e.target.value;

        this.setState({
            [`${e.target.name}Submitted`]: true,
            user,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const {
            user: { password },
        } = this.state;
        const {
            location: { query },
        } = this.props;
        if (this.validator.allValid()) {
            this.props
                .attemptPasswordChange(password, query.token)
                .then((passwordChanged) => {
                    this.setState({ passwordChanged });
                });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    render() {
        const {
            fieldType,
            passwordSubmitted,
            serverError,
            passwordChanged,
            user: { password },
        } = this.state;
        const { loaders, user } = this.props;
        return (
            <React.Fragment>
                <AccountSetup
                    welcomeText={"Counslr"}
                    accountText={"Set new password"}
                    isFooter={false}
                />
                <div className="app-right">
                    {!passwordChanged && (
                        <div className="login-form btm-space">
                            <div className="col-12 col-md-offset-3">
                                <form onSubmit={this.handleSubmit}>
                                    {
                                        <div className="form-group">
                                            <label>{user?.name}</label>
                                            <div>{user?.email}</div>
                                        </div>
                                    }
                                    {passwordSubmitted &&
                                        this.validator.message(
                                            "password",
                                            password,
                                            "required|counslrPassword"
                                        )}
                                    <div
                                        className={`form-group password-input ${isValidInput(
                                            "password",
                                            this.validator,
                                            passwordSubmitted,
                                            "error-password"
                                        )}`}
                                    >
                                        <FormInput
                                            label="New Password"
                                            type={fieldType}
                                            name="password"
                                            value={password}
                                            placeholder="........"
                                            error={showMessage(
                                                this.validator,
                                                "password"
                                            )}
                                            className={
                                                "password-placeholder form-control field-input " +
                                                isValidInput(
                                                    "password",
                                                    this.validator,
                                                    passwordSubmitted
                                                )
                                            }
                                            onChange={this.handleChange}
                                            updateType={(fieldType) =>
                                                this.setState({
                                                    fieldType,
                                                })
                                            }
                                        />
                                        {serverError && (
                                            <span
                                                className={
                                                    "password-text error-msg validation-height "
                                                }
                                            >
                                                {serverError}
                                            </span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <button
                                            disabled={
                                                !this.validator.allValid()
                                            }
                                            className="submit-btn"
                                        >
                                            {loaders.register ? (
                                                <Loading
                                                    loading={loaders.register}
                                                />
                                            ) : (
                                                `Set password`
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {passwordChanged && (
                        <div className="login-form">
                            <div className="col-12 col-md-offset-3">
                                <div className="reset-password">
                                    <h3>You're all set</h3>
                                    <p>
                                        Your password has been changed. Please
                                        login with your new password.
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
    const { loaders, user } = state.authentication;
    return {
        user,
        loaders,
    };
}

const mapDispatchToProps = {
    attemptPasswordChange: userActions.attemptPasswordChange,
};

const connectedSetPasswordPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetPasswordPage);
export { connectedSetPasswordPage as SetPasswordPage };
