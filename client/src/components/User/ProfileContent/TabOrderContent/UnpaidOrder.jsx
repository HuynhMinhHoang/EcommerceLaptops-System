import React from "react";
import { IoCheckmarkCircle, IoInformationCircle } from "react-icons/io5";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { TbBan } from "react-icons/tb";
import "./ListOrder.scss";
import noData from "../../../../assets/no-data.png";
import { path } from "../../../../utils/Constants";
import { NavLink } from "react-router-dom";

const UnpaidOrder = ({ listOrder }) => {
  const unPaidOrders = listOrder.filter((order) => order.status_pay === false);

  return (
    <>
      <div>
        {unPaidOrders.length > 0 ? (
          unPaidOrders.map((order) => (
            <div className="order-card" key={order.idOrder}>
              <div className="order-header">
                <span className="order-id">Đơn hàng #{order.idOrder}</span>
              </div>
              <div className="order-content">
                {order.orderDetails.map((detail) => (
                  <div className="order-item" key={detail.idOrderDetail}>
                    <div className="item-image">
                      <img
                        src={detail.product.images[0].thumbnail}
                        alt={detail.product.nameProduct}
                      />
                      <span className="quantity">x{detail.quantity}</span>
                    </div>
                    <div className="item-details">
                      <div className="item-name">
                        {detail.product.nameProduct}
                      </div>
                      <div className="item-price">
                        {detail.product.price.toLocaleString()}₫
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <div className="footer1">
                  <span className="total-label">Giá tạm tính:</span>
                  <span>{order.total_amount.toLocaleString()}₫</span>
                </div>
                <div className="footer1">
                  <span className="total-label">Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>

                <div className="footer1">
                  <span className="total-label">Tổng tiền:</span>
                  <span>{order.total_amount.toLocaleString()}₫</span>
                </div>
                <div className="footer2">
                  <span>
                    <IoInformationCircle
                      style={{
                        fontSize: "22px",
                        marginBottom: "3px",
                        color: "rgb(242, 87, 0)",
                        marginRight: "5px",
                      }}
                    />
                    Chưa thanh toán:
                  </span>
                  <span className="total-label">0₫</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-orders">
            <div className="icon">
              <img src={noData} alt="noData" />
            </div>
            <div className="message">Không tìm đơn hàng nào của Quý Khách!</div>
            <NavLink to={path.HOMEPAGE}>
              <button className="shop-button">TIẾP TỤC MUA HÀNG</button>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default UnpaidOrder;
