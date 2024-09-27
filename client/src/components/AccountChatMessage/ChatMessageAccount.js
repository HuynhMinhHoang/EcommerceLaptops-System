import React, { useEffect, useState } from "react";
import "./ChatMessageAccount.scss";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ListUserChatMessage from "./ListUserChatMessage";

const ChatMessageAccount = ({ toast }) => {
  const user = useSelector((state) => state.userRedux.user);
  const dispatch = useDispatch();
  const [receiverIdUser, setReceiverIdUser] = useState({
    userId: null,
    name: "",
    avt: "",
  });
  const [latestMessages, setLatestMessages] = useState({});

  return (
    <div className={user.role === "ADMIN" ? "admin-message-container" : ""}>
      <div
        className={
          user.role === "ADMIN"
            ? "message-profile admin-message"
            : "message-profile"
        }
      >
        <div className="bg-chat-message">
          <div className="list-user-message">
            <ListUserChatMessage
              setReceiverIdUser={setReceiverIdUser}
              latestMessages={latestMessages}
            />
          </div>

          <div className="content-message">
            <ChatMessage
              receiverIdUser={receiverIdUser}
              setLatestMessages={setLatestMessages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageAccount;
