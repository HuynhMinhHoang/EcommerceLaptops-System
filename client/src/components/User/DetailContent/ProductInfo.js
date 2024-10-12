import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Gallery from "react-image-gallery";
import "./ProductInfo.scss";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { addToCart } from "../../../redux/action/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "@mui/material";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const isShowNotifications = useSelector(
    (state) => state.cartRedux.isShowNotifications
  );

  const galleryImages = product.images.map((image) => ({
    original: image.thumbnail,
    thumbnail: image.thumbnail,
  }));

  const handleAddToCart = () => {
    if (!isShowNotifications) {
      // console.log("Adding product to cart:", product);
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="product-page">
      <div className="bg-image-gallery">
        <Gallery items={galleryImages} />
      </div>

      <div className="product-details">
        <h1>{product.nameProduct}</h1>
        <div className="product-rating">
          <span className="rating-score">
            0
            <FaStar
              style={{
                fontSize: "15px",
                marginLeft: "3px",
                marginBottom: "4px",
              }}
            />
          </span>
          <span className="rating-reviews">Xem đánh giá</span>
        </div>
        <p className="price">{product.price.toLocaleString("vi-VN")}đ</p>
        <div className="bg-btn">
          <div className="buy-now">
            <div
              onClick={() => {
                if (product.quantity > 0) {
                  handleAddToCart();
                }
              }}
              disabled={isShowNotifications || product.quantity === 0}
              className={
                isShowNotifications || product.quantity === 0
                  ? "custom-btn-sold"
                  : ""
              }
            >
              <span className="maintext">
                {product.quantity === 0 ? "HẾT HÀNG" : "MUA NGAY"}
              </span>
              <span className="subtext">
                {product.quantity === 0
                  ? "Sản phẩm tạm hết hàng"
                  : "Giao tận nơi hoặc nhận tại cửa hàng"}
              </span>
            </div>
          </div>
        </div>
        <div className="description">
          <h2>Quà tặng:</h2>
          <ul>
            <li>🎁 Balo MSI Essential Backpack (Kèm máy)</li>
            <div className="bg-des">
              <li>✔ Bảo hành chính hãng 24 tháng. </li>
              <li>✔ Hỗ trợ đổi mới trong 7 ngày.</li>
              <li>✔ Miễn phí giao hàng toàn quốc.</li>
            </div>
          </ul>

          <p>
            Hỗ trợ trả góp MPOS (Thẻ tín dụng), HDSAISON (
            <span>Xem chi tiết</span>)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
