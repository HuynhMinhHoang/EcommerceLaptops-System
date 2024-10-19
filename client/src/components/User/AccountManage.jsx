import React, { useEffect, useState } from "react";
import AccountSidebar from "./ProfileContent/AccountSidebar";
import "./AccountManage.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { path } from "../../utils/Constants";

const AccountManage = (toast) => {
  const location = useLocation();
  const user = useSelector((state) => state.userRedux.user);
  const isAuthenticated = useSelector(
    (state) => state.userRedux.isAuthenticated
  );
  const navigate = useNavigate();
  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    if (!isAuthenticated) navigate(`${path.HOMEPAGE}/${path.LOGIN}`);
  });

  return (
    <div className="profile-account-container">
      <div className="profile-sidebar">
        <AccountSidebar />
      </div>

      <div className="profile-content">
        <motion.div
          className="bg-motion-container"
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
  );
};

export default AccountManage;
