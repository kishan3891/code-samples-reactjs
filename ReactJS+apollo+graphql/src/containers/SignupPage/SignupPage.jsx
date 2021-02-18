import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import AccountSetup from "Components/AccountSetup";
import FormInput from "Components/FormInput";
import { isValidInput } from "Utils/isValidInput";
import InputMask from "react-input-mask";
import Loading from "Components/Loading";
import { showMessage } from "../../utils/showMessage";
import { newValidator } from "../../helpers";

class SignupPage extends React.Component {
    static getDerivedStateFromProps(props, state) {
        const { user } = props;
        if (user?.email && user?.email !== state.user.email) {
            return {
                ...state,
                user: {
                    id: user.id,
                    email: user.email,
                },
            };
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                phoneNumber: "",
                password: "",
            },
            submitted: false,
            fieldType: "password",
            isEye: false,
            serverError: null,
            passwordSubmitted: false,
        };
        this.validator = newValidator();
    }

    /* componentWillReceiveProps(nextProps, prevState) {
      if (nextProps.serverError !== prevState.serverError) {
          this.setState({
              serverError: nextProps.serverError,
          });
      }
  }*/
    handleChange = (e) => {
        const { user } = this.state;

        this.setState({
            user: {
                ...user,
                [e.target.name]: e.target.value,
            },
            [`${e.target.name}Submitted`]: true,
            serverError: null,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const {
            location: { query },
        } = this.props;

        if (this.validator.allValid()) {
            this.props.continueOnboarding({
                ...user,
                authToken: query.token,
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    render() {
        const { loaders } = this.props;
        const {
            user: { email, phoneNumber, password },
            submitted,
            fieldType,
            passwordSubmitted,
        } = this.state;
        return (
            <React.Fragment>
                <AccountSetup
                    welcomeText={"Welcome"}
                    stepText={"Step 1 of 3"}
                    accountText={"Create Account"}
                    isFooter={true}
                />
                <div className="app-right">
                    <div className="login-form sign-up">
                        <div className="col-12 col-md-offset-3">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <FormInput
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        disabled={true}
                                        placeholder="your-email@gmail.com"
                                        onChange={this.handleChange}
                                        className={`form-control field-input signup-email ${isValidInput(
                                            "email",
                                            this.validator,
                                            submitted
                                        )}`}
                                        error={showMessage(
                                            this.validator,
                                            "email"
                                        )}
                                    />
                                    {this.validator.message(
                                        "email",
                                        email,
                                        "required|email"
                                    )}
                                </div>
                                {this.validator.message(
                                    "phoneNumber",
                                    phoneNumber,
                                    "required|phone"
                                )}
                                <div className="form-group">
                                    <label htmlFor={"phoneNumber"}>
                                        {"Phone Number"}
                                    </label>
                                    <InputMask
                                        placeholder="(123) 456-7890"
                                        name="phoneNumber"
                                        className={
                                            "form-control field-input " +
                                            isValidInput(
                                                "phoneNumber",
                                                this.validator,
                                                submitted
                                            )
                                        }
                                        value={phoneNumber}
                                        mask="(999) 999-9999"
                                        maskChar=" "
                                        onChange={this.handleChange}
                                    />
                                    <span className="error-msg">
                                        {submitted &&
                                            showMessage(
                                                this.validator,
                                                "phoneNumber"
                                            )}
                                    </span>
                                </div>
                                {this.validator.message(
                                    "password",
                                    password,
                                    "required|counslrPassword"
                                )}
                                <div
                                    className={`form-group error-password error-password-signup ${isValidInput(
                                        "password",
                                        this.validator,
                                        passwordSubmitted,
                                        "error-password-true"
                                    )}`}
                                >
                                    <FormInput
                                        label="Create Password"
                                        type={fieldType}
                                        name="password"
                                        value={password}
                                        placeholder="........"
                                        className={
                                            "password-placeholder form-control field-input"
                                        }
                                        error={showMessage(
                                            this.validator,
                                            "password"
                                        )}
                                        autoComplete={"new-password"}
                                        onChange={this.handleChange}
                                        updateType={(fieldType) =>
                                            this.setState({ fieldType })
                                        }
                                    />
                                </div>
                                <div className="form-btm-content">
                                    <p>
                                        By proceeding, I agree to Counslr's{" "}
                                        <a
                                            href="https://www.counslr.com/legal/terms"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Terms of Use
                                        </a>{" "}
                                        and acknowledge that I have read the{" "}
                                        <a
                                            href="https://www.counslr.com/legal/privacy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Privacy Policy
                                        </a>
                                        .
                                    </p>
                                    <p>
                                        I also consent to receive calls or SMS
                                        messages, including by automated dialer,
                                        from Counslr and its affiliates to the
                                        number I provide for informational
                                        and/or marketing purposes.
                                    </p>
                                </div>
                                <div className="form-group">
                                    <button
                                        disabled={!this.validator.allValid()}
                                        className="submit-btn"
                                    >
                                        {loaders.register ? (
                                            <Loading
                                                loading={loaders.register}
                                            />
                                        ) : (
                                            `Sign up`
                                        )}
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
    const { counselor } = state.counselor;
    const { user: authUser } = state.authentication;
    const { registering, user, serverError, loaders } = state.registration;
    return {
        registering,
        serverError,
        user: user || authUser || counselor,
        loaders,
    };
}

const actionCreators = {
    continueOnboarding: userActions.continueOnboarding,
};
const connectedSignupPage = connect(
    mapStateToProps,
    actionCreators
)(SignupPage);
export { connectedSignupPage as SignupPage };
