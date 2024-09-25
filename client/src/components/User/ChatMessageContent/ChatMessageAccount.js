import React, { useEffect, useState } from "react";
import "./ChatMessageAccount.scss";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";

const ChatMessageAccount = ({ toast }) => {
  const user = useSelector((state) => state.userRedux.user);
  const dispatch = useDispatch();

  return (
    <div className="message-profile">
      <div className="bg-heading">
        <h3>Trò chuyện</h3>

        {/* <div> */}
        <ChatMessage />
        {/* </div> */}
      </div>
    </div>
  );
};

export default ChatMessageAccount;
