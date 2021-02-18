import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import SendBirdSyncManager from "sendbird-syncmanager";
import * as moment from "moment";
import { CONSTANT } from "../../../constants";
import * as _ from "lodash";
import { logger } from "../../../helpers";
import "./style.scss";

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textMessage: {},
            messages: props.messages || [],
        };
        this.scrollBarRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.messages !== this.props.messages) {
            this.setState({ messages: nextProps.messages }, () => {
                this.scrollToBottom();
            });
        }
        // if(nextProps.isTypingChannle){
        //   this.scrollToBottom()
        // }
    }

    isCurrentUser = (user) => {
        const manager = SendBirdSyncManager.getInstance();
        return user.userId === manager.currentUserId;
    };

    onKeyPress = (e) => {
        if (e.charCode === 13 && !e.ctrlKey) {
            e.preventDefault();
            this.onSendMessage();
            return;
        }
        const { textMessage } = this.state;
        const { channel } = this.props;
        if (!channel) {
            return;
        }

        if (_.isEmpty(textMessage[channel.url])) {
            channel.endTyping();
            logger.debug("endTyping...");
        } else {
            channel.startTyping();
            logger.debug("startTyping....");
        }
    };

    onSendMessage = () => {
        const { channel } = this.props;
        const { textMessage, messages } = this.state;

        const message = textMessage[channel.url];

        if (!message) {
            return;
        }

        const newMessage = this.props.onSendMessage(
            channel,
            message,
            (message) => {
                this.setState({
                    messages: this.state.messages.map((m) => {
                        return m.reqId === message.reqId ? message : m;
                    }),
                });
            }
        );
        this.setState(
            (prevState) => ({
                textMessage: {
                    ...prevState.textMessage,
                    [channel.url]: "",
                },
                messages: [...messages, newMessage],
            }),
            () => {
                this.scrollToBottom();
            }
        );
        channel.endTyping();
    };

    scrollToBottom = () => {
        this.scrollBarRef.current.scrollToBottom();
    };
    getTextMessage() {
        const { channel } = this.props;
        return this.state.textMessage[channel.url];
    }
    restoreTextMessage(msg) {
        const { channel } = this.props;

        this.setState((prevState) => ({
            textMessage: {
                ...prevState.textMessage,
                [channel.url]: msg,
            },
        }));
    }

    handleChange = (event) => {
        const { channel } = this.props;
        const { value } = event.target;
        this.setState((prevState) => ({
            textMessage: {
                ...prevState.textMessage,
                [channel.url]: value,
            },
        }));
    };
    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        const { messages } = this.state;
        const { session, channel } = this.props;
        const disabled = this.props.disabled || !session || session.end_date;

        const messagesList = messages
            .filter((m) => !!m.sender)
            .map((message) => {
                let statusMessage = "";
                const isCurrentUser = this.isCurrentUser(message.sender);
                if (message.sendingStatus === "pending") {
                    statusMessage = "Sending...";
                } else if (message.sendingStatus === "failed") {
                    statusMessage = "Failed";
                } else {
                    let before = "Delivered";

                    if (!isCurrentUser) {
                        const student = session.student;
                        before = student.nickname || student.name;
                    } else if (!channel.getReadReceipt(message)) {
                        before = "Read";
                    }
                    statusMessage = `${before} • ${moment(
                        message.createdAt
                    ).format("h:mma")}`;
                }

                return (
                    <li
                        key={message.messageId}
                        id={message.messageId}
                        className={
                            isCurrentUser
                                ? "sender chat-message"
                                : "receiver chat-message"
                        }
                    >
                        <font>
                            <div className="message-content">
                                {message.message}
                            </div>
                            <div className="time">{statusMessage}</div>
                        </font>
                    </li>
                );
            });

        const typingElement = (
            <li className="typing">
                <div className="wave">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                </div>
            </li>
        );

        return (
            <div className="chat-main">
                <Scrollbars
                    className="custom-scrollbars"
                    ref={this.scrollBarRef}
                >
                    <div className="remind-day">Today</div>
                    <ul className="clearfix chat-body">
                        {messagesList}
                        {session?.isTyping && typingElement}
                    </ul>
                    {session?.end_date && (
                        <div className="session-ended">
                            <p className="text-center">
                                Your session with{" "}
                                {session.student.nickname ||
                                    session.student.name}{" "}
                                has ended <br />{" "}
                                {moment(session.end_date).format(
                                    CONSTANT.INPUT_DATE_FORMAT
                                )}
                            </p>
                        </div>
                    )}
                </Scrollbars>

                <div className="send-message">
                    <div className="text-msg">
                        <textarea
                            disabled={disabled}
                            onKeyPress={this.onKeyPress}
                            onChange={this.handleChange}
                            value={this.state.textMessage[channel?.url] || ""}
                            placeholder={`Message ${
                                session.student.name || session.student.nickname
                            }`}
                        />
                    </div>
                    <button
                        disabled={disabled}
                        onClick={this.onSendMessage}
                        type="submit"
                        className="white-btn"
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    }
}

export default Messages;
Messages.defaultProps = {
    messages: [],
};
