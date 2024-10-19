import React, { Suspense, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toast } from "primereact/toast";
import "sweetalert2/src/sweetalert2.scss";
import NotFound404 from "./components/Error/NotFound404";
import Admin from "./components/Admin/Admin";
import ManageUser from "./components/Admin/Content/ManageUser";
import DashBoard from "./components/Admin/Content/DashBoard";
import HomePage from "./components/Home/HomePage";
import ManageProduct from "./components/Admin/Content/ManageProduct";
import AuthGuard from "./routes/AuthGuard";
import { path } from "./utils/Constants";
import ProductDetail from "./components/User/ProductDetail";
import ProductPayment from "./components/User/ProductPayment";
import OrderHistory from "./components/User/ProfileContent/OrderHistory";
import AccountProfile from "./components/User/ProfileContent/AccountProfile";
import AccountManage from "./components/User/AccountManage";
import ChatMessageAccount from "./components/AccountChatMessage/ChatMessageAccount";
import CategoryCollections from "./components/User/Collection/CategoryCollections";
import RecentlyViewed from "./components/User/ProfileContent/RecentlyViewed";
import App from "./App";
const Layout = () => {
  const toast = useRef(null);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* user */}
        <Route path={path.HOMEPAGE} element={<App toast={toast} />}>
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

          <Route
            path={path.PRODUCT_PAYMENT}
            element={<ProductPayment toast={toast} />}
          />

          <Route
            path={path.ACCOUNT_MANAGE}
            element={<AccountManage toast={toast} />}
          >
            <Route index element={<Navigate to={path.PROFILE} />} />
            <Route
              path={path.PROFILE}
              element={<AccountProfile toast={toast} />}
            />
            <Route
              path={path.ORDER_HISTORY}
              element={<OrderHistory toast={toast} />}
            />
            <Route
              path={path.MESSAGE_ACCOUNT}
              element={<ChatMessageAccount toast={toast} />}
            />
            <Route
              path={path.RECENTLY_VIEWED}
              element={<RecentlyViewed toast={toast} />}
            />
          </Route>

          <Route
            path={path.CATEGORY_COLLECTIONS}
            element={<CategoryCollections toast={toast} />}
          />
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
          <Route path={path.MESSAGE_ACCOUNT} element={<ChatMessageAccount />} />
        </Route>

        <Route path="/" element={<Navigate to={path.HOMEPAGE} />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      <Toast ref={toast} position="bottom-right" />
    </Suspense>
  );
};

export default Layout;
