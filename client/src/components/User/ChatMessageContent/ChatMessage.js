import React, { useState, useEffect } from "react";
import { Input, Button, List, Avatar, Typography } from "antd";
import Stomp from "stompjs";
import "./ChatMessage.scss";
import { initWebSocketChatMessage } from "../../../service/APIService";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";

const { TextArea } = Input;

const ChatMessage = () => {
  const user = useSelector((state) => state.userRedux.user);

  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [nickname, setNickname] = useState(user.fullName);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = initWebSocketChatMessage();
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe("/topic/messages", (message) => {
        const receivedMessage = JSON.parse(message.body);
        setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    });

    setStompClient(client);

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, []);

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const sendMessage = () => {
    if (currentMessage.trim() && stompClient && stompClient.connected) {
      const chatMessage = {
        nickname,
        content: currentMessage,
        timestamp: new Date().toISOString(),
      };

      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      setCurrentMessage("");
    }
  };

  return (
    <div className="chat-container">
      <List
        className="chat-list"
        dataSource={chatMessages}
        renderItem={(msg) => (
          <List.Item key={msg.nickname + msg.timestamp}>
            <div className="input-content-message">
              <div className="message-header">
                <img className="message-avatar" src={user.avt} alt="avt" />
                <div className="message-info">
                  <span className="message-nickname">{nickname}</span>
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
              </div>
              <div className="message-content">
                <p>{msg.content}</p>
              </div>
            </div>
          </List.Item>
        )}
      />

      <div className="chat-input-container">
        <TextArea
          placeholder="Nhập tin nhắn..."
          value={currentMessage}
          onChange={handleMessageChange}
          autoSize={{ minRows: 1, maxRows: 3 }}
          className="message-input"
        />
        <Button
          className="btn-send"
          type="primary"
          onClick={sendMessage}
          disabled={!currentMessage.trim()}
        >
          <FiSend />
        </Button>
      </div>
    </div>
  );
};

export default ChatMessage;
