import React, { useState } from "react";
import AccountSidebar from "./ProfileContent/AccountSidebar";
import "./AccountManage.scss";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const AccountManage = () => {
  const location = useLocation();

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

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
