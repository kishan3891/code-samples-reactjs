import React from "react";
import { camelCase } from "../../../helpers";
import Checkbox from "Components/Checkbox";
import FormTextAreaInput from "Components/FormTextAreaInput";
import PropTypes from "prop-types";
import ActionButton from "../../ActionButton";
import isEqual from "lodash/isEqual";
import orderBy from "lodash/orderBy";
import LoadingSpinner from "Components/Loading/LoadingSpinner";
import AlertModal from "../../Modals/AlertModal";

class SessionNoteForm extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (props.notes && state.notes?.id !== props.notes.id) {
            return {
                notes: props.notes,
                defaultNotes: { ...props.notes },
            };
        }
        return null;
    }
    constructor(props) {
        super(props);
        this.state = {
            notes: {},
            saving: false,
            checkedItems: new Map(),
            isValid: false,
            confirmSaveNotes: false,
        };
    }
    updateCheckboxState = (noteConfigKey, id, checked) => {
        const { notes } = this.state;
        const values = notes[noteConfigKey] || {};
        this.setState({
            notes: {
                ...notes,
                [noteConfigKey]: {
                    ...values,
                    [id]: checked,
                },
            },
        });
    };

    handleStateChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const { notes } = this.state;
        this.setState({
            notes: {
                ...notes,
                [name]: value,
            },
        });
    };
    handleBlurChange = () => {
        if (this.hasNotesChanged()) {
            setTimeout(() => {
                if (!this.state.saving) {
                    this.saveNotes(this.state.notes, true);
                }
            }, 2000);
        }
    };
    renderCheckboxes = (config) => {
        if (!config.options?.length) {
            return null;
        }
        const { notes } = this.state;
        const checkedOptionValues = notes[config.key] || {};
        const options = orderBy(
            config.options.map((opt) => ({
                ...opt,
                checked: checkedOptionValues[opt.id],
            })),
            ["value"]
        );
        return options.map((item, index) => (
            <li key={`${config.key}_${item.id}`}>
                <label key={index}>
                    <Checkbox
                        name={`${config.key}_${item.id}`}
                        checked={item.checked}
                        onChange={(e) =>
                            this.updateCheckboxState(
                                config.key,
                                item.id,
                                e.target.checked
                            )
                        }
                    />
                    <span className="label-text">{item.value}</span>
                </label>
            </li>
        ));
    };

    hasNotesChanged() {
        const { defaultNotes, notes } = this.state;
        return !isEqual(notes, defaultNotes);
    }

    getNotes(hasChanged) {
        if (hasChanged && !this.hasNotesChanged()) {
            return false;
        }
        this.setState({
            defaultNotes: { ...this.state.notes },
        });
        return { ...this.state.notes };
    }
    getTextAreaValueForConfig = (config) => {
        var reasondata = "";
        if (config.key === "reasons") {
            if (this.state.notes[config.key]) {
                return (reasondata = this.state.notes[config.key].replace(
                    /,/g,
                    ", "
                ));
            } else {
                return "";
            }
        }
        return (
            this.state.notes[config.key] ||
            this.state.notes[camelCase(config.key)]
        );
    };
    onCancelSaveNotes = () => {
        return this.setState({ confirmSaveNotes: false });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const { saving, notes } = this.state;
        if (saving) return;
        this.setState({
            confirmSaveNotes: true,
        });
    };
    onSaveNotesConfirmed = () => {
        const { saving, notes } = this.state;
        if (saving) return;
        this.saveNotes(notes);
        return this.setState({ confirmSaveNotes: false });
    };
    saveNotes = (notes, silent = false) => {
        this.setState(
            {
                saving: true,
            },
            () => {
                this.props.onSave(notes, silent).then((saved) => {
                    if (saved) {
                        this.setState({
                            saving: false,
                            defaultNotes: { ...notes },
                        });
                    }
                });
            }
        );
    };
    render() {
        let formdata = "";
        const { saving, confirmSaveNotes } = this.state;
        const {
            /**
             * @type NotesConfig[]
             * */
            configuration = [],
            loading = true,
            disabled,
        } = this.props;
        formdata = configuration.map((config) => {
            const isReadOnly = [1, 6].includes(config.id);

            if (config.type === "input") {
                return (
                    <div
                        className={
                            "view-checkboxes " +
                            (isReadOnly ? "reasons-fields" : "")
                        }
                        key={config.key}
                    >
                        <div className="big-txt">
                            <FormTextAreaInput
                                onChange={this.handleStateChange}
                                name={camelCase(config.key)}
                                label={config.title}
                                onBlur={this.handleBlurChange}
                                readyOnly={isReadOnly}
                                value={this.getTextAreaValueForConfig(config)}
                                maxLength={config.maxLength}
                            />
                        </div>
                    </div>
                );
            }
            if (config.type === "check") {
                return (
                    <div className="view-checkboxes" key={config.key}>
                        <p>{config.title}</p>
                        <ul>{this.renderCheckboxes(config)}</ul>
                    </div>
                );
            }
        });

        return (
            <LoadingSpinner
                spinning={loading}
                wrapperClassName="counslr-spinner"
                dimensions={`large`}
            >
                <form onSubmit={this.handleSubmit}>
                    {formdata}
                    <div className="form-group note-form-submitbtn">
                        <ActionButton processing={saving} disabled={disabled}>
                            Submit
                        </ActionButton>
                    </div>
                </form>
                {confirmSaveNotes && (
                    <AlertModal
                        buttonText={"Submit"}
                        onClick={this.onSaveNotesConfirmed}
                        onCancel={this.onCancelSaveNotes}
                        alertType={"confirm"}
                        text={
                            "Are you sure you want to submit these notes? This session will be removed from your current sessions."
                        }
                    />
                )}
            </LoadingSpinner>
        );
    }
}

export default SessionNoteForm;
SessionNoteForm.propTypes = {
    loading: PropTypes.bool,
    configuration: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            maxLength: PropTypes.number,
            type: PropTypes.oneOf(["input", "check"]).isRequired,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    value: PropTypes.string.isRequired,
                })
            ),
        })
    ),
};
