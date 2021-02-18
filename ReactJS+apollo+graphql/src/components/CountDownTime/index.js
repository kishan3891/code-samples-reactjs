import React from "react";
import * as moment from "moment";
import Timer from "react-compound-timer";
import { CONSTANT } from "Constants";
import AlertModal from "../Modals/AlertModal";

const formatValue = (value) => (value < 10 ? `0${value}` : value);

class CountDownTime extends React.Component {
    constructor(props) {
        super(props);
        this.timerRef = React.createRef();
        this._checkpoints = [
            {
                time: 60000 * CONSTANT.SESSION_FIRST_WARN,
                callback: () => this.warningNotify(5),
            },
            {
                time: 60000 * CONSTANT.SESSION_LAST_WARN,
                callback: () => this.warningNotify(1),
            },
            {
                time: 60000 * CONSTANT.SESSION_TIME,
                callback: () => this.completedNotify(),
            },
            {
                time: 60000 * CONSTANT.SESSION_RESET_TIME,
                callback: () => this.resetTimer(),
            },
        ];
        this.state = {
            confirmEndSession: false,
            resetTimer: false,
        };
    }

    resetTimer = () => {
        this.setState((prevState) => ({
            resetTimer: !prevState.resetTimer,
        }));
    };

    warningNotify = (minutes) => {
        this.props.onWarning(this.props.session, minutes);
    };
    completedNotify = () => {
        this.props.onCompleted(this.props.session);
    };
    onEndSession = () => {
        return this.setState({ confirmEndSession: true });
    };
    onCancelEndSession = () => {
        return this.setState({ confirmEndSession: false });
    };
    onEndSessionConfirmed = () => {
        this.props.onEndSession(this.props.session);
        return this.setState({ confirmEndSession: false });
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { session } = this.props;
        if (session && prevProps.session?.id !== session.id) {
            this.updateInitialTime();
        }
    }
    updateInitialTime() {
        if (!this.timerRef.current) {
            return;
        }
        const { session } = this.props;
        const start = moment(session.start_date);
        const initialTime = moment().diff(session.start_date);
        const now = moment();
        const checkpoint = this._checkpoints.reduce((acc, current) => {
            console.log({
                c: start
                    .clone()
                    .add(current.time / 60000, "minutes")
                    .format(),
                n: now.format(),
            });
            return now >= start.clone().add(current.time / 60000, "minutes")
                ? current
                : acc;
        }, null);
        this.timerRef.current.setTime(initialTime);
        if (checkpoint) {
            checkpoint.callback();
        }
    }

    render() {
        const { session } = this.props;

        if (!session?.start_date || session?.end_date) {
            return null;
        }
        const now = moment();
        const sessionStart = moment(session.start_date);

        const initialTime = now - sessionStart;
        const duration = moment.duration(now.diff(sessionStart));
        const { confirmEndSession } = this.state;
        console.log(
            sessionStart.format(),
            now.format(),
            initialTime,
            now.diff(sessionStart)
        );
        return (
            <>
                <Timer
                    ref={this.timerRef}
                    initialTime={initialTime}
                    checkpoints={this._checkpoints}
                >
                    {() => (
                        <React.Fragment>
                            <span>
                                <em
                                    className={
                                        duration.asHours() <= 1
                                            ? "remove-hours"
                                            : ""
                                    }
                                >
                                    {duration.asHours() >= 1 && (
                                        <>
                                            <Timer.Hours
                                                formatValue={formatValue}
                                            />
                                            :
                                        </>
                                    )}
                                    <Timer.Minutes formatValue={formatValue} />:
                                    <Timer.Seconds formatValue={formatValue} />
                                </em>
                                <font>
                                    <button
                                        onClick={this.onEndSession}
                                        className="endSessionbtn"
                                    >
                                        End Session
                                    </button>{" "}
                                </font>
                            </span>
                        </React.Fragment>
                    )}
                </Timer>
                {confirmEndSession && (
                    <AlertModal
                        buttonText={"End Session"}
                        onClick={this.onEndSessionConfirmed}
                        onCancel={this.onCancelEndSession}
                        alertType={"confirm"}
                        text={"Are you sure you want to end this session ?"}
                    />
                )}
            </>
        );
    }
}

export default CountDownTime;
CountDownTime.defaultProps = {
    onEndSession: (session) => {},
    onCompleted: (session) => {},
    onWarning: (session, minutes) => {},
};
