import React, { useState } from "react";
import "./AccountProfile.scss";
import { Calendar } from "primereact/calendar";
import { useSelector } from "react-redux";

const AccountProfile = () => {
  const user = useSelector((state) => state.userRedux.user);
  console.log("user", user);

  const [fullName, setFullName] = useState(user.fullName || "");
  const [gender, setGender] = useState(user.gender || "");
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || null);
  const [email, setEmail] = useState(user.email || "");
  const [address, setAddress] = useState(user.address || "");
  const [phone, setPhone] = useState(user.phone || "");

  const convertToDateObject = (dateStr) => {
    return dateStr ? new Date(dateStr) : null;
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="account-profile">
      <div className="bg-heading">
        <h3>Thông tin tài khoản</h3>
      </div>
      <div className="bg-input-info">
        <div className="input-group-container">
          <label>Họ Tên</label>
          <div className="input-form">
            <input
              type="text"
              defaultValue={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
        <div className="input-group-container">
          <label>Giới tính</label>
          <div className="input-form">
            <input
              id="male"
              type="radio"
              name="gender"
              value="MALE"
              checked={gender === "MALE"}
              onChange={handleGenderChange}
            />
            <label className="sex" htmlFor="male">
              Nam
            </label>
            <input
              id="female"
              type="radio"
              name="gender"
              value="FEMALE"
              checked={gender === "FEMALE"}
              onChange={handleGenderChange}
            />
            <label className="sex" htmlFor="female">
              Nữ
            </label>
          </div>
        </div>
        <div className="input-group-container">
          <label>Số điện thoại</label>
          <div className="input-form">
            <input
              type="text"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="input-group-container">
          <label>Email</label>
          <div className="input-form">
            <input
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="input-group-container">
          <label>Ngày sinh</label>
          <div className="input-form">
            <Calendar
              className="calendar"
              inputId="dateOfBirth"
              value={convertToDateObject(dateOfBirth)}
              onChange={(e) => setDateOfBirth(e.value)}
              dateFormat="dd/mm/yy"
            />
          </div>
        </div>

        <div className="bg-btn-form input-group-container">
          <label></label>
          <div className="input-form">
            <button className="btn">LƯU THAY ĐỔI</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
