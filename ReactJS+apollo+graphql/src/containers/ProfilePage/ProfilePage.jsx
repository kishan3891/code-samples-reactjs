import React from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import AccountSetup from "Components/AccountSetup";
import Avatar from "Components/Avatar";
import "./style.scss";

import ActionButton from "Components/ActionButton";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            fileUrl: "",
            submitted: false,
        };
    }

    uploadSingleFile = (fileRef) => {
        this.setState({
            submitted: true,
            fileRef,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.uploadAvatar(this.state.fileRef).then((id) => {
            if (id) {
                this.props.history.push("/tour");
            }
        });
    };

    render() {
        const { fileRef } = this.state;
        const { loaders } = this.props;

        return (
            <React.Fragment>
                <AccountSetup
                    welcomeText={"Welcome"}
                    stepText={"Step 3 of 3"}
                    accountText={"Profile"}
                    isFooter={true}
                />

                <div className="app-right profile-page">
                    <div className="login-form">
                        <div className="col-12 col-md-offset-3">
                            <form onSubmit={this.handleSubmit}>
                                <Avatar
                                    onSelecfile={this.uploadSingleFile}
                                    className="profile-upload-img"
                                    btnText={"Upload an image"}
                                    breakText={true}
                                />
                                <div className="form-group">
                                    <ActionButton
                                        disabled={!fileRef}
                                        processing={loaders.avatar}
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
    const { loaders, user } = state.authentication;
    return {
        user,
        loaders,
    };
}

const mapDispatchToProps = {
    uploadAvatar: userActions.uploadAvatar,
};

const connectedProfilePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
export { connectedProfilePage as ProfilePage };
