import React, { useEffect, useState } from "react";
import "./AccountProfile.scss";
import { Calendar } from "primereact/calendar";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountByUser } from "../../../service/APIService";
import { updateProfileUser } from "../../../redux/action/userAction";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Button } from "@mui/material";
import axios from "axios";

const AccountProfile = ({ toast }) => {
  const user = useSelector((state) => state.userRedux.user);
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(user.fullName || "");
  const [gender, setGender] = useState(user.gender || null);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || null);
  const [email, setEmail] = useState(user.email || "");
  const [address, setAddress] = useState(user.address || "");
  const [phone, setPhone] = useState(user.phone || "");

  //address
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api/p/"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`
          );
          setDistricts(response.data.districts);
          setWards([]);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };
      fetchDistricts();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`
          );
          setWards(response.data.wards);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      };
      fetchWards();
    }
  }, [selectedDistrict]);

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
        : dateOfBirth
      : dateOfBirth;

    if (
      fullName === user.fullName &&
      gender === user.gender &&
      formattedDateOfBirth === user.dateOfBirth &&
      address === user.address &&
      selectedProvince === user.province &&
      selectedDistrict === user.district &&
      selectedWard === user.ward
    ) {
      toast.current.show({
        severity: "info",
        summary: "Notification",
        detail: "Không có thay đổi nào được thực hiện!",
      });
      return;
    }

    const selectedWardName = wards.find(
      (ward) => ward.code.toString() === selectedWard.toString()
    );
    const selectedDistrictName = districts.find(
      (district) => district.code.toString() === selectedDistrict.toString()
    );
    const selectedProvinceName = provinces.find(
      (province) => province.code.toString() === selectedProvince.toString()
    );

    const fullAddress = `${address}, ${selectedWardName?.name || ""}, ${
      selectedDistrictName?.name || ""
    }, ${selectedProvinceName?.name || ""}`;

    console.log("fullAddress", fullAddress);

    const updateData = {
      fullName,
      gender: gender || null,
      dateOfBirth: formattedDateOfBirth,
      address: fullAddress,
    };

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("gender", gender);
    formData.append("dateOfBirth", formattedDateOfBirth);
    formData.append("address", fullAddress);

    try {
      let res = await updateAccountByUser(user.idAccount, formData);
      if (res && res.data && res.data.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Cập nhật thông tin thành công!",
        });
        dispatch(updateProfileUser(updateData));
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Cập nhật thông tin thất bại!",
        });
      }
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
          timer: 2000,
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

        {/* address */}
        <div className="input-group-container address-container">
          <label>Địa chỉ</label>

          <div className="input-form">
            <div className="bg-top">
              <div className="input-form-province">
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                >
                  <option value="">Chọn tỉnh/thành</option>
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-form-district">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedProvince}
                >
                  <option value="">Chọn quận/huyện</option>
                  {districts.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-bottom">
              <div className="input-form-ward">
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  disabled={!selectedDistrict}
                >
                  <option value="">Chọn phường/xã</option>
                  {wards.map((ward) => (
                    <option key={ward.code} value={ward.code}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-form-address">
                <input
                  type="text"
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-btn-form input-group-container">
          <label></label>
          <div className="input-form">
            <Button
              variant="contained"
              onClick={showAlertUpdate}
              className="btn"
            >
              LƯU THAY ĐỔI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
