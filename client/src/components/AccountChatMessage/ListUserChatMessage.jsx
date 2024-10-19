import React, { useEffect, useState } from "react";
import { getListAccountByRole } from "../../service/APIService";
import "./ListUserChatMessage.scss";
import { useSelector } from "react-redux";
import { ref, onValue, database } from "../../firebase/configFireBase";
import { FcAssistant } from "react-icons/fc";

const ListUserChatMessage = ({ setReceiverIdUser, receiverIdUser }) => {
  const userRedux = useSelector((state) => state.userRedux.user);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [latestMessages, setLatestMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const role = userRedux.role === "USER" ? "ADMIN" : "USER";

  const getListUser = async () => {
    let res = await getListAccountByRole(role);
    setUsers(res.data);
  };

  useEffect(() => {
    getListUser();
  }, [role]);

  const getLatestMessages = () => {
    const messagesRef = ref(database, "messsage");
    onValue(messagesRef, (data) => {
      let messages = {};
      data.forEach((d) => {
        const msg = d.val();
        if (
          msg.idAccount === userRedux.idAccount ||
          msg.receiverId === userRedux.idAccount
        ) {
          const otherUserId =
            msg.idAccount === userRedux.idAccount
              ? msg.receiverId
              : msg.idAccount;

          const messageTimestamp = new Date(msg.timestamp);
          const currentTime = new Date();
          const timeDifference = (currentTime - messageTimestamp) / 1000;

          if (
            !messages[otherUserId] ||
            messageTimestamp > new Date(messages[otherUserId].timestamp)
          ) {
            messages[otherUserId] = {
              ...msg,
              isNew:
                timeDifference <= 2 && msg.idAccount !== userRedux.idAccount,
            };
            if (timeDifference <= 2 && msg.idAccount !== userRedux.idAccount) {
              setTimeout(() => {
                setLatestMessages((prevMessages) => {
                  const updatedMessages = { ...prevMessages };
                  if (updatedMessages[otherUserId]) {
                    updatedMessages[otherUserId].isNew = false;
                  }
                  return updatedMessages;
                });
              }, 2000);
            }
          }
        }
      });
      setLatestMessages(messages);
    });
  };

  useEffect(() => {
    getLatestMessages();
  }, []);

  const handleUserClick = (userId, name, avt) => {
    setSelectedUserId(userId);
    setReceiverIdUser({ userId, name, avt });

    setLatestMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      if (updatedMessages[userId]) {
        updatedMessages[userId].isNew = false;
      }
      return updatedMessages;
    });
  };

  const filteredUsers = users
    .filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aMessage = latestMessages[a.idAccount];
      const bMessage = latestMessages[b.idAccount];
      if (!aMessage && !bMessage) return 0;
      if (!aMessage) return 1;
      if (!bMessage) return -1;
      return new Date(bMessage.timestamp) - new Date(aMessage.timestamp);
    });

  return (
    <>
      <div className="bar-search-mess">
        {userRedux.role === "ADMIN" ? (
          <div className="title">Manage Chats</div>
        ) : (
          <h3>CSKH (GEARVN)</h3>
        )}

        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="chat-list">
        {filteredUsers.map((user) => (
          <div
            key={user.idAccount}
            className={`chat-item ${
              selectedUserId === user.idAccount ? "selected" : ""
            } ${latestMessages[user.idAccount]?.isNew ? "new-message" : ""}`}
            onClick={() =>
              handleUserClick(user.idAccount, user.fullName, user.avt)
            }
          >
            <span className="dot-new-message"></span>
            <img src={user.avt} alt={user.fullName} className="avatar" />
            <div className="chat-info">
              <div className="chat-name">
                {user.fullName}
                {userRedux.role === "USER" && (
                  <FcAssistant
                    style={{
                      marginBottom: "3px",
                      marginLeft: "5px",
                      fontSize: "20px",
                    }}
                  />
                )}
              </div>
              <div className="chat-message">
                {latestMessages[user.idAccount]
                  ? latestMessages[user.idAccount].content
                  : "Chưa có tin nhắn"}
              </div>
            </div>
            <div className="chat-time">
              {latestMessages[user.idAccount]
                ? new Date(
                    latestMessages[user.idAccount].timestamp
                  ).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : ""}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListUserChatMessage;
