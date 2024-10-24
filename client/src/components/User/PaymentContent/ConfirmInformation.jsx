import React, { useEffect, useState } from "react";
import "./ConfirmInformation.scss";
import COD from "../../../assets/cod.png";
import {
  createOrderDetail,
  getPaymentCOD,
  getPaymentVNPay,
  sendEmailConfirmOrders,
} from "../../../service/APIService";
import { path } from "../../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderId,
  setPaymentStatus,
} from "../../../redux/action/orderActions";
import { clearCart } from "../../../redux/action/cartActions";

const ConfirmInformation = ({
  totalPrice,
  products,
  setCurrentStep,
  fullName,
  phone,
  paymentStatus,
  setOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userRedux.user);
  const shippingAddress = localStorage.getItem("shippingAddress") || "";
  const note = localStorage.getItem("note") || "";
  const paymentMethod = Number(localStorage.getItem("paymentMethod")) || 1;

  const handlePaymentOrder = async () => {
    try {
      let orderId;
      if (paymentMethod === 1) {
        const response = await getPaymentCOD(
          shippingAddress,
          totalPrice,
          note,
          user.idAccount,
          paymentMethod
        );
        if (response.status === 201) {
          orderId = response.data.orderId;
          dispatch(setOrderId(orderId));
          dispatch(setPaymentStatus("success"));
          await createOrderDetails(orderId, products);
        } else {
          dispatch(setPaymentStatus("failed"));
          await createOrderDetails(orderId, products);
          console.error("Failed to create order:", response);
          return;
        }
      } else {
        const amount = totalPrice;
        const bankCode = "NCB";
        const userId = user.idAccount;
        const response = await getPaymentVNPay(
          amount,
          bankCode,
          shippingAddress,
          totalPrice,
          note,
          userId,
          paymentMethod
        );
        if (response.status === 200) {
          const paymentUrl = response.data.data.paymentUrl;
          orderId = response.data.data.orderId;
          dispatch(setOrderId(orderId));
          dispatch(setPaymentStatus("success"));
          await createOrderDetails(orderId, products);
          window.location.href = paymentUrl;
          return;
        } else {
          dispatch(setPaymentStatus("failed"));
          await createOrderDetails(orderId, products);
          console.error("Failed to initiate payment:", response.message);
          return;
        }
      }
      if (!orderId) {
        console.log("Order ID is not available.");
      }
      setCurrentStep(4);
      setTimeout(() => {
        navigate("/gearvn/cart/payment?step=4");
      }, 2000);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const createOrderDetails = async (orderId, products) => {
    try {
      const orderDetailPromises = products.map((product) =>
        createOrderDetail(orderId, product.idProduct, product.quantityInCart)
      );
      await Promise.all(orderDetailPromises);
    } catch (error) {
      console.error("Error creating order details:", error);
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
        // dispatch(clearCart());
      } else {
        dispatch(setPaymentStatus(status));
      }

      setTimeout(() => {
        navigate("/gearvn/cart/payment?step=4");
      }, 0);
    }
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
