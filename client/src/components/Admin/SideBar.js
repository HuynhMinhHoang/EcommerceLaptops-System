import React, { useEffect, useState } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import Game from "../../assets/game.png";
import { FaKey } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa";
import logo from "../../assets/logoadmin.png";
import { doLogout } from "../../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../utils/Constants";
import { FaFacebookMessenger } from "react-icons/fa";

const SideBar = ({ collapsed, toggled, handleToggleSidebar }) => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState("");

  useEffect(() => {
    if (location.pathname.includes(path.DASHBOARD)) {
      setActiveMenuItem(path.DASHBOARD);
    } else if (location.pathname.includes(path.MANAGE_USER)) {
      setActiveMenuItem(path.MANAGE_USER);
    } else if (location.pathname.includes(path.MANAGE_PRODUCT)) {
      setActiveMenuItem(path.MANAGE_PRODUCT);
    } else if (location.pathname.includes(path.MESSAGE_ACCOUNT)) {
      setActiveMenuItem(path.MESSAGE_ACCOUNT);
    }
  }, [location]);

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
                activeMenuItem === path.DASHBOARD ? "active" : ""
              }`}
              icon={
                <MdSpaceDashboard size={"20px"} color={"rgb(221, 51, 68)"} />
              }
            >
              Dashboard
              <Link to={path.DASHBOARD} />
            </MenuItem>
          </Menu>

          <Menu iconShape="circle">
            <SubMenu
              icon={<FaTools size={"20px"} color={"rgb(221, 51, 68)"} />}
              title="Features"
            >
              <MenuItem
                className={`custom-menu-item ${
                  activeMenuItem === path.MANAGE_USER ? "active" : ""
                }`}
              >
                Manage Users <Link to={path.MANAGE_USER} />
              </MenuItem>

              <MenuItem
                className={`custom-menu-item ${
                  activeMenuItem === path.MANAGE_PRODUCT ? "active" : ""
                }`}
              >
                Manage Products <Link to={path.MANAGE_PRODUCT} />
              </MenuItem>
            </SubMenu>
          </Menu>

          <Menu iconShape="circle">
            <MenuItem
              className={`custom-menu-item ${
                activeMenuItem === path.MESSAGE_ACCOUNT ? "active" : ""
              }`}
              icon={
                <FaFacebookMessenger size={"20px"} color={"rgb(221, 51, 68)"} />
              }
            >
              Message
              <Link to={path.MESSAGE_ACCOUNT} />
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
