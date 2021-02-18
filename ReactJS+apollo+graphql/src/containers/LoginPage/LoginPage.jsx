import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import AccountSetup from "Components/AccountSetup";
import FormInput from "Components/FormInput";
import { isValidInput } from "Utils/isValidInput";
import { withRouter } from "react-router-dom";
import { showMessage } from "../../utils/showMessage";
import ActionButton from "../../components/ActionButton";
import { newValidator } from "../../helpers";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                password: "",
            },
            submitted: false,
            type: "password",
            errors: {},
            serverError: null,
        };
        this.validator = newValidator();
    }

    componentWillReceiveProps(nextProps, prevState) {
        if (nextProps.serverError !== prevState.serverError) {
            this.setState({
                serverError: nextProps.serverError,
            });
        }
    }

    forgotPassword = () => {
        this.props.history.push("/forgot-password");
    };

    handleChange = (e) => {
        const { user } = this.state;
        user[e.target.name] = e.target.value;
        this.setState({ user, serverError: null });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.validator.allValid()) {
            const { email, password } = this.state.user;
            if (email && password) {
                this.props.login(email, password);
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    render() {
        const { loaders } = this.props;
        const {
            submitted,
            errors,
            type,
            user: { email, password },
        } = this.state;

        return (
            <React.Fragment>
                <AccountSetup
                    welcomeText={"Counslr"}
                    stepText={"Welcome Back"}
                    accountText={"Log in"}
                    isFooter={false}
                />
                <div className="app-right">
                    <div className="login-form login-page">
                        <div className="col-12 col-md-offset-3">
                            <div className="col-12"></div>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <FormInput
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        placeholder="email@example.com"
                                        onChange={this.handleChange}
                                        error={showMessage(
                                            this.validator,
                                            "email"
                                        )}
                                        className={
                                            "form-control field-input " +
                                            isValidInput(
                                                "email",
                                                this.validator,
                                                email
                                            )
                                        }
                                    />
                                </div>
                                {email &&
                                    this.validator.message(
                                        "email",
                                        email,
                                        "email|required"
                                    )}
                                <div
                                    className={
                                        "form-group form-group-password " +
                                        (errors.password
                                            ? "error-password"
                                            : "")
                                    }
                                >
                                    <FormInput
                                        label="Password"
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
                                    <ActionButton
                                        disabled={!this.validator.allValid()}
                                        processing={loaders.login}
                                    >
                                        Log in
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

function mapState(state) {
    const { loaders } = state.authentication;
    return { loaders };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout,
};

const connectedLoginPage = withRouter(
    connect(mapState, actionCreators)(LoginPage)
);
export { connectedLoginPage as LoginPage };
