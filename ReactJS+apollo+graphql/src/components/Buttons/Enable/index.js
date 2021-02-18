import React from "react";
import Loading from "Components/Loading";

class EnableButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const onClick = this.props.onClick || this.props.handleEnabled;
        return (
            <React.Fragment>
                <button className="white-btn enabled-button" onClick={onClick}>
                    {this.props.loading ? (
                        <Loading loading={this.props.loading} />
                    ) : (
                        `Enable account`
                    )}
                </button>
            </React.Fragment>
        );
    }
}

export default EnableButton;
