import React from "react";
import "./PCList.scss";
import pc1 from "../../../assets/pc.png";
import { FaTruck, FaStar } from "react-icons/fa";
import { Carousel } from "primereact/carousel";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { AiFillThunderbolt } from "react-icons/ai";

const PCList = () => {
  const products = [
    {
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      image: pc1,
      originalPrice: "₫36.990.000đ",
      discountPrice: "₫30.990.000đ",
      discountPercentage: "-20%",
    },
    {
      name: "PC GVN x MSI Dragon X White (Intel i7-14700K/ VGA RTX 4080 Super)",
      image: pc1,
      originalPrice: "74.620.000₫",
      discountPrice: "73.990.000đ",
      discountPercentage: "-1%",
    },
    {
      name: "PC GVN x MSI Dragon ACE (Intel i9-14900K/ VGA RTX 4080 Super)",
      image: pc1,
      originalPrice: "84.620.000₫",
      discountPrice: "83.990.000đ",
      discountPercentage: "-1%",
    },
    {
      name: "PC GVN x ASUS Back to Future (Intel i7-14700K/ VGA RTX 4070 Ti Super)",
      image: pc1,
      originalPrice: "69.990.000₫",
      discountPrice: "71.220.000đ",
      discountPercentage: "-2%",
    },
    {
      name: "PC GVN x MSI Dragon X White (Intel i7-14700K/ VGA RTX 4080 Super)",
      image: pc1,
      originalPrice: "73.990.000đ",
      discountPrice: "74.620.000đ",
      discountPercentage: "-2%",
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
      <div className="pc-card">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          {/* <p className="product-description">
          </p> */}
          <div className="product-price">
            <span className="original-price">{product.originalPrice}</span>
            <span className="discount-price">
              {product.discountPrice}{" "}
              <span className="discount-percentage">
                {product.discountPercentage}
              </span>
            </span>
          </div>
          {/* <div className="product-rating">
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
          </div> */}
        </div>
      </div>
    );
  };

  return (
    <div className="product-pc-container">
      <div className="tilte-product">
        <span>
          <AiFillThunderbolt className="pulse-icon" />
          DEAL SỐC - GIÁ HỜI
        </span>
        <p>Flash Sale</p>
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

export default PCList;
