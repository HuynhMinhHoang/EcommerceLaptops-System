import React from "react";
import "./ListOrder.scss";
import { IoCheckmarkCircle, IoInformationCircle } from "react-icons/io5";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { TbBan } from "react-icons/tb";
import noData from "../../../../assets/no-data.png";
import { NavLink } from "react-router-dom";
import { path } from "../../../../utils/Constants";

const CompletedOrder = ({ listOrder }) => {
  const completedOrder = listOrder.filter((order) => order.status_order);

  return (
    <>
      <div>
        {completedOrder.length > 0 ? (
          completedOrder.map((order) => (
            <div className="order-card" key={order.idOrder}>
              <div className="order-header">
                <span className="order-id">Đơn hàng #{order.idOrder}</span>
                <div className="status-order">
                  <span className="status-icon">
                    <MdOutlineCheckCircleOutline
                      style={{
                        fontSize: "22px",
                        marginBottom: "3px",
                        color: "#24b400",
                      }}
                    />
                  </span>
                  <span className="status-text">Đã xác nhận</span>
                </div>
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
                  {order.status_pay === true ? (
                    <>
                      <span>
                        <IoCheckmarkCircle
                          style={{
                            fontSize: "22px",
                            marginBottom: "3px",
                            color: "rgb(36, 180, 0)",
                            marginRight: "5px",
                          }}
                        />
                        Số tiền đã thanh toán:
                      </span>
                      <span className="total-label">
                        {order.total_amount.toLocaleString()}₫
                      </span>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-orders">
            <div className="icon">
              <img src={noData} alt="noData" />
            </div>
            <div className="message">Quý khách chưa có đơn hàng nào!</div>
            <NavLink to={path.HOMEPAGE}>
              <button className="shop-button">TIẾP TỤC MUA HÀNG</button>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default CompletedOrder;
