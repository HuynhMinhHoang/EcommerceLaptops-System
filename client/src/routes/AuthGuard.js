import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { path } from "../utils/Constants";

const AuthGuard = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.userRedux.isAuthenticated
  );

  const user = useSelector((state) => state.userRedux.user);

  if (isAuthenticated) {
    if (user && user.role === "ADMIN") {
      return <Navigate to={path.DASHBOARD} replace />;
    }
    return <Navigate to={path.HOMEPAGE} replace />;
  }

  return children;
};

export default AuthGuard;
