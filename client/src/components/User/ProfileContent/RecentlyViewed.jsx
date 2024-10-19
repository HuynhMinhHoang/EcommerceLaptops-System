import React, { useEffect, useState } from "react";
import "./RecentlyViewed.scss";
import { FaLaptop, FaStar } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { path } from "../../../utils/Constants";

const RecentlyViewed = () => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const products =
      JSON.parse(localStorage.getItem("recentlyViewProduct")) || [];

    setRecentlyViewedProducts(products);
  }, []);

  const handleClickDetail = (id, name) => {
    const slugify = (text) => {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    };
    const slug = slugify(name);
    navigate(`${path.PRODUCT_DETAIL.replace(":slug", slug)}`, {
      state: { id },
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="recently-viewed">
      <div className="bg-heading">
        <h3>Sản phẩm đã xem</h3>
      </div>

      {recentlyViewedProducts.length === 0 ? (
        <div className="bg-empty-cart">
          <div className="empty-cart">
            <h3>Quý khách chưa xem sản phẩm nào!</h3>

            <div className="btn-goHome">
              <NavLink to={path.HOMEPAGE}>
                <button>Tiếp tục mua hàng</button>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="product-recently-viewed">
          {recentlyViewedProducts.map((product) => (
            <div className="item-product-collection" key={product.idProduct}>
              <div
                className="product-card"
                onClick={() => {
                  handleClickDetail(product.idProduct, product.nameProduct);
                }}
              >
                <div className="product-image">
                  <img
                    src={product.images[0]?.thumbnail}
                    alt={product.nameProduct}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.nameProduct}</h3>
                  <div className="product-price-rating">
                    <div className="product-price">
                      <span className="discount-price">
                        {formatCurrency(product.price)}
                        <span className="discount-percentage">-0%</span>
                      </span>
                    </div>
                    <div className="product-rating">
                      <span className="rating-score">
                        0.0
                        <FaStar
                          style={{
                            fontSize: "13px",
                            marginLeft: "3px",
                            marginBottom: "4px",
                          }}
                        />
                      </span>
                      <span className="rating-reviews">(0 đánh giá)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
