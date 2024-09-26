import React, { useEffect, useState } from "react";
import { getListAccountByRole } from "../../service/APIService";
import "./ListUserChatMessage.scss";
import { useSelector } from "react-redux";

const ListUserChatMessage = ({ setReceiverIdUser }) => {
  const user = useSelector((state) => state.userRedux.user);

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const role = user.role === "USER" ? "ADMIN" : "USER";

  const getListUser = async () => {
    let res = await getListAccountByRole(role);
    console.log("role", role);
    console.log("res", res.data);
    setUsers(res.data);
  };

  useEffect(() => {
    getListUser();
  }, [role]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setReceiverIdUser(userId);
  };

  return (
    <div className="chat-list">
      {users.map((user) => (
        <div
          key={user.idAccount}
          className={`chat-item ${
            selectedUserId === user.idAccount ? "selected" : ""
          }`}
          onClick={() => handleUserClick(user.idAccount)}
        >
          <img src={user.avt} alt={user.fullName} className="avatar" />
          <div className="chat-info">
            <div className="chat-name">{user.fullName}</div>
            {/* <div className="chat-message">{user.email}</div> */}
          </div>
          <div className="chat-time">03:41 PM</div>
        </div>
      ))}
    </div>
  );
};

export default ListUserChatMessage;
