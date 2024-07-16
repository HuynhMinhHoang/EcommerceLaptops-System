import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.scss";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`header ${isSticky ? "sticky" : ""}`}>
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
            <li>
              <NavLink to="/a">Khuyến mãi</NavLink>
            </li>
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
      </div>
    </div>
  );
};

export default Header;
