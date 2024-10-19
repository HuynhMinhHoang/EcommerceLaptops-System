import React, { useEffect, useState } from "react";
import { path } from "../../../utils/Constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaEye,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import "./AccountSidebar.scss";
import logo from "../../../assets/logoadmin.png";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../../redux/action/userAction";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { FaFacebookMessenger } from "react-icons/fa";

const AccountSidebar = () => {
  const user = useSelector((state) => state.userRedux.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname.includes(path.PROFILE)) {
      setActiveLink(path.PROFILE);
    } else if (location.pathname.includes(path.ORDER_HISTORY)) {
      setActiveLink(path.ORDER_HISTORY);
    } else if (location.pathname.includes(path.MESSAGE_ACCOUNT)) {
      setActiveLink(path.MESSAGE_ACCOUNT);
    } else if (location.pathname.includes(path.RECENTLY_VIEWED)) {
      setActiveLink(path.RECENTLY_VIEWED);
    }
  }, [location]);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(doLogout());
      setLoading(false);
      navigate(path.HOMEPAGE);
    }, 1000);
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
      <div className="account-sidebar">
        <div className="sidebar-header">
          <div className="user-icon">
            <img className="logo-profile" src={user.avt} alt="error" />
          </div>
          <div className="user-name">{user.fullName}</div>
        </div>
        <div className="sidebar-content">
          <ul>
            <li className={activeLink === path.PROFILE ? "active" : ""}>
              <Link to={`${path.ACCOUNT_MANAGE}/${path.PROFILE}`}>
                <FaUser style={{ fontSize: "18px" }} />
                Thông tin tài khoản
              </Link>
            </li>
            <li className={activeLink === path.ORDER_HISTORY ? "active" : ""}>
              <Link to={`${path.ACCOUNT_MANAGE}/${path.ORDER_HISTORY}`}>
                <FaBoxOpen className="red-icon" style={{ fontSize: "19px" }} />
                Quản lý đơn hàng
              </Link>
            </li>
            <li className={activeLink === path.MESSAGE_ACCOUNT ? "active" : ""}>
              <Link to={`${path.ACCOUNT_MANAGE}/${path.MESSAGE_ACCOUNT}`}>
                <FaFacebookMessenger style={{ fontSize: "18px" }} />
                Hỗ trợ CSKH
              </Link>
            </li>
            <li className={activeLink === path.RECENTLY_VIEWED ? "active" : ""}>
              <Link to={`${path.ACCOUNT_MANAGE}/${path.RECENTLY_VIEWED}`}>
                <FaEye style={{ fontSize: "18px" }} />
                Sản phẩm đã xem
              </Link>
            </li>
            <li onClick={showAlertLogout}>
              <Link>
                <FaSignOutAlt /> Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AccountSidebar;
