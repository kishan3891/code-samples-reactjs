import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Modal } from "antd";
import ModifyShift from "../../ModifyShift";

export default class AddShift extends React.Component {
    constructor(props) {
        super(props);
    }
    onCancelAdd = () => {
        this.props.onCancel();
        //console.log("cancel", "aaaaaaaaaaaaaaaaaaa");
    };
    render() {
        const {
            minShiftHoursDuration,
            maxShiftCapacity,
            maxShiftHoursDuration,
            saving,
        } = this.props;
        const modifyProps = {
            minShiftHoursDuration,
            maxShiftCapacity,
            saving,
            maxShiftHoursDuration,
        };
        return (
            <Modal
                width={"30%"}
                visible={true}
                onCancel={this.onCancelAdd}
                wrapClassName={"account-modal"}
                footer={null}
            >
                <div className="modal-right-head">
                    <h3>New Shift</h3>
                </div>
                <ModifyShift
                    {...modifyProps}
                    onSave={this.props.onSave}
                    buttonText={"Create Shift"}
                    alert={this.props.alert}
                />
            </Modal>
        );
    }
}

AddShift.propTypes = {
    maxShiftCapacity: PropTypes.number.isRequired,
    minShiftHoursDuration: PropTypes.number.isRequired,
    maxShiftHoursDuration: PropTypes.number.isRequired,
};
