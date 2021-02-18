import React from "react";
import Timer from "react-compound-timer";
import moment from "moment";
import "./style.scss";

const formatValue = (value) => (value < 10 ? `0${value}` : value);
const CountdownTimer = ({ end, timerRef, text }) => {
    const duration = moment.duration(moment().diff(end));
    const initialTime = moment(end).valueOf() - moment().valueOf();
    return (
        <Timer ref={timerRef} initialTime={initialTime} direction="backward">
            {() => (
                <React.Fragment>
                    <span>
                        <em
                            className={
                                duration.asHours() >= -1 ? "hours-timer" : ""
                            }
                        >
                            {duration.asHours() <= -1 && (
                                <>
                                    <Timer.Hours formatValue={formatValue} />:
                                </>
                            )}
                            <Timer.Minutes formatValue={formatValue} />:
                            <Timer.Seconds formatValue={formatValue} />{" "}
                        </em>
                        <strong>{text}</strong>
                    </span>
                </React.Fragment>
            )}
        </Timer>
    );
};
class NotificationAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNotify: this.props.isNotification,
        };
        this.timerRef = React.createRef();
    }

    notificationClose = () => {
        this.props.handleClose(false);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { countdown: prevCountdown } = prevProps;
        const { countdown } = this.props;
        console.log({
            countdown,
            prevCountdown,
        });
        if (this.timerRef.current && countdown && countdown !== prevCountdown) {
            // set the initial time as the component wont update if it doesn't re-initalize itself

            this.timerRef.current.setTime(
                moment(countdown.end).valueOf() - moment().valueOf()
            );
        }
    }

    render() {
        if (!this.props.isNotification) {
            return null;
        }
        const {
            countdown,
            className,
            title,
            subTitle,
            isClose,
            button,
            onActionButtonClicked,
        } = this.props;
        return (
            <React.Fragment>
                <div
                    className={
                        "notification-text " + (className ? className : "")
                    }
                >
                    <div className="notification-header">
                        {title && (
                            <p className="notification-title">{title} </p>
                        )}
                        {subTitle && (
                            <p className="notification-sub-title">{subTitle}</p>
                        )}
                    </div>

                    {isClose && (
                        <div className="notification-close">
                            <button
                                onClick={() => this.notificationClose(true)}
                                type="button"
                                className="close"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )}
                    {button && (
                        <div className="notification-button">
                            <button
                                type="button"
                                className="white-btn "
                                onClick={() => onActionButtonClicked()}
                            >
                                {button}
                            </button>
                        </div>
                    )}
                    {countdown && (
                        <div className="notification-countdown">
                            <CountdownTimer
                                timerRef={this.timerRef}
                                end={countdown.end}
                                text={countdown.text}
                            />
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default NotificationAlert;
NotificationAlert.defaultProps = {
    onActionButtonClicked: () => ({}),
};
