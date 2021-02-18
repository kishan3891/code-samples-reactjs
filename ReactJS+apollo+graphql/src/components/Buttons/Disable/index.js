import React from "react";

class DisableButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const onClick = this.props.onClick || this.props.handleDisaBled;
        return (
            <React.Fragment>
                <button className="white-btn" onClick={onClick}>
                    Disable account
                </button>
            </React.Fragment>
        );
    }
}

export default DisableButton;
