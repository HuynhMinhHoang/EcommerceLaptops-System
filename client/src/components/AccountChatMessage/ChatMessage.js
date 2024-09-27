import React, { useState, useEffect } from "react";
import { Input, Button, List, Avatar, Typography } from "antd";
import "./ChatMessage.scss";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import { ref, push, onValue, database } from "../../firebase/configFireBase";

const { TextArea } = Input;

const ChatMessage = ({ receiverIdUser, setLatestMessages }) => {
  const user = useSelector((state) => state.userRedux.user);
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey && currentMessage.trim()) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (receiverIdUser.userId) {
      const messagesRef = ref(database, "messsage");
      onValue(messagesRef, (data) => {
        let getMsg = [];
        data.forEach((d) => {
          const msg = d.val();
          if (
            (msg.idAccount === user.idAccount &&
              msg.receiverId === receiverIdUser.userId) ||
            (msg.receiverId === user.idAccount &&
              msg.idAccount === receiverIdUser.userId)
          ) {
            getMsg.push(msg);
          }
        });
        setChatMessages(getMsg);
      });
    }
  }, [receiverIdUser.userId]);

  const handleSendMessage = () => {
    push(ref(database, "messsage"), {
      idAccount: user.idAccount,
      receiverId: receiverIdUser.userId,
      avt: user.avt,
      nickname: user.fullName,
      content: currentMessage,
      role: user.role,
      timestamp: new Date().toISOString(),
    });
    setCurrentMessage("");
  };

  return (
    <>
      <div
        className={
          !receiverIdUser || !receiverIdUser.userId ? "if-bar-none" : "bar-info"
        }
      >
        <img src={receiverIdUser.avt} alt="avt" />
        <p>{receiverIdUser.name}</p>
      </div>
      <div className="chat-container">
        <List
          className="chat-list"
          dataSource={chatMessages}
          renderItem={(msg, index) => (
            <List.Item key={index}>
              <div
                className={
                  msg.idAccount === user.idAccount
                    ? "input-content-message-current"
                    : "input-content-message"
                }
              >
                <div className="message-header">
                  {msg.idAccount !== user.idAccount ? (
                    <>
                      <img className="message-avatar" src={msg.avt} alt="avt" />
                      <div className="message-info">
                        <span className="message-nickname">{msg.nickname}</span>
                        <span className="message-time">
                          {new Date(msg.timestamp).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                          <TiTick
                            style={{
                              fontSize: "17px",
                              color: "#00bcd4",
                              marginLeft: "4px",
                            }}
                          />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="message-time">
                        {new Date(msg.timestamp).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                        <TiTick
                          style={{
                            fontSize: "17px",
                            color: "#00bcd4",
                            marginLeft: "4px",
                          }}
                        />
                      </span>
                    </>
                  )}
                </div>
                <div className="message-content">
                  <p>{msg.content}</p>
                </div>
              </div>
            </List.Item>
          )}
        />

        <div
          className={
            !receiverIdUser || !receiverIdUser.userId
              ? "if-bar-none"
              : "chat-input-container"
          }
        >
          <TextArea
            placeholder="Nhập tin nhắn..."
            value={currentMessage}
            onChange={handleMessageChange}
            onKeyDown={handleKeyPress}
            autoSize={{ minRows: 1, maxRows: 3 }}
            className="message-input"
          />
          <Button
            className="btn-send"
            type="primary"
            onClick={handleSendMessage}
            disabled={!currentMessage.trim()}
          >
            <FiSend
              style={{
                fontSize: "18px",
              }}
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
