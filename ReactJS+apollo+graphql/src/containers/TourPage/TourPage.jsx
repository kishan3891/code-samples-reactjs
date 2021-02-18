import React from "react";
import { connect } from "react-redux";
import CustomSlider from "Components/CustomSlider";
import { CONSTANT } from "Constants";
import "./style.scss";

class TourPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        return (
            <React.Fragment>
                <div className="app-left-tour tour-page">
                    <div className="welcome-text">Welcome</div>
                    <CustomSlider />

                    <div className="user-name-left">
                        <div className="tour-logo">
                            <img src={CONSTANT.LOGO_WHITE} alt="tour-logo" />
                        </div>

                        <span>{user.name}</span>
                        <p>{user.email}</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user,
    };
}

const connectedTourPage = connect(mapStateToProps)(TourPage);
export { connectedTourPage as TourPage };
