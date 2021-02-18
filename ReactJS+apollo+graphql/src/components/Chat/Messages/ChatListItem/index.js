import React from "react";
import { timestampFromNow } from "Utils/utils";

const ChatListItem = ({ item }) => {
    return (
        <React.Fragment>
            <figure>
                {item?.unread_message_count > 0 && (
                    <em className="purple-noty"></em>
                )}
                <img src={item?.members[1].profileUrl}></img>
            </figure>
            <span>
                <b>{item?.members[1].nickname}</b>{" "}
                <div
                    className="item-time"
                    data-origin={item.lastMessage?.createdAt}
                >
                    {timestampFromNow(item.lastMessage?.createdAt)}
                </div>
                {item.isTyping == true && <small>Typing...</small>}
                {item.isTyping != true && (
                    <small>
                        {item.lastMessage?.message
                            ? item.lastMessage.message
                            : "Session started"}
                    </small>
                )}
            </span>
        </React.Fragment>
    );
};

export default ChatListItem;
