import React, { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { getProductById } from "../../../service/APIService";
import { useLocation, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const { slug } = useParams();
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    fetchProductById();
  }, [slug, id]);

  const fetchProductById = async () => {
    try {
      const response = await getProductById(id);
      // console.log(response);
      setProduct(response.data);
      setSelectedImage(response.data.images[0].thumbnail);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const galleryImages = product.images.map((image) => ({
    original: image.thumbnail,
    thumbnail: image.thumbnail,
  }));

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
        <button className="buy-now">
          <span className="maintext">MUA NGAY</span>
          <span className="subtext">Giao tận nơi hoặc nhận tại cửa hàng</span>
        </button>
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

export default ProductDetail;
