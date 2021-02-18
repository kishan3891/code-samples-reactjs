import React from "react";
import NoteText from "./NoteText";
import * as moment from "moment";
import * as _ from "lodash";
import LoadingSpinner from "Components/Loading/LoadingSpinner";

class NotesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panelNumber: 1,
            expanded: true,
            panelStatus: [],
        };
    }

    showPanel(panel) {
        const { panelStatus } = this.state;
        panelStatus[panel] = !this.state.panelStatus[panel];
        this.setState({ panelStatus });
        this.setState({ panelNumber: panel });
    }

    /**
     *
     * @param {NotesConfig} config
     * @param {SessionNote} note
     */
    renderNoteConfig = (config, note) => {
        let value = "";
        if (config.key === "other") {
            value = note["reasons"] || "";
        } else if (config.key === "next_steps") {
            value = note["nextSteps"];
        } else {
            value = note[config.key] || "";
        }

        if (config.type === "check") {
            value = _.keys(value).map((id) => {
                const option = config.options.find(
                    (option) => option.id === Number(id)
                );
                return option ? option.value : "";
            });
            value = _.filter(value).join(", ");
        }
        if (config.key === "reasons") {
            var valueArr = value.split(/\r?\n/);
            if (valueArr[0]) {
                value = valueArr[0].replace(/,/g, ", ");
            } else {
                value = "";
            }
        }
        if (config.key === "other") {
            var valueArr = value.split(/\r?\n/);
            if (valueArr.length > 1) {
                value = valueArr.slice(-1)[0];
            } else {
                value = "";
            }
        }

        if (value) {
            return (
                <NoteText
                    key={`note_config_${config.key}`}
                    label={config.title}
                    text={value}
                />
            );
        } else {
            return "";
        }
    };
    checkNotesValue = (note) => {
        var listClassName = "";
        var otherdata = "";
        if (note.reasons) {
            var valueArr = note.reasons.split(/\r?\n/);
            if (valueArr.length > 1) {
                otherdata = valueArr.slice(-1)[0];
            } else {
                otherdata = "";
            }
        }
        if (otherdata) {
            if (!note.symptoms) {
                listClassName = "other-data";
            }
        } else {
            if (note.symptoms) {
                listClassName = "other-data";
            } else {
                listClassName = "no-data";
            }
        }
        return listClassName;
    };
    checkShowMore = (note) => {
        if (note.concerns || note.nextSteps || note.questions) {
            return true;
        } else {
            return false;
        }
    };
    renderNotes = () => {
        const { panelStatus } = this.state;
        const { items, configuration } = this.props;

        return items.map((note) => {
            const isShowingMore = !!panelStatus[note.id];
            var listClassName = "";
            listClassName = this.checkNotesValue(note);
            var showmore = this.checkShowMore(note);
            return (
                <div
                    key={note.id}
                    className={
                        "past-data-inner " +
                        (isShowingMore ? "content-show " : listClassName)
                    }
                >
                    <div className="past-data-header">
                        <h4>{moment(note.date).format("MMM DD, YYYY")}</h4>
                        {showmore ? (
                            <a onClick={() => this.showPanel(note.id)}>
                                Show {isShowingMore ? "less" : "more"}{" "}
                                <icon
                                    className={
                                        isShowingMore === true
                                            ? "icon-Angle-Up"
                                            : "icon-Angle-Down"
                                    }
                                />
                            </a>
                        ) : (
                            ""
                        )}
                    </div>
                    {configuration.map((config) =>
                        this.renderNoteConfig(config, note)
                    )}
                </div>
            );
        });
    };
    render() {
        const { loading } = this.props;

        return (
            <LoadingSpinner
                spinning={loading}
                wrapperClassName="counslr-spinner"
                dimensions={`large`}
            >
                {this.renderNotes()}
            </LoadingSpinner>
        );
    }
}

export default NotesList;
