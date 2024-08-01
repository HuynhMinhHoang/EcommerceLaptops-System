import React, { Suspense, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toast } from "primereact/toast";
import "sweetalert2/src/sweetalert2.scss";
import NotFound404 from "./components/Error/NotFound404";
import Admin from "./components/Admin/Admin";
import ManageUser from "./components/Admin/Content/ManageUser";
import AdminRoute from "./routes/AdminRoute";
import DashBoard from "./components/Admin/Content/DashBoard";
import HomePage from "./components/Home/HomePage";
import PrivateRoute from "./routes/PrivateRoute";
import ManageProduct from "./components/Admin/Content/ManageProduct";
import AuthGuard from "./routes/AuthGuard";
import { path } from "./utils/Constants";
import ProductDetail from "./components/User/ProductDetail";

const Layout = () => {
  const toast = useRef(null);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* user */}
        <Route path={path.HOMEPAGE} element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path={path.LOGIN}
            element={
              <AuthGuard>
                <Login toast={toast} />
              </AuthGuard>
            }
          />
          <Route
            path={path.REGISTER}
            element={
              <AuthGuard>
                <Register toast={toast} />
              </AuthGuard>
            }
          />
          <Route path={path.PRODUCT_DETAIL} element={<ProductDetail />} />
        </Route>

        {/* admin */}
        <Route path={path.ADMIN} element={<Admin />}>
          <Route
            path={path.DASHBOARD}
            index
            element={<DashBoard />}
            toast={toast}
          />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
        </Route>

        <Route path="/" element={<Navigate to={path.HOMEPAGE} />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      <Toast ref={toast} position="bottom-right" />
    </Suspense>
  );
};

export default Layout;
