import React, { useEffect } from "react";
import "./ConfirmInformation.scss";
import COD from "../../../assets/cod.png";
import { getPaymentVNPay } from "../../../service/APIService";
import { path } from "../../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetOrderState,
  setOrderId,
  setPaymentStatus,
} from "../../../redux/action/orderActions";
import { clearCart } from "../../../redux/action/cartActions";

const ConfirmInformation = ({
  totalPrice,
  currentStep,
  setCurrentStep,
  fullName,
  phone,
  paymentStatus,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userRedux.user);

  const shippingAddress = localStorage.getItem("shippingAddress") || "";
  const note = localStorage.getItem("note") || "";
  const paymentMethod = Number(localStorage.getItem("paymentMethod")) || 1;

  const handlePaymentOrder = async () => {
    try {
      const amount = totalPrice;
      const bankCode = "NCB";
      const userId = user.idAccount;

      const response = await getPaymentVNPay(
        amount,
        bankCode,
        shippingAddress,
        note,
        userId,
        paymentMethod
      );

      if (response.status === 200) {
        const paymentUrl = response.data.data.paymentUrl;
        const orderId = response.data.data.orderId;

        dispatch(setOrderId(orderId));
        dispatch(setPaymentStatus("pending"));

        window.location.href = paymentUrl;
      } else {
        console.error("Failed to initiate payment:", response.message);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    if (!shippingAddress || !note) {
      setCurrentStep(1);
      navigate(`${path.PRODUCT_PAYMENT}?step=1`, { replace: true });
    }

    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get("status");

    if (status) {
      if (status === "success") {
        dispatch(setPaymentStatus(status));
        dispatch(clearCart());
      } else {
        dispatch(setPaymentStatus(status));
      }
      setTimeout(() => {
        navigate("/gearvn/cart/payment?step=4");
      }, 0);
    }

    // return () => {
    //   dispatch(resetOrderState());
    // };
  }, [navigate, paymentStatus]);

  return (
    <div className="confirm-info-container">
      <div className="confirm-form">
        <div className="cart-title">
          <h2>Thông tin đặt hàng</h2>
        </div>
        <div className="info-row">
          <span className="label">Khách hàng:</span>
          <span className="value">{fullName}</span>
        </div>
        <div className="info-row">
          <span className="label">Số điện thoại:</span>
          <span className="value">{phone}</span>
        </div>
        <div className="info-row">
          <span className="label">Địa chỉ nhận hàng:</span>
          <span className="value">{shippingAddress}</span>
        </div>
        <div className="info-row">
          <span className="label">Ghi chú:</span>
          <span className="value">{note}</span>
        </div>
        <div className="info-row red">
          <span className="label">Tạm tính:</span>
          <span className="value">
            {totalPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <div className="info-row red">
          <span className="label">Phí vận chuyển:</span>
          <span className="value">0đ</span>
        </div>
        <div className="info-row red">
          <span className="label">Tổng tiền:</span>
          <span className="value">
            {totalPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>

        <div className="summary">
          <div className="bg-total">
            <div className="shipping-fee">
              <span>Phí vận chuyển:</span>
              <span>Miễn phí</span>
            </div>
            <div className="total">
              <span>Tổng tiền:</span>
              <span>
                {totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
          <button className="checkout-btn" onClick={handlePaymentOrder}>
            THANH TOÁN NGAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmInformation;
