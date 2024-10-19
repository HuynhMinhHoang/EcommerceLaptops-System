import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { path } from "../utils/Constants";

const AdminRoute = (props) => {
  const isAuthenticated = useSelector(
    (state) => state.userRedux.isAuthenticated
  );
  const userRole = useSelector((state) => state.userRedux.user.role);

  if (!isAuthenticated) {
    return <Navigate to={`${path.HOMEPAGE}/${path.LOGIN}`} />;
  }

  if (userRole !== "ADMIN") {
    return <Navigate to={path.HOMEPAGE} />;
  }

  return <>{props.children}</>;
};

export default AdminRoute;
