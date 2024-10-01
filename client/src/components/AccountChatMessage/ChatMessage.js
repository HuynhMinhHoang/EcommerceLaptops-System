import React, { useState, useEffect, useRef } from "react";
import { Input, List, Avatar, Typography } from "antd";
import "./ChatMessage.scss";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import { ref, push, onValue, database } from "../../firebase/configFireBase";
import { FcAssistant } from "react-icons/fc";
import { Button } from "@mui/material";

const { TextArea } = Input;

const ChatMessage = ({ receiverIdUser, setlatestMessages }) => {
  const user = useSelector((state) => state.userRedux.user);
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

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
      receiverRole: user.role,
      avt: user.avt,
      nickname: user.fullName,
      content: currentMessage,
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
        <p>
          {receiverIdUser.name}
          {user.role === "USER" && (
            <FcAssistant
              style={{
                marginBottom: "3px",
                marginLeft: "5px",
                fontSize: "20px",
              }}
            />
          )}
        </p>
      </div>
      <div className="chat-container">
        <List
          className="chat-list"
          dataSource={chatMessages}
          renderItem={(msg, index) => (
            <List.Item key={index} onClick={scrollToBottom}>
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
                        <span className="message-nickname">
                          {msg.nickname}
                          {user.role === "USER" && (
                            <FcAssistant
                              style={{
                                marginBottom: "3px",
                                marginLeft: "5px",
                                fontSize: "20px",
                              }}
                            />
                          )}
                        </span>
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
                <div className="message-content" ref={messagesEndRef}>
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
            variant="contained"
            className="btn-send"
            type="primary"
            onClick={handleSendMessage}
            disabled={!currentMessage.trim()}
            style={{ backgroundColor: "#e30019", color: "#fff" }}
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
