import React, { useEffect, useState } from "react";
import "./ProductSimilar.scss";
import { getListProductHome } from "../../../service/APIService";
import { FaTruck, FaStar } from "react-icons/fa";
import categories from "../../../utils/categoriesProduct";

const ProductSimilar = ({ product, category }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await getListProductHome(category);
      setProductList(getRandomProducts(response.data.data, 3));
    } catch (error) {
      console.log("Error fetching laptop list");
    }
  };

  const getRandomProducts = (products, count) => {
    let shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="product-similar">
      <div className="product-heading">
        <h2>Sản phẩm tương tự</h2>
      </div>
      <div className="product-list">
        {productList.map((p) => (
          <div key={p.idProduct} className="product-item">
            <img src={p.images[0].thumbnail} alt={p.nameProduct} />
            <div className="product-info">
              <h3>{p.nameProduct}</h3>
              <p className="product-price">{formatPrice(p.price)}</p>
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
        ))}
      </div>
    </div>
  );
};

export default ProductSimilar;
