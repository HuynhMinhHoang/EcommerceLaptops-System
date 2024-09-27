import React, { useEffect, useState } from "react";
import { getListAccountByRole } from "../../service/APIService";
import "./ListUserChatMessage.scss";
import { useSelector } from "react-redux";
import { ref, onValue, database } from "../../firebase/configFireBase";

const ListUserChatMessage = ({ setReceiverIdUser }) => {
  const user = useSelector((state) => state.userRedux.user);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [latestMessages, setLatestMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const role = user.role === "USER" ? "ADMIN" : "USER";

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
          msg.idAccount === user.idAccount ||
          msg.receiverId === user.idAccount
        ) {
          const otherUserId =
            msg.idAccount === user.idAccount ? msg.receiverId : msg.idAccount;

          if (
            !messages[otherUserId] ||
            new Date(msg.timestamp) > new Date(messages[otherUserId].timestamp)
          ) {
            messages[otherUserId] = msg;
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
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bar-search-mess">
        <h3>CSKH (GEARVN)</h3>
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
            }`}
            onClick={() =>
              handleUserClick(user.idAccount, user.fullName, user.avt)
            }
          >
            <img src={user.avt} alt={user.fullName} className="avatar" />
            <div className="chat-info">
              <div className="chat-name">{user.fullName}</div>
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
