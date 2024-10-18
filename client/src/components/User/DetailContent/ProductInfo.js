import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "react-image-lightbox/style.css";
import Gallery from "react-image-gallery";
import Lightbox from "react-image-lightbox";
import "./ProductInfo.scss";
import { addToCart } from "../../../redux/action/cartActions";
import { useDispatch, useSelector } from "react-redux";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isShowNotifications = useSelector(
    (state) => state.cartRedux.isShowNotifications
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    if (!isShowNotifications) {
      dispatch(addToCart(product));
    }
  };

  const galleryImages = product.images.map((image) => image.thumbnail);

  const handleImageClick = (event) => {
    const images = document.querySelectorAll(".image-gallery-image");
    const clickedImageIndex = Array.from(images).indexOf(event.target);
    openLightbox(clickedImageIndex);
  };

  const openLightbox = (index) => {
    if (galleryImages.length > 0) {
      setCurrentImageIndex(index);
      setIsOpen(true);
    }
  };

  return (
    <div className="product-page">
      <div className="bg-image-gallery">
        <Gallery
          items={galleryImages.map((src) => ({
            original: src,
            thumbnail: src,
          }))}
          onClick={handleImageClick}
        />
      </div>

      {/* lightbox */}
      {isOpen && galleryImages.length > 0 && (
        <Lightbox
          mainSrc={galleryImages[currentImageIndex]}
          nextSrc={
            galleryImages[(currentImageIndex + 1) % galleryImages.length]
          }
          prevSrc={
            galleryImages[
              (currentImageIndex + galleryImages.length - 1) %
                galleryImages.length
            ]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setCurrentImageIndex(
              (currentImageIndex + galleryImages.length - 1) %
                galleryImages.length
            )
          }
          onMoveNextRequest={() =>
            setCurrentImageIndex((currentImageIndex + 1) % galleryImages.length)
          }
        />
      )}

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
