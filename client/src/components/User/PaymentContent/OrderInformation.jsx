import React, { useEffect, useState } from "react";
import "./OrderInformation.scss";
import { useSelector } from "react-redux";
import COD from "../../../assets/cod.png";
import VNPay from "../../../assets/VNPay.png";

const OrderInformation = ({
  fullName,
  phone,
  shippingAddress,
  note,
  paymentMethod,
  setShippingAddress,
  setNote,
  products,
  setPaymentMethod,
}) => {
  useEffect(() => {
    localStorage.setItem("shippingAddress", shippingAddress);
    localStorage.setItem("note", note);
    localStorage.setItem("paymentMethod", paymentMethod);
  }, [shippingAddress, note, paymentMethod]);

  useEffect(() => {
    setShippingAddress(localStorage.getItem("shippingAddress") || "");
    setNote(localStorage.getItem("note") || "");
    setPaymentMethod(Number(localStorage.getItem("paymentMethod")) || 1);
  }, []);

  const handlePaymentChange = (e) => {
    setPaymentMethod(Number(e.target.value));
  };

  return (
    <div className="info-order-container">
      <div className="info-form">
        <div className="cart-title">
          <h2>Thông tin khách mua hàng</h2>
        </div>
        <form>
          <div className="form-group input-user">
            <span className="p-float-label">
              <input id="fullName" value={fullName} disabled={true} />
              <label htmlFor="fullName">Họ và tên</label>
            </span>
            <span className="p-float-label">
              <input id="phone" value={phone} disabled={true} />
              <label htmlFor="phone">Số điện thoại</label>
            </span>
          </div>

          <div className="cart-title">
            <h2>Chọn cách nhận hàng</h2>
          </div>
          <div className="form-group input-ship">
            <label>
              <input
                type="radio"
                name="delivery"
                value="Giao hàng tận nơi"
                defaultChecked
              />
              Giao hàng tận nơi
            </label>
          </div>

          <div className="form-group input-address">
            <input
              type="text"
              placeholder="Địa chỉ nhận hàng"
              className="input-text"
              value={shippingAddress}
              onChange={(e) => {
                setShippingAddress(e.target.value);
              }}
            />
          </div>

          <div className="form-group input-note">
            <input
              type="text"
              placeholder="Lưu ý, yêu cầu khác (Không bắt buộc)"
              className="input-text"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
          </div>

          <div className="payment-method">
            <h2>Chọn hình thức thanh toán</h2>
            <div className="cod">
              <input
                type="radio"
                id="cod"
                name="payment"
                value="1"
                checked={paymentMethod === 1}
                onChange={handlePaymentChange}
              />
              <label htmlFor="cod">
                <img src={COD} alt="img_cod" className="img-cod" /> Thanh toán
                khi giao hàng (COD)
              </label>
            </div>

            <div className="cod">
              <input
                type="radio"
                id="vnpay"
                name="payment"
                value="2"
                checked={paymentMethod === 2}
                onChange={handlePaymentChange}
              />
              <label htmlFor="vnpay">
                <img src={VNPay} alt="img_cod " className="img-cod" /> Thanh
                toán VNPay
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderInformation;
