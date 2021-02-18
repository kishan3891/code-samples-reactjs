import React from "react";
import { timestampFromNow } from "Utils/utils";
import find from "lodash/find";
import { trimNameForChatList } from "../../../../helpers";

const MAX_MESSAGE_LENGTH = 30;
/**
 *
 * @param {CounslrSession | {isTyping:boolean}} session
 * @param channel

 * @return {*}
 * @constructor
 */
const ChatListItem = ({ session, channel }) => {
    // removeUnreadClass();
    const { student } = session;

    let dotClassName = "";
    if (session.end_date) {
        dotClassName = "ended";
    } else if (!channel?.lastMessage && !session.start_date) {
        dotClassName = "started";
    }
    let status = "Send first message to start.";
    let timestamp = "Just Now";
    if (channel?.isTyping()) {
        status = "Typing...";
    } else if (session.end_date) {
        timestamp = timestampFromNow(session.end_date);
        status = "Session ended. Submit notes";
    } else if (channel?.lastMessage) {
        // } else if (typeof channel.lastMessage !== 'undefined') {

        timestamp = timestampFromNow(channel.lastMessage.createdAt);
        status = channel.lastMessage.message;
        if (status.length > MAX_MESSAGE_LENGTH) {
            status = status.substr(0, MAX_MESSAGE_LENGTH) + "...";
        } else {
            //
        }
        const readStatus = channel.getReadStatus(true);
        const selfReadStatus = find(readStatus, (_, id) => id !== student.id);
        if (
            selfReadStatus?.last_seen_at < channel.lastMessage.createdAt &&
            channel.unreadMessageCount > 0
        ) {
            dotClassName = "new-message";
            // addUnreadClass();
        } else {
            //
        }
    } else if (session.start_date) {
        status = "Session started";
    } else {
        //
    }

    return (
        <React.Fragment>
            <figure>
                <em className={`session-status-dot ${dotClassName}`} />
                <img
                    src={(student && student.avatarUrl) || ""}
                    alt={student?.name}
                />
            </figure>
            <span className="session-status">
                <b>{trimNameForChatList(student?.nickname || student?.name)}</b>{" "}
                <div className="item-time">{timestamp}</div>
                <small>{status}</small>
            </span>
        </React.Fragment>
    );
};

export default ChatListItem;
