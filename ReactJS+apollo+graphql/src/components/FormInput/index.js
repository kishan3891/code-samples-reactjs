import React from "react";

import InputMask from "react-input-mask";
class FormInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEye: false,
        };
    }

    showHide = (e) => {
        this.props.updateType(this.props.type === "text" ? "password" : "text");
        this.setState({
            isEye: this.props.type !== "text",
        });
    };

    render() {
        const inputProps = {
            id: this.props.name,
            name: this.props.name,
            type: this.props.type,
            placeholder: this.props.placeholder,
            onChange: this.props.onChange,
            onBlur: this.props.onBlur,
            value: this.props.value,
            className: this.props.className,
            disabled: this.props.disabled,
            maxLength: this.props.maxLength,
            autoComplete: this.props.autoComplete,
        };

        if (this.props.phone) {
            delete inputProps.maxLength;
        }
        return (
            <React.Fragment>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                {!this.props.phone && <input {...inputProps} />}
                {this.props.phone && (
                    <InputMask
                        {...inputProps}
                        placeholder="(123) 456-7890"
                        name="phoneNumber"
                        mask="(999) 999-9999"
                    />
                )}

                {this.props.error && (
                    <span
                        className="error-msg"
                        dangerouslySetInnerHTML={{ __html: this.props.error }}
                    />
                )}
                {this.props.type === "password" && (
                    <span
                        className="fa fa-fw fa-eye field-icon toggle-password"
                        onClick={this.showHide}
                    />
                )}
                {this.state.isEye === true && (
                    <span
                        className="fa fa-fw fa-eye-slash field-icon toggle-password"
                        onClick={this.showHide}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default FormInput;
