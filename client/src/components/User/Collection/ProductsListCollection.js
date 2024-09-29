import React, { useEffect, useState } from "react";
import "./ProductsListCollection.scss";
import { FaStar } from "react-icons/fa";
import { getListProductHome } from "../../../service/APIService";
import { FaLaptop } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/Constants";
import categories from "../../../utils/categoriesProduct";

const ProductsListConllection = ({ category }) => {
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchProductList();
  }, [category]);

  const fetchProductList = async () => {
    try {
      const response = await getListProductHome(category);
      setProductList(response.data.data);
    } catch (error) {
      console.log("Error fetching laptop list");
    }
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const productTemplate = (product) => {
    const descriptionLines = product.description
      ? product.description.split(",")
      : [];

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

    const handleClickDetail = (id, name) => {
      const slug = slugify(name);
      navigate(`${path.PRODUCT_DETAIL.replace(":slug", slug)}`, {
        state: { id },
      });
    };

    return (
      <div
        className="laptop-card"
        onClick={() => {
          handleClickDetail(product.idProduct, product.nameProduct);
        }}
      >
        <div className="product-image">
          <img src={product.images[0]?.thumbnail} alt={product.nameProduct} />
        </div>
        <div className="product-info">
          <h3
            className={
              category === categories.MOUSE || categories.KEYBOARD
                ? "product-name-mouse"
                : "product-name"
            }
          >
            {product.nameProduct}
          </h3>
          <p
            className={
              category === categories.MOUSE || category === categories.KEYBOARD
                ? "product-description-mouse"
                : "product-description"
            }
          >
            <span className="category">
              <FaLaptop
                style={{
                  fontSize: "15px",
                  marginRight: "5px",
                  marginBottom: "4px",
                }}
              />
              {product.category?.nameCategory}
            </span>
            <span className="cpu">
              {descriptionLines.map((line, index) => (
                <React.Fragment key={index}>
                  {line.trim()}
                  {index < descriptionLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
          </p>
          <div className="product-price">
            <span className="discount-price">
              {formatCurrency(product.price)}{" "}
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
    );
  };

  console.log("productList", productList);

  return (
    <div className="product-container">
      <div className="product-list-grid">
        {Array.isArray(productList) &&
          productList.map((product) => (
            <div className="item-product-collection" key={product.idProduct}>
              {productTemplate(product)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductsListConllection;
