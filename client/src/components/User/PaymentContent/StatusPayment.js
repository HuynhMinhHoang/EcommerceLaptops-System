import React, { useEffect, useState } from "react";
import "./StatusPayment.scss";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { resetOrderId } from "../../../redux/action/orderActions";
import { clearCart } from "../../../redux/action/cartActions";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";

const StatusPayment = ({ idOrder, paymentStatus, fullName, phone, email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingAddress = localStorage.getItem("shippingAddress") || "";

  useEffect(() => {
    if (paymentStatus === "success") {
      dispatch(clearCart());
    }
    return () => {
      dispatch(resetOrderId());
    };
  }, [dispatch]);

  return (
    <>
      {paymentStatus === "success" ? (
        <div className="status-payment">
          <div className="status-message">
            <BsFillCartCheckFill
              style={{
                fontSize: "25px",
                color: "#4caf50",
                marginRight: "10px",
              }}
            />
            <div className="message">ĐẶT HÀNG THÀNH CÔNG</div>
          </div>
          <p>
            Cảm ơn quý khách đã cho GEARVN có cơ hội được phục vụ. Nhân viên
            GEARVN sẽ liên hệ với quý khách trong thời gian sớm nhất.
          </p>
          <div className="order-details">
            <div className="order-header">
              <span>ĐƠN HÀNG #{idOrder}</span>
              <a href="#">Quản lý đơn hàng</a>
            </div>
            <div className="order-info">
              <div className="bg-info-order">
                <span>Khách hàng:</span>
                <span>{fullName}</span>
              </div>

              <div className="bg-info-order">
                <span>Số điện thoại:</span>
                <span>{phone}</span>
              </div>

              <div className="bg-info-order">
                <span>Email:</span>
                <span>{email}</span>
              </div>

              <div className="bg-info-order">
                <span>Giao đến:</span>
                <span>{shippingAddress}</span>
              </div>

              {/* <div className="bg-info-order">
                <span>Tổng tiền:</span>
                <span className="total-amount">
                  {totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div> */}
            </div>
          </div>
          <div className="actions">
            <button className="chat-button">Chat với GEARVN</button>
            <button className="continue-button">Tiếp tục mua hàng</button>
          </div>
        </div>
      ) : paymentStatus === "failed" ? (
        <div className="status-payment">
          <div className="status-message-error">
            <MdError
              style={{
                fontSize: "25px",
                color: "#f44336",
                marginRight: "10px",
              }}
            />
            <div className="message-error">THANH TOÁN THẤT BẠI</div>
          </div>
          <p>
            Giao dịch không thành công. Vui lòng thử lại hoặc liên hệ với hỗ trợ
            khách hàng.
          </p>

          <div className="order-details">
            <div className="order-header">
              <span>ĐƠN HÀNG #{idOrder}</span>
              <a href="#">Quản lý đơn hàng</a>
            </div>
            <div className="order-info">
              <div className="bg-info-order">
                <span>Khách hàng:</span>
                <span>{fullName}</span>
              </div>

              <div className="bg-info-order">
                <span>Số điện thoại:</span>
                <span>{phone}</span>
              </div>

              <div className="bg-info-order">
                <span>Email:</span>
                <span>{email}</span>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="chat-button">Chat với GEARVN</button>
            <button className="continue-button">Tiếp tục mua hàng</button>
          </div>
        </div>
      ) : (
        <div>Đang xử lý...</div>
      )}
    </>
  );
};

export default StatusPayment;
