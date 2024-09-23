import React, { useEffect, useState } from "react";
import "./StatusPayment.scss";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  resetOrderId,
  resetTotalAmount,
  setPaymentStatus,
} from "../../../redux/action/orderActions";
import { clearCart } from "../../../redux/action/cartActions";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import axios from "axios";
import { sendEmailConfirmOrders } from "../../../service/APIService";

const StatusPayment = ({
  idOrder,
  paymentStatus,
  fullName,
  phone,
  email,
  setOpen,
  open,
  products,
  user,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingAddress = localStorage.getItem("shippingAddress") || "";
  const { price } = useSelector((state) => state.orderRedux);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);

    return () => {
      dispatch(resetOrderId());
    };
  }, [dispatch, setOpen]);

  useEffect(() => {
    if (paymentStatus === "success" && !emailSent) {
      handleSendEmail();
      setEmailSent(true);
    }
  }, [paymentStatus, emailSent]);

  const handleSendEmail = async () => {
    if (products && products.length > 0) {
      try {
        const imageUrls = products.map(
          (product) => product.images[0].thumbnail
        );
        const imageFiles = await Promise.all(
          imageUrls.map(async (url) => {
            const response = await axios.get(url, { responseType: "blob" });
            return new File([response.data], url.split("/").pop(), {
              type: response.data.type,
            });
          })
        );

        const formData = new FormData();
        formData.append("email", email);
        formData.append("orderId", idOrder);
        formData.append("fullName", fullName);
        formData.append("phone", phone);
        formData.append("shippingAddress", shippingAddress);
        formData.append("price", price);

        imageFiles.forEach((file) => {
          formData.append("productImages", file);
        });

        await sendEmailConfirmOrders(formData);
        dispatch(clearCart());
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
  };

  return (
    <>
      {paymentStatus === "success" && open === false ? (
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
            Cảm ơn quý khách đã cho GEARVN có cơ hội được phục vụ.{" "}
            <span>Vui lòng kiểm tra email để xem thông tin đơn hàng!</span>
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

              <div className="bg-info-order">
                <span>Tổng tiền:</span>
                <span className="total-amount">
                  {price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="actions">
            <button className="chat-button">Chat với GEARVN</button>
            <button className="continue-button">Tiếp tục mua hàng</button>
          </div>
        </div>
      ) : paymentStatus === "failed" && open === false ? (
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
        <div className="pending">Đang xử lý đơn hàng...</div>
      )}
    </>
  );
};

export default StatusPayment;
