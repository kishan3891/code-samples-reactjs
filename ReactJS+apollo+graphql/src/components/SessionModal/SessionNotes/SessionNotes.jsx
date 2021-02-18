import React from "react";
import backarrow from "Images/left-arrow.svg";
import NotesList from "./Notelist";
import SessionNoteForm from "./SessionNoteForm";
import classnames from "classnames";

//class SessionNotes extends React.Component {
export default class SessionNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedItems: new Map(),
            isValid: false,
        };
        this.notesFormRef = React.createRef();
    }

    onSave = (notes, silent) => {
        return this.props.onSave(notes, silent).then((saved) => {
            if (saved) {
                this.props.showPastNotes(
                    !silent ? true : this.props.isPastNotes
                );
            }
            return saved;
        });
    };
    getNotes(hasChanged) {
        if (this.notesFormRef.current) {
            return this.notesFormRef.current.getNotes(hasChanged);
        }
        return false;
    }

    render() {
        const {
            pastNotes = [],
            config = [],
            session,
            loaders = {},
            notes,
            isPastNotes,
            isScheduleFrom,
        } = this.props;
        const isNotificationClass = document.getElementsByClassName(
            "sub-notification"
        )[0];

        return (
            <React.Fragment>
                <div style={{ padding: isPastNotes ? 0 : "24px" }}>
                    <div
                        className={classnames(
                            "view-post-name",
                            "schedule-notes",
                            isNotificationClass && "past-notification",
                            isPastNotes && "schedule-with-past-notes"
                        )}
                    >
                        <div
                            className="view-post-inner"
                            style={{ display: isPastNotes ? "none" : "block" }}
                        >
                            <div className="view-post-top-head clearfix">
                                <h4>This session</h4>
                                {pastNotes.length > 0 && (
                                    <a
                                        onClick={() =>
                                            this.props.showPastNotes(
                                                !isPastNotes
                                            )
                                        }
                                    >
                                        View past notes
                                    </a>
                                )}
                            </div>
                            {!isScheduleFrom && (
                                <SessionNoteForm
                                    ref={this.notesFormRef}
                                    loading={loaders.notes}
                                    saving={loaders.saving}
                                    notes={notes}
                                    disabled={!session.end_date}
                                    configuration={config}
                                    onSave={this.onSave}
                                />
                            )}
                        </div>
                        {isPastNotes && (
                            <div className="past-data">
                                {!isScheduleFrom && (
                                    <div className="back-btn">
                                        <a
                                            onClick={() =>
                                                this.props.showPastNotes(
                                                    !isPastNotes
                                                )
                                            }
                                        >
                                            <img src={backarrow} />
                                            Back
                                        </a>
                                    </div>
                                )}

                                <NotesList
                                    loading={loaders.pastNotes}
                                    items={pastNotes}
                                    configuration={config}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
