import React, { useEffect, useState } from "react";
import "./AccountProfile.scss";
import { Calendar } from "primereact/calendar";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountByUser } from "../../../service/APIService";
import { updateProfileUser } from "../../../redux/action/userAction";
import Swal from "sweetalert2/dist/sweetalert2.js";

const AccountProfile = ({ toast }) => {
  const user = useSelector((state) => state.userRedux.user);
  const dispatch = useDispatch();

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

  const handleUpdateProfile = async () => {
    const formattedDateOfBirth = dateOfBirth
      ? dateOfBirth instanceof Date
        ? dateOfBirth.toISOString().split("T")[0]
        : ""
      : dateOfBirth;
    setDateOfBirth(formattedDateOfBirth);

    const updateData = {
      fullName,
      gender,
      dateOfBirth,
      address,
    };

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("gender", gender);
    formData.append("dateOfBirth", formattedDateOfBirth);
    formData.append("address", address);

    try {
      let res = await updateAccountByUser(user.idAccount, formData);
      if (res && res.data && res.data.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Cập nhật thông tin thành công!",
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Cập nhật thông tin thất bại!",
        });
      }
      dispatch(updateProfileUser(updateData));
    } catch (error) {
      console.error("Update error", error);
    }
  };

  const showAlertUpdate = () => {
    if (!fullName) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Họ tên không được để trống!",
      });
      return;
    }
    if (!dateOfBirth) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Ngày sinh không được để trống!",
      });
      return;
    }
    if (!address) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Địa chỉ không được để trống!",
      });
      return;
    }

    Swal.fire({
      title: "Xác nhận thay đổi thông tin!",
      showDenyButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: "warning",
      confirmButtonText: "Confirm",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval;

        Swal.fire({
          title: "Đang thực hiện cập nhật...",
          timer: 2500,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {}, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          handleUpdateProfile();
        });
      } else if (result.isDismissed) {
        toast.current.show({
          severity: "info",
          summary: "Notification",
          detail: "Hành động cập nhật đã bị hủy!",
        });
      }
    });
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
              disabled={true}
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
              disabled={true}
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
        <div className="input-group-container">
          <label>Địa chỉ giao hàng</label>
          <div className="input-form">
            <input
              type="text"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-btn-form input-group-container">
          <label></label>
          <div className="input-form">
            <button onClick={showAlertUpdate} className="btn">
              LƯU THAY ĐỔI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
