import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { path } from "../utils/Constants";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector(
    (state) => state.userRedux.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to={path.LOGIN}></Navigate>;
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
