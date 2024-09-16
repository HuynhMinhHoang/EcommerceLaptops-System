import React, { useRef, useState } from "react";
import "./Login.scss";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import { useNavigate } from "react-router-dom";
import eye1 from "../../assets/eye1.png";
import eye2 from "../../assets/eye2.png";
import { ImSpinner2 } from "react-icons/im";
import { useTranslation, Trans } from "react-i18next";
import axios from "../../utils/AxiosConfig";
import { loginUser, verifyFBToken } from "../../service/APIService";
import { useDispatch } from "react-redux";
import { doLogin, doLoginFB } from "../../redux/action/userAction";
import { auth } from "../../firebase/configFireBase";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const Login = ({ toast }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!username) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Username is empty!",
      });
      return;
    }
    if (!password) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Password is empty!",
      });

      return;
    }
    setIsLoading(true);
    try {
      const res = await loginUser(username, password);

      if (res && res.status === 200) {
        setIsLoading(false);
        dispatch(doLogin(res));
        navigate("/");
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Login successful!",
        });

        console.log(res);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed:", error);
      if (error && error.response && error.response.data === "User not found") {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "User not found!",
        });
      } else if (error && error.response && error.response.status === 401) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Incorrect password!",
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Unexpected error occurred!",
        });
      }
    }
  };

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLoginFB = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("Facebook token:", token);

        const res = await verifyFBToken(token);
        console.log("res", res);
        const userData = {
          idAccount: user.uid,
          fullName: user.displayName || "",
          dateOfBirth: null,
          gender: "",
          address: "",
          email: user.email || "",
          phone: user.phoneNumber || "",
          username: user.displayName || "",
          avt: user.photoURL || null,
          status: "",
          role: "",
          accessToken: res.data.token,
          refreshToken: res.data.token.refreshToken,
        };
        dispatch(doLoginFB(userData));
        navigate("/");
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Login successful!",
        });
      })
      .catch((error) => {
        console.error("Login with Facebook error", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Login with Facebook failed!",
        });
      });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          <div className="login-form-body">
            <div>
              <div className="login-form-input">
                <label>Tài khoản</label>
                <input
                  type="text"
                  placeholder="hminhhoangdev@gmail.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="login-form-input">
                <label>Mật khẩu</label>
                <input
                  type={hidePassword ? "password" : "text"}
                  placeholder="Ít nhất 8 ký tự"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                {hidePassword ? (
                  <img
                    src={eye1}
                    className="eye"
                    alt="Hide Password"
                    onClick={handleHidePassword}
                  />
                ) : (
                  <img
                    src={eye2}
                    className="eye"
                    alt="Show Password"
                    onClick={handleHidePassword}
                  />
                )}
              </div>
              <p>Quên mật khẩu?</p>
              <div className="btn-login">
                <button onClick={handleLogin} disabled={isLoading}>
                  {isLoading && <ImSpinner2 className="loaderIcon" />}
                  Đăng nhập vào Gearvn
                </button>
              </div>

              <div className="br">
                <span>Hoặc</span>
              </div>

              <div className="bg-login-or">
                <div className="google">
                  <img src={google} alt="gg" />
                  <p>Đăng nhập với Google</p>
                </div>
                <div className="facebook" onClick={handleLoginFB}>
                  <img src={facebook} alt="fb" />
                  <p>Đăng nhập với Facebook</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
