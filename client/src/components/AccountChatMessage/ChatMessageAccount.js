import React, { useEffect, useState } from "react";
import "./ChatMessageAccount.scss";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ListUserChatMessage from "./ListUserChatMessage";

const ChatMessageAccount = ({ toast }) => {
  const user = useSelector((state) => state.userRedux.user);
  const dispatch = useDispatch();
  const [receiverIdUser, setReceiverIdUser] = useState(null);

  return (
    <div className="message-profile">
      <div className="bg-heading">
        <h3>Trò chuyện</h3>
      </div>

      <div className="bg-chat-message">
        <div className="list-user-message">
          <ListUserChatMessage setReceiverIdUser={setReceiverIdUser} />
        </div>

        <div className="content-message">
          <ChatMessage receiverIdUser={receiverIdUser} />
        </div>
      </div>
    </div>
  );
};

export default ChatMessageAccount;
