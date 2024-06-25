import React, { useState } from "react";
import "./Register.scss";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eye1 from "../../assets/eye1.png";
import eye2 from "../../assets/eye2.png";
import { ImSpinner2 } from "react-icons/im";
import { useTranslation, Trans } from "react-i18next";
import axios from "axios";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const [role, setRole] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/user/register",
        {
          username,
          password,
          role,
        }
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleRegister();
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
                <div className="register-form-input">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                  />
                </div>

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

                <div className="register-form-input">
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    placeholder="635 Phan Văn Trị, Phường 7, Gò vấp, TPHCM"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
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
