import PropTypes from "prop-types";
import React from "react";
import TextCounter from "Components/TextCounter";

class FormTextAreaInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            maxLength,
            name,
            onChange,
            placeholder,
            value,
            label,
            readyOnly,
            onBlur,
        } = this.props;

        return (
            <React.Fragment>
                <label htmlFor={name}>{label}</label>
                {readyOnly && (
                    <div style={{ whiteSpace: "pre-wrap" }}>{value}</div>
                )}
                {!readyOnly && (
                    <textarea
                        maxLength={maxLength}
                        onChange={onChange}
                        id={name}
                        name={name}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        value={value}
                    />
                )}
                {!readyOnly && maxLength && (
                    <TextCounter maxLength={maxLength} value={value} />
                )}
            </React.Fragment>
        );
    }
}

FormTextAreaInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
};

FormTextAreaInput.defaultProps = {
    max_length: 400,
    value: "",
    placeholder: "Start typing...",
};
export default FormTextAreaInput;
