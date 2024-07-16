import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound404 from "./components/Error/NotFound404";
import Admin from "./components/Admin/Admin";
import ManageUser from "./components/Admin/Content/ManageUser";
import AdminRoute from "./routes/AdminRoute";
import DashBoard from "./components/Admin/Content/DashBoard";
import HomePage from "./components/Home/HomePage";
import PrivateRoute from "./routes/PrivateRoute";
import LaptopDetail from "./components/Home/ContentHome/LaptopDetail";

const Layout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* user */}

        {/* <Route path="/" element={<App />}> */}

        {/* </Route> */}

        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route index element={<HomePage />} />
          <Route
            path="laptopdetail"
            element={
              <PrivateRoute>
                <LaptopDetail />
              </PrivateRoute>
            }
          />
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
          <Route path="manage-users" element={<ManageUser />} />
        </Route>

        {/* NotFound404 */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Suspense>
  );
};

export default Layout;
