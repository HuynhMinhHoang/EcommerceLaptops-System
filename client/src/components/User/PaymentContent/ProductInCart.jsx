import React from "react";
import "./ProductInCart.scss";
import { FiPlus, FiMinus } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../../redux/action/cartActions";
import { ThreeDots } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import { path } from "../../../utils/Constants";
const ProductInCart = ({ products }) => {
  const dispatch = useDispatch();
  const isLoadingRemove = useSelector(
    (state) => state.cartRedux.isLoadingRemove
  );

  const formatCurrency = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  if (isLoadingRemove === true) {
    return (
      <div className="bg-loading-remove">
        <ThreeDots
          visible={true}
          height="50"
          width="50"
          color="#ec001c"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-empty-cart">
        <div className="empty-cart">
          <h3>Giỏ hàng của bạn đang trống</h3>

          <div className="btn-goHome">
            <NavLink to={path.HOMEPAGE}>
              <button>Tiếp tục mua hàng</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-product">
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <div key={product.idProduct} className="product">
            <div className="product-img">
              <div className="bg-product-img">
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0].thumbnail
                      : "error-img"
                  }
                  alt="error_img"
                />
              </div>
              <div
                className="remove-btn"
                onClick={() => dispatch(removeFromCart(product.idProduct))}
              >
                <RiDeleteBin6Line
                  style={{
                    fontSize: "15px",
                    color: "#6D6E72",
                    marginRight: "5px",
                  }}
                />
                <button>Xoá</button>
              </div>
            </div>
            <div className="product-details">
              <h4>{product.nameProduct}</h4>
              <p>({product.description})</p>
            </div>
            <div className="product-add">
              <div className="product-price">
                <span className="price">{formatCurrency(product.price)}</span>
              </div>
              <div className="product-quantity">
                <button
                  onClick={() => dispatch(decreaseQuantity(product.idProduct))}
                  disabled={product.quantityInCart === 1}
                >
                  <FiMinus />
                </button>
                <span>{product.quantityInCart}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(product.idProduct))}
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductInCart;
