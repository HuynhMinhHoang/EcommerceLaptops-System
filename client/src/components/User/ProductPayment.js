import React, { useEffect, useState } from "react";
import "./ProductPayment.scss";
import { NavLink } from "react-router-dom";
import { path } from "../../utils/Constants";
import { GrFormPrevious } from "react-icons/gr";
import { HiShoppingBag } from "react-icons/hi2";
import { FaAddressCard } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";
import { TbShieldCheckFilled } from "react-icons/tb";
import qc1 from "../../assets/qc1.png";
import qc2 from "../../assets/qc2.png";
import ProductInCart from "./PaymentContent/ProductInCart";
import { useSelector } from "react-redux";

const ProductPayment = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const products = useSelector((state) => state.cartRedux.products) || [];

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantityInCart;
    }, 0);
  };

  const totalPrice = calculateTotalPrice(products);

  return (
    <div className="payment-container">
      {/* banner */}
      <div
        className="banner-left"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <img src={qc1} alt="Banner Left" />
      </div>
      <div
        className="banner-right"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <img src={qc2} alt="Banner Right" />
      </div>

      {/* content */}
      <div className="breadcrumb-cart">
        <NavLink to={path.HOMEPAGE}>
          <GrFormPrevious
            style={{
              color: "#1982f9",
              fontSize: "21px",
              marginRight: "5px",
              marginBottom: "3px",
            }}
          />
          <span>Mua thêm sản phẩm khác</span>
        </NavLink>
      </div>
      <div className="product-payment">
        <div className="steps">
          <div className="step active">
            <div className="step-icon">
              <HiShoppingBag />
            </div>
            <div className="step-text">Giỏ hàng</div>
          </div>
          <div className="step">
            <div className="step-icon">
              <FaAddressCard />
            </div>
            <div className="step-text">Thông tin đặt hàng</div>
          </div>
          <div className="step">
            <div className="step-icon">
              <BsCreditCardFill />
            </div>
            <div className="step-text">Thanh toán</div>
          </div>
          <div className="step">
            <div className="step-icon">
              <TbShieldCheckFilled />
            </div>
            <div className="step-text">Hoàn tất</div>
          </div>
        </div>

        <ProductInCart products={products} />

        {!products || products.length === 0 ? (
          ""
        ) : (
          <div className="summary">
            <div className="discount-code">
              <button>Sử dụng mã giảm giá</button>
            </div>
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
            <button className="checkout-btn">ĐẶT HÀNG NGAY</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPayment;
