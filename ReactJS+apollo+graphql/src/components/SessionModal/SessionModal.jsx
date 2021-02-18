import React from "react";
import "./style.scss";
import SessionNotes from "./SessionNotes/SessionNotes";
import SessionProfile from "Components/SessionProfile";
import SessionLeftSide from "./SessionLeftSide";
import { Modal, Tabs } from "antd";
import { connect } from "react-redux";
import { sessionActions } from "Actions";
import { bindActionCreators } from "redux";
import * as _ from "lodash";
import AlertModal from "../Modals/AlertModal";
import { scheduleActions } from "../../actions";
import LoadingSpinner from "Components/Loading/LoadingSpinner";

const TabPane = Tabs.TabPane;
class SessionModalUnconnected extends React.Component {
    /**
     *
     * @param {SessionModelProps} props
     */
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "1",
            session: null,
            confirmLeaveShift: false,
            profile: {
                name: "",
            },
            isPastNotes: false,
        };
        this.sessionNotesRef = React.createRef();
    }
    changeTab = (activeKey) => {
        this.setState({
            activeTab: activeKey,
        });
    };
    onClickSession = (session) => {
        if (session) {
        }
        const { student } = session;
        let gender;
        if (student.genderId) {
            gender = _.find(this.props.gender, function (g) {
                return g.id === student.genderId;
            });
        }

        this.props.setActiveSession(session);
        this.setState({
            session: session,
            profile: {
                ...session.student,
                gender,
            },
        });
    };
    saveNotesSilently(session) {
        if (!this.sessionNotesRef.current) return;
        const currentNotes = this.sessionNotesRef.current.getNotes();
        this.props
            .saveSessionNotes(session, currentNotes, true)
            .then(() => {
                // just suppress :(
            })
            .catch(() => {
                // just suppress :(
            });
    }
    onLeaveShift = () => {
        const { shift } = this.props;
        if (shift.sessions.length) {
            return this.setState({ confirmLeaveShift: true });
        }
        this.onLeaveShiftConfirmed();
    };
    onLeaveShiftConfirmed = () => {
        const { shift } = this.props;

        this.props.leaveShift(shift.enrollment_id).then(() => {
            this.onCancelLeaveShift();
        });
    };
    onCancelLeaveShift = () => {
        this.setState({
            confirmLeaveShift: false,
        });
    };
    onSaveSessionNotes = (notes) => {
        const { session } = this.state;
        return this.props.saveSessionNotes(session, notes, true);
    };
    showPastNotes = (notes) => {
        return this.setState({
            isPastNotes: notes,
        });
    };
    render() {
        const {
            shift,
            loaders,
            notesConfig,
            notes,
            pastNotes,
            sessionLoaders,
        } = this.props;
        const { profile, session, confirmLeaveShift, isPastNotes } = this.state;

        const showEmptyMessage =
            !loaders.details &&
            (_.isEmpty(shift?.sessions) || _.isEmpty(session));
        const hasSessions = !!(shift?.sessions || []).length;
        return (
            <Modal
                visible={this.props.visible}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
                onCancel={this.props.onCancel}
                footer={null}
                wrapClassName={"session-modal"}
            >
                <SessionLeftSide
                    shift={shift}
                    loading={loaders.details}
                    activeSessionId={session?.id}
                    onClickSession={this.onClickSession}
                    onLeaveShift={this.onLeaveShift}
                />
                <LoadingSpinner
                    spinning={loaders.details}
                    dimensions={`large`}
                />
                {!_.isEmpty(session) && (
                    <div className="modal-right-outer">
                        <div className="modal-right-head">
                            <h3>{profile.name}</h3>
                            <p>Sophomore, {profile.school?.name} </p>
                        </div>
                        <div className="chat-navigation">
                            <Tabs
                                defaultActiveKey="profile"
                                onChange={this.changeTab}
                            >
                                <TabPane tab="Profile" key="profile">
                                    <SessionProfile profile={profile} />
                                </TabPane>
                                <TabPane tab="Notes" key="notes">
                                    <SessionNotes
                                        ref={this.sessionNotesRef}
                                        onSave={this.onSaveSessionNotes}
                                        pastNotes={pastNotes}
                                        notes={notes}
                                        loaders={sessionLoaders}
                                        config={notesConfig}
                                        session={session}
                                        isPastNotes={true}
                                        isScheduleFrom={true}
                                        showPastNotes={(val) =>
                                            this.showPastNotes(val)
                                        }
                                    />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                )}
                {confirmLeaveShift && (
                    <AlertModal
                        buttonText={"Leave Shift"}
                        onClick={this.onLeaveShiftConfirmed}
                        onCancel={this.onCancelLeaveShift}
                        loading={loaders.leaveShift}
                        alertType={"confirm"}
                        text={
                            "Are you sure you want to leave this shift? You have active student sessions and these" +
                            " will be cancelled/rescheduled."
                        }
                    />
                )}
                {showEmptyMessage && (
                    <div className="modal-right-outer">
                        <div className="no-session">
                            {hasSessions
                                ? "No session selected"
                                : "No sessions scheduled"}
                        </div>
                    </div>
                )}
            </Modal>
        );
    }
}

/**
 * @typedef SessionModelProps
 * @name SessionModalUnconnected.props
 * @property {ScheduleStateLoaders} loaders
 * @property {SessionNotes[]} notes
 * @property {Gender[]} gender
 * @property {NotesConfig[]} notesConfig
 * @property {CounselorShiftDetails} shift
 * @property {SessionStateLoaders} sessionLoaders
 */

/**
 *
 * @param {RootState} state
 * @return {SessionModelProps}
 */
const mapStateToProps = (state) => {
    const { shift, loaders } = state.schedule;
    const { notes, pastNotes, loaders: sessionLoaders } = state.session;
    const { gender, notesConfig } = state.app;
    return {
        shift: shift || {},
        loaders,
        gender,
        notesConfig,
        notes,
        pastNotes,
        sessionLoaders,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ ...sessionActions, ...scheduleActions }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionModalUnconnected);
