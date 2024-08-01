import React, { useEffect, useState } from "react";
import "./NotificationAddProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/action/cartActions";

const NotificationAddProduct = ({ setStateNoti }) => {
  const [visible, setVisible] = useState(true);
  const product = useSelector((state) => state.cartRedux.infoProductAdd);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) {
      setStateNoti(false);
    }
  }, [visible, setStateNoti]);

  const productImage =
    product.images && product.images.length > 0
      ? product.images[0].thumbnail
      : "";

  // console.log("productImage", product);

  return (
    <>
      {visible && (
        <div className="notification">
          <div className="notification-content">
            <div className="notification-header">
              <span>Thêm vào giỏ hàng thành công</span>
              <span onClick={handleClearCart}>X</span>
            </div>
            <div className="notification-body">
              <div className="img">
                <img
                  src={productImage}
                  alt={product.nameProduct || "Sản phẩm"}
                />
              </div>
              <div className="notification-details">
                <p>{product.nameProduct || ""}</p>
              </div>
            </div>
            <div className="view-cart">
              <button>Xem giỏ hàng</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationAddProduct;
