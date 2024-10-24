import React, { useEffect, useRef, useState } from "react";
import "./StatusPayment.scss";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  resetOrderId,
  resetTotalAmount,
  setPaymentStatus,
  resetStatePayment,
  setIsProcessedEmailPDF,
} from "../../../redux/action/orderActions";
import { clearCart } from "../../../redux/action/cartActions";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";

const StatusPayment = ({
  idOrder,
  fullName,
  phone,
  email,
  setOpen,
  open,
  products,
  handleSendEmail,
  createAndDownloadPDF,
}) => {
  const dispatch = useDispatch();
  const shippingAddress = localStorage.getItem("shippingAddress") || "";
  const { price } = useSelector((state) => state.orderRedux);
  const note = localStorage.getItem("note") || "";
  const paymentMethod = Number(localStorage.getItem("paymentMethod")) || 1;
  const [openResultPayMent, setOpenResultPayMent] = useState(false);
  const storePaymentStatus = useSelector(
    (state) => state.orderRedux.paymentStatus
  );
  const isProcessed = useSelector(
    (state) => state.orderRedux.isProcessedEmailPDF
  );
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      dispatch(setIsProcessedEmailPDF(true));
      if (storePaymentStatus === "success" && !isProcessed) {
        handleEmail_PDF();
        dispatch(clearCart());
        setOpenResultPayMent(true);
        dispatch(setIsProcessedEmailPDF(false));
      } else {
        setOpenResultPayMent(false);
        dispatch(setIsProcessedEmailPDF(false));
      }
      effectRan.current = true;
    }
  }, [storePaymentStatus, isProcessed]);

  const handleEmail_PDF = async () => {
    try {
      await handleSendEmail(
        email,
        idOrder,
        fullName,
        phone,
        shippingAddress,
        price,
        products
      );
      await createAndDownloadPDF(
        idOrder,
        fullName,
        phone,
        shippingAddress,
        note,
        paymentMethod,
        price,
        products
      );
    } catch (error) {
      console.error("Error sending email or creating PDF:", error);
    } finally {
      dispatch(resetOrderId());
      dispatch(resetStatePayment());
    }
  };

  return (
    <>
      {openResultPayMent && open !== true ? (
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
      ) : !openResultPayMent && open !== true ? (
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
