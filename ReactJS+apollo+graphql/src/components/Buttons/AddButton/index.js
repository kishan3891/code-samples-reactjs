import React from "react";

class AddButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="add-button">
                    <button
                        className="add-btn"
                        onClick={this.props.clickAction}
                    >
                        {this.props.text}
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export default AddButton;
