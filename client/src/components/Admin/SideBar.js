import React, { useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaGithub, FaSignOutAlt } from "react-icons/fa";
import "./SideBar.scss";
import { MdSpaceDashboard } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";
import Game from "../../assets/game.png";
import { FaKey } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa";
import logo from "../../assets/logoadmin.png";
import { doLogout } from "../../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";

// import { logoutUser } from "../../services/APIService";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { doLogout } from "../../redux/action/userAction";
// import Swal from "sweetalert2";

const SideBar = ({ collapsed, toggled, handleToggleSidebar }) => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const user = useSelector((state) => state.userRedux.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(doLogout());
  };
  return (
    <>
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "15px",
              display: "flex",
              justifyContent: "center",
              borderRadius: "20px",
            }}
          >
            {/* <div className="logo-1 animate__animated animate__fadeInLeft"> */}
            <img className="logo-2" src={logo} alt="logo" />
            {/* </div> */}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              className={`custom-menu-item ${
                activeMenuItem === "dashboard" ? "active" : ""
              }`}
              icon={
                <MdSpaceDashboard size={"20px"} color={"rgb(221, 51, 68)"} />
              }
              onClick={() => handleMenuItemClick("dashboard")}
            >
              Dashboard
              <Link to="/admin" />
            </MenuItem>
          </Menu>

          <Menu iconShape="circle">
            <SubMenu
              icon={<FaTools size={"20px"} color={"rgb(221, 51, 68)"} />}
              title="Features"
            >
              <MenuItem
                className={`custom-menu-item ${
                  activeMenuItem === "manage-users" ? "active" : ""
                }`}
                onClick={() => handleMenuItemClick("manage-users")}
              >
                Manage Users <Link to="/admin/manage-users" />
              </MenuItem>

              <MenuItem
                className={`custom-menu-item ${
                  activeMenuItem === "manage-products" ? "active" : ""
                }`}
                onClick={() => handleMenuItemClick("manage-products")}
              >
                Manage Products <Link to="/admin/manage-products" />
              </MenuItem>
            </SubMenu>
          </Menu>

          <Menu iconShape="circle" className="bg-logout">
            <MenuItem
              className={`custom-menu-item ${
                activeMenuItem === "logout" ? "active" : ""
              }`}
              icon={<FaSignOutAlt size={"20px"} color={"rgb(255 116 116)"} />}
              onClick={() => handleLogout()}
            >
              Logout
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/HuynhMinhHoang"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Contact me
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
