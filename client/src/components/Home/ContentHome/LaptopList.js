import React from "react";
import "./LaptopList.scss";
import laptop1 from "../../../assets/laptop1.png";
import { FaTruck, FaStar } from "react-icons/fa";
import { Carousel } from "primereact/carousel";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const LaptopList = () => {
  const products = [
    {
      name: "Laptop gaming Acer Nitro 5 Tiger AN515 58 GB598J",
      image: laptop1,
      cpu: "i5-12450H",
      gpu: "RTX 3050",
      ram: "8 GB",
      storage: "512 GB",
      display: "15.6 inch FHD @ 144 Hz",
      originalPrice: "₫24.990.000đ",
      discountPrice: "₫19.990.000đ",
      discountPercentage: "-20%",
      ratingScore: "0.0",
      ratingReviews: "(0 đánh giá)",
    },
    {
      name: "Laptop gaming Acer Nitro V ANVI15 51 588AN",
      image: laptop1,
      cpu: "i7-13620H",
      gpu: "RTX 2050",
      ram: "16 GB",
      storage: "512 GB",
      display: "15.6 inch FHD @ 144 Hz",
      originalPrice: "₫25.990.000đ",
      discountPrice: "₫23.990.000đ",
      discountPercentage: "-8%",
      ratingScore: "0.0",
      ratingReviews: "(0 đánh giá)",
    },
    {
      name: "Laptop gaming Acer Nitro V ANVI15 51 588AN",
      image: laptop1,
      cpu: "i7-13620H",
      gpu: "RTX 2050",
      ram: "16 GB",
      storage: "512 GB",
      display: "15.6 inch FHD @ 144 Hz",
      originalPrice: "₫25.990.000đ",
      discountPrice: "₫23.990.000đ",
      discountPercentage: "-8%",
      ratingScore: "0.0",
      ratingReviews: "(0 đánh giá)",
    },
    {
      name: "Laptop gaming Acer Nitro V ANVI15 51 588AN",
      image: laptop1,
      cpu: "i7-13620H",
      gpu: "RTX 2050",
      ram: "16 GB",
      storage: "512 GB",
      display: "15.6 inch FHD @ 144 Hz",
      originalPrice: "₫25.990.000đ",
      discountPrice: "₫23.990.000đ",
      discountPercentage: "-8%",
      ratingScore: "0.0",
      ratingReviews: "(0 đánh giá)",
    },
    {
      name: "Laptop gaming Acer Nitro V ANVI15 51 588AN",
      image: laptop1,
      cpu: "i7-13620H",
      gpu: "RTX 2050",
      ram: "16 GB",
      storage: "512 GB",
      display: "15.6 inch FHD @ 144 Hz",
      originalPrice: "₫25.990.000đ",
      discountPrice: "₫23.990.000đ",
      discountPercentage: "-8%",
      ratingScore: "0.0",
      ratingReviews: "(0 đánh giá)",
    },
    {
      name: "Laptop gaming Acer Nitro V ANVI15 51 588AN",
      image: laptop1,
      cpu: "i7-13620H",
      gpu: "RTX 2050",
      ram: "16 GB",
      storage: "512 GB",
      display: "15.6 inch FHD @ 144 Hz",
      originalPrice: "₫25.990.000đ",
      discountPrice: "₫23.990.000đ",
      discountPercentage: "-8%",
      ratingScore: "0.0",
      ratingReviews: "(0 đánh giá)",
    },
  ];

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (product) => {
    return (
      <div className="laptop-card">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">
            <span className="cpu">{product.cpu}</span>
            <span className="gpu">{product.gpu}</span>
            <span className="ram">{product.ram}</span>
            <span className="storage">{product.storage}</span>
            <span className="display">{product.display}</span>
          </p>
          <div className="product-price">
            <span className="original-price">{product.originalPrice}</span>
            <span className="discount-price">
              {product.discountPrice}{" "}
              <span className="discount-percentage">
                {product.discountPercentage}
              </span>
            </span>
          </div>
          <div className="product-rating">
            <span className="rating-score">
              {product.ratingScore}
              <FaStar
                style={{
                  fontSize: "13px",
                  marginLeft: "3px",
                  marginBottom: "4px",
                }}
              />
            </span>
            <span className="rating-reviews">{product.ratingReviews}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="product-container">
      <div className="tilte-product">
        <span>Laptop gaming bán chạy</span>
        <div className="br"></div>
        <span className="ship">
          <FaTruck
            style={{
              color: "#FF3C53",
              fontSize: "20px",
              marginRight: "10px",
              marginBottom: "3px",
            }}
          />
          Miễn phí giao hàng
        </span>
        <p>Xem tất cả</p>
      </div>
      <div className="product-list">
        <Carousel
          value={products}
          numScroll={1}
          numVisible={5}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
        />
      </div>
    </div>
  );
};

export default LaptopList;
