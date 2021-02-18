import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import { CONSTANT } from "Constants";

class AccountSetup extends React.Component {
    state = {
        stepText: this.props.stepText,
        accountText: this.props.accountText,
        welcomeText: this.props.welcomeText,
        isFooter: this.props.isFooter,
    };

    render() {
        const { user } = this.props;
        console.log(user, "user data");
        return (
            <React.Fragment>
                <div className="app-left">
                    <div
                        className="welcome-text signup"
                        dangerouslySetInnerHTML={{
                            __html: this.props.welcomeText,
                        }}
                    />
                    <div className="account-step login-signup">
                        <span>{this.state.stepText}</span>
                        <div className="account-step-set">
                            {this.state.accountText}
                        </div>
                    </div>
                    {user.name && user.email ? (
                        <div
                            className={
                                this.props.isFooter === true
                                    ? "user-name-left"
                                    : "hidden"
                            }
                        >
                            <div className="signup-logo-img">
                                <img src={CONSTANT.LOGO_WHITE} alt="Counslr" />
                            </div>
                            <span>{user.name}</span>
                            <p>{user.email}</p>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { counselor } = state.counselor;
    const { user } = state.authentication;
    return {
        user: {
            ...user,
            ...counselor,
        },
    };
};

export default connect(mapStateToProps)(AccountSetup);
