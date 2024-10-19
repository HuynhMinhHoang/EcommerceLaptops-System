import React from "react";
import "./ProductReview.scss";
import Rating from "@mui/material/Rating";

const ProductReview = ({ product }) => {
  return (
    <div className="product-review">
      <div className="product-heading">
        <h2>Đánh giá & Nhận xét {product.nameProduct}</h2>
      </div>

      <div className="bg-review-container">
        <div className="content-left">
          <div>
            <span className="score">4.5/5</span>
            <div className="card">
              <Rating
                name="half-rating-read"
                defaultValue={2.5}
                precision={0.1}
                readOnly
              />
              <p>
                <span>(9)</span> đánh giá và nhận xét
              </p>
            </div>
          </div>
        </div>

        <div className="content-right">content-right</div>
      </div>
    </div>
  );
};

export default ProductReview;
