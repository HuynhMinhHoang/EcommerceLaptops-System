import React, { useState } from "react";
import SideBar from "./SideBar";
import "./Admin.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminHome from "./Content/ManageUser";
import { motion } from "framer-motion";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>

      <div className="admin-content">
        <div className="admin-header"></div>

        <div className="admin-main">
          <motion.div
            key={location.key}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeVariants}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
