import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import SubList from "../Home/SubList";
import NotificationAddProduct from "../User/DetailContent/NotificationAddProduct";
import { MdOutlineWavingHand } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { ThreeDots } from "react-loader-spinner";
import { Backdrop, CircularProgress } from "@mui/material";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  // const [open, setOpen] = useState(false);

  const isAuthenticated = useSelector(
    (state) => state.userRedux.isAuthenticated
  );
  const user = useSelector((state) => state.userRedux.user);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cartRedux.products) || [];
  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const isPaymentPage = currentPath === path.PRODUCT_PAYMENT;
  const isHomePage = currentPath === path.HOMEPAGE;

  const isShowNotifications = useSelector(
    (state) => state.cartRedux.isShowNotifications
  );

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
    setLoading(true);
    setTimeout(() => {
      dispatch(doLogout());
      setLoading(false);
      navigate(path.HOMEPAGE);
    }, 1000);
  };

  const handleGoToHome = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path.HOMEPAGE);
    }, 500);
  };

  const showAlertLogout = () => {
    Swal.fire({
      title: "Bạn muốn thoát tài khoản?",
      showDenyButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: "warning",
      confirmButtonText: "Đồng ý",
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  return (
    <>
      <div className={`header ${isSticky ? "sticky" : ""}`}>
        <div className="container-header">
          <nav className="navigation">
            <ul>
              <li>
                <NavLink
                  onClick={(e) => {
                    if (isHomePage) {
                      e.preventDefault();
                    } else {
                      handleGoToHome();
                    }
                  }}
                  className="logo"
                >
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
                <NavLink
                  to={path.PRODUCT_PAYMENT}
                  className={isPaymentPage ? "disabled-link" : ""}
                  onClick={(e) => {
                    if (isPaymentPage) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className={`bg-item ${isPaymentPage ? "disabled" : ""}`}>
                    <div className="item-left">
                      <AiOutlineShoppingCart style={{ fontSize: "27px" }} />
                    </div>
                    <div className="item-right">
                      <span>Giỏ</span>
                      <span>hàng</span>
                    </div>
                    <span className="count-product">
                      <span>{products.length}</span>
                    </span>
                  </div>
                </NavLink>
                <div className="bg-noti-add">
                  {isShowNotifications && (
                    <NotificationAddProduct
                      setStateNoti={(status) => {
                        if (!status) {
                          dispatch({ type: "HIDE_NOTIFICATION" });
                        }
                      }}
                    />
                  )}
                </div>
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
                  <li className="bg-name-user">
                    <div to={path.LOGIN} className="bg-info-user">
                      <div>
                        <FiUser
                          style={{ fontSize: "25px", marginRight: "12px" }}
                        />
                      </div>
                      <div className="bg-fullname">
                        <span>Xin chào,</span>
                        <span>{user.fullName}</span>
                      </div>
                    </div>

                    <div className="dropdown-menu-user">
                      <div className="dropdown-item-custom">custom</div>

                      <div className="dropdown-item-user name-item">
                        <MdOutlineWavingHand
                          style={{ fontSize: "20px", marginRight: "12px" }}
                        />
                        Xin chào, {user.fullName}
                      </div>
                      <div className="dropdown-item-user">
                        <MdOutlinePendingActions
                          style={{ fontSize: "20px", marginRight: "12px" }}
                        />
                        Đơn hàng của tôi
                      </div>
                      <div className="dropdown-item-user">
                        <MdOutlineRemoveRedEye
                          style={{ fontSize: "20px", marginRight: "12px" }}
                        />
                        Đã xem gần đây
                      </div>
                      <div
                        className="dropdown-item-user logout-item"
                        onClick={showAlertLogout}
                      >
                        <TbLogout
                          style={{ fontSize: "20px", marginRight: "12px" }}
                        />
                        Đăng xuất
                      </div>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>

      <SubList />

      {loading && (
        <div className="bg-loading-login">
          <ThreeDots
            visible={true}
            height="100"
            width="100"
            color="#ec001c"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
};

export default Header;
