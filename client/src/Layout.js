import React, { Suspense, useRef } from "react";
import { Routes, Route } from "react-router-dom";
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
import LaptopDetail from "./components/Home/ContentHome/LaptopDetail";
import ManageProduct from "./components/Admin/Content/ManageProduct";
import AuthGuard from "./routes/AuthGuard";

const Layout = () => {
  const toast = useRef(null);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* user */}

        {/* <Route path="/" element={<App />}> */}

        {/* </Route> */}

        <Route path="/" element={<App />}>
          <Route
            path="login"
            element={
              <AuthGuard>
                <Login toast={toast} />
              </AuthGuard>
            }
          />
          <Route
            path="register"
            element={
              <AuthGuard>
                <Register toast={toast} />
              </AuthGuard>
            }
          />
          <Route index element={<HomePage />} />
          <Route path="laptopdetail" element={<PrivateRoute></PrivateRoute>} />
        </Route>

        {/* admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser toast={toast} />} />
          <Route
            path="manage-products"
            element={<ManageProduct toast={toast} />}
          />
        </Route>

        {/* NotFound404 */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      <Toast ref={toast} position="bottom-right" />
    </Suspense>
  );
};

export default Layout;
