import React from "react";
import "./style.scss";
import { Modal } from "antd";
import TextCounter from "../../TextCounter";

class AccountBio extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bio: props.bio };
    }
    onChange = (e) => {
        this.setState({
            bio: e.target.value,
        });
    };
    onSave = () => {
        const { bio } = this.state;
        this.props.onSave(bio);
    };

    render() {
        const { bio } = this.state;
        return (
            <Modal
                width={"30%"}
                visible={true}
                wrapClassName={"account-modal"}
                closable={false}
                onCancel={this.props.onCancel}
                footer={null}
            >
                <div className="form-group">
                    <label htmlFor="phoneumber">Bio</label>
                    <input
                        type="text"
                        value={bio}
                        className="form-control field-input"
                        id="bio"
                        maxLength={150}
                        onChange={this.onChange}
                    />
                    <TextCounter
                        value={bio}
                        maxLength={150}
                        className="natural"
                    />
                </div>

                <div className="form-group">
                    <button className="submit-btn" onClick={this.onSave}>
                        Continue
                    </button>
                </div>
                <div className="form-group text-center">
                    <button
                        type="button"
                        className="btn btn-link center-block"
                        onClick={this.props.onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        );
    }
}

export default AccountBio;
