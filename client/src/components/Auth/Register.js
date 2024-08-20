import React, { useState } from "react";
import "./Register.scss";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import { useNavigate } from "react-router-dom";
import eye1 from "../../assets/eye1.png";
import eye2 from "../../assets/eye2.png";
import { ImSpinner2 } from "react-icons/im";
import { registerUser } from "../../service/APIService";

import "react-datepicker/dist/react-datepicker.css";
import { path } from "../../utils/Constants";

const Register = ({ toast }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Email không để trống!",
      });
      return false;
    } else if (!emailRegex.test(email)) {
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Email không hợp lệ!",
      });
      return false;
    }
    const phoneRegex = /^[0-9]{9,10}$/;
    if (!phone) {
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Số điện thoại không để trống!",
      });
      return false;
    } else if (!phoneRegex.test(phone)) {
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Số điện thoại không hợp lệ!",
      });
      return false;
    }
    if (!username) {
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Tài khoản không để trống!",
      });
      return false;
    }
    if (password.length < 6 || password.length > 20) {
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Mật khẩu phải có 6 đến 20 ký tự!",
      });
      return false;
    }
    if (password !== reEnterPassword) {
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Mật khẩu không khớp!",
      });
      return false;
    }

    if (!uploadedFile) {
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Vui lòng chọn ảnh đại diện!",
      });
      return false;
    }
    return true;
  };
  const handleRegister = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("avt", uploadedFile);

    try {
      const response = await registerUser(formData);
      console.log(response);
      if (response.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Thành công",
          detail: response.data.message,
        });
        navigate(`${path.HOMEPAGE}/${path.LOGIN}`);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Lỗi",
          detail: response.data.message,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: error.response?.data?.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1048576) {
      setUploadedFile(file);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Files larger than 1MB are not allowed!",
      });
    }
  };

  const removeImage = () => {
    setUploadedFile(null);
  };

  const formatFileSize = (size) => {
    if (size < 1024) {
      return size + " B";
    } else if (size < 1048576) {
      return (size / 1024).toFixed(2) + " KB";
    } else {
      return (size / 1048576).toFixed(2) + " MB";
    }
  };
  return (
    <>
      <div className="register-container">
        <div className="register-content">
          {/* info user */}
          <div className="register-form">
            <div className="register-form-body">
              <div>
                {/* <div className="register-form-input">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                  />
                </div> */}

                <div className="register-form-input">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="hminhhoangdev@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="register-form-input">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    placeholder="0123456789"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>

                <div className="bg-upload">
                  <div className="bg-input-upload">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={onFileSelect}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="file-upload" className="custom-img-btn">
                      <i className="pi pi-fw pi-cloud-upload icon-up"></i>
                    </label>
                  </div>
                  <div className="preview">
                    {!uploadedFile ? (
                      <p>Please choose a representative photo!</p>
                    ) : (
                      <div className="preview-image">
                        <div className="bg-img">
                          <img
                            src={
                              uploadedFile.url ||
                              URL.createObjectURL(uploadedFile)
                            }
                            alt="Preview"
                          />
                        </div>
                        {uploadedFile.size > 0 && (
                          <div className="bg-size">
                            {formatFileSize(uploadedFile.size)}
                          </div>
                        )}
                        <div className="bg-cancel" onClick={removeImage}>
                          <span>
                            <i className="pi pi-fw pi-times" />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* <div className="register-form-input">
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    placeholder="635 Phan Văn Trị, Phường 7, Gò vấp, TPHCM"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div> */}

                {/* <div className="register-form-input">
                  <label>Giới tính</label>
                  <Dropdown
                    value={gender}
                    onChange={(e) => setGender(e.value)}
                    options={genders}
                    optionLabel="name"
                    optionValue="code"
                    placeholder="Chọn giới tính"
                    className="w-full md:w-14rem"
                  />
                </div> */}
              </div>
            </div>
          </div>

          {/* account */}
          <div className="register-form">
            <div className="register-form-body">
              <div>
                <div className="register-form-input">
                  <label>Tài khoản</label>
                  <input
                    type="text"
                    placeholder="hminhhoangdev"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="register-form-input">
                  <label>Mật khẩu</label>
                  <input
                    type={hidePassword ? "password" : "text"}
                    placeholder="Ít nhất 8 ký tự"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  {hidePassword ? (
                    <img
                      src={eye1}
                      className="eye"
                      alt="Hide Password"
                      onClick={() => {
                        handleHidePassword();
                      }}
                    />
                  ) : (
                    <img
                      src={eye2}
                      className="eye"
                      alt="Show Password"
                      onClick={() => {
                        handleHidePassword();
                      }}
                    />
                  )}
                </div>

                <div className="register-form-input">
                  <label>Nhập lại mật khẩu</label>
                  <input
                    type={hidePassword ? "password" : "text"}
                    placeholder="Ít nhất 8 ký tự"
                    value={reEnterPassword}
                    onChange={(e) => {
                      setReEnterPassword(e.target.value);
                    }}
                  />

                  {hidePassword ? (
                    <img
                      src={eye1}
                      className="eye"
                      alt="Hide Password"
                      onClick={() => {
                        handleHidePassword();
                      }}
                    />
                  ) : (
                    <img
                      src={eye2}
                      className="eye"
                      alt="Show Password"
                      onClick={() => {
                        handleHidePassword();
                      }}
                    />
                  )}
                </div>

                {/* <div className="register-form-input">
                  <label>Ngày sinh</label>
                  <Calendar
                    id="buttondisplay"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.value)}
                    dateFormat="dd/mm/yy"
                  />
                </div> */}

                <p>Quên mật khẩu?</p>
                <div className="btn-login">
                  <button
                    onClick={() => {
                      handleRegister();
                    }}
                    disabled={isLoading}
                  >
                    {isLoading === true && (
                      <ImSpinner2 className="loaderIcon" />
                    )}
                    Tạo tài khoản miễn phí
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="register-or">
          <div className="br">
            <span>Hoặc</span>
          </div>

          <div className="bg-register-or">
            <div className="google">
              <img src={google} alt="gg" />
              <p>Đăng nhập với Google</p>
            </div>
            <div className="facebook">
              <img src={facebook} alt="fb" />
              <p>Đăng nhập với Facebook</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
