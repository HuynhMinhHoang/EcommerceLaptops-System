import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
// import { logoutUser } from "../../services/APIService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import { useTranslation } from "react-i18next";
import "./Header.scss";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <NavLink to="/" className="logo">
          <div className="logo-1 animate__animated animate__fadeInLeft">
            <img src={logo} alt="logo" />
          </div>
        </NavLink>
        <nav className="navigation">
          <ul>
            <li>
              <NavLink to="/">Trang chủ</NavLink>
            </li>
            <li>
              <NavLink to="/a">Laptop mới</NavLink>
            </li>
            <li>
              <NavLink to="/a">Sản phẩm</NavLink>
            </li>
            {/* {user.role === "ADMIN" && ( */}
            <li>
              <NavLink to="/a">Khuyến mãi</NavLink>
            </li>
            {/* )} */}
            <li>
              <NavLink to="/a">Liên hệ - Góp ý</NavLink>
            </li>

            <li className="auth-link">
              <NavLink to="/login">Đăng nhập</NavLink>
            </li>

            <li>
              <NavLink to="/register">Đăng ký</NavLink>
            </li>
          </ul>
        </nav>

        {/* <div className="auth-buttons">
          {isAuthenticated === false ? (
            <>
              <button
                className="btn-login"
                onClick={() => {
                  handleLogin();
                }}
              >
                {t("header.login")}
              </button>
              <button
                className="btn-signup"
                onClick={() => {
                  handleRegister();
                }}
              >
                {t("header.signup")}
              </button>
            </>
          ) : (
            <div className="user-menu">
              <div
                className="user-settings"
                onClick={() => handleUpdateProfile()}
              >
                <FcBusinessman className="settings-icon" />
                <p>{user.username}</p>
              </div>
              <button
                className="btn-logout"
                onClick={() => {
                  handleLogout();
                }}
              >
                {t("header.logout")}
              </button>
            </div>
          )}
          <Languages />
        </div> */}
      </div>

      {/* <UpdateProfileModal
        show={showUpdateProfileModal}
        handleClose={handleCloseUpdateProfileModal}
      /> */}
    </header>
  );
};

export default Header;
