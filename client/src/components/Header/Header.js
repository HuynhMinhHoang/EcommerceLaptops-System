import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.scss";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { SlEarphonesAlt } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { path } from "../../utils/Constants";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.userRedux.isAuthenticated
  );
  const user = useSelector((state) => state.userRedux.user);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dispatch = useDispatch();

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

  const handleLogout = () => {
    dispatch(doLogout());
  };

  return (
    <div className={`header ${isSticky ? "sticky" : ""}`}>
      <div className="container-header">
        <nav className="navigation">
          <ul>
            <li>
              <NavLink to={path.HOMEPAGE} className="logo">
                <div className="logo-1 animate__animated animate__fadeInLeft">
                  <img src={logo} alt="logo" />
                </div>
              </NavLink>
            </li>
            <li>
              <div className="input-search">
                <IconField>
                  <InputIcon className="pi pi-search"> </InputIcon>
                  <InputText v-model="value1" placeholder="Bạn cần tìm gì?" />
                </IconField>
              </div>
            </li>

            <li className="hotline">
              <NavLink to="/">
                <div className="bg-item">
                  <div className="item-left">
                    <SlEarphonesAlt style={{ fontSize: "22px" }} />
                  </div>
                  <div className="item-right">
                    <span>Hotline</span>
                    <span>1900.5310</span>
                  </div>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/">
                <div className="bg-item">
                  <div className="item-left">
                    <IoLocationOutline style={{ fontSize: "26px" }} />
                  </div>
                  <div className="item-right">
                    <span>Hệ thống</span>
                    <span>Showroom</span>
                  </div>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/">
                <div className="bg-item">
                  <div className="item-left">
                    <MdPendingActions style={{ fontSize: "26px" }} />
                  </div>
                  <div className="item-right">
                    <span>Tra cứu</span>
                    <span>đơn hàng</span>
                  </div>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink to="/">
                <div className="bg-item">
                  <div className="item-left">
                    <AiOutlineShoppingCart style={{ fontSize: "27px" }} />
                  </div>
                  <div className="item-right">
                    <span>Giỏ</span>
                    <span>hàng</span>
                  </div>
                  <span className="count-product">
                    <span>25</span>
                  </span>
                </div>
              </NavLink>
            </li>

            {!isAuthenticated ? (
              <li className="auth-link">
                <NavLink to={path.LOGIN} className="bg-login">
                  <FiUser style={{ fontSize: "23px", marginRight: "8px" }} />
                  Đăng nhập
                </NavLink>
                <NavLink to={path.REGISTER}>Đăng ký</NavLink>
              </li>
            ) : (
              <>
                <li className="auth-link">
                  <span className="name-user">Chào, {user.fullName}!</span>
                  <NavLink onClick={handleLogout} className="bg-login">
                    <IoMdLogOut
                      style={{
                        fontSize: "23px",
                        marginRight: "8px",
                        marginTop: "2px",
                      }}
                    />
                    Đăng xuất
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
