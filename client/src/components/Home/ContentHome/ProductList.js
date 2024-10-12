import React, { useEffect, useState } from "react";
import "./ProductList.scss";
import laptop1 from "../../../assets/laptop1.png";
import { FaTruck, FaStar } from "react-icons/fa";
import { Carousel } from "primereact/carousel";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { getListProductHome } from "../../../service/APIService";
import { HiMiniCpuChip } from "react-icons/hi2";
import { FaLaptop } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/Constants";
import categories from "../../../utils/categoriesProduct";

const ProductList = ({ category }) => {
  const navigate = useNavigate();

  const [productList, setProductList] = useState();

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

  useEffect(() => {
    fetchProductList();
  }, [category]);

  const fetchProductList = async () => {
    try {
      const response = await getListProductHome(category);
      setProductList(response.data.data);
      // console.log("====", response.data.data);
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

  const capitalizeWords = (string) => {
    if (typeof string !== "string") return "";
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  const handleCategoryClick = (category) => {
    navigate(`${path.CATEGORY_COLLECTIONS.replace(":category", category)}`, {
      state: { key: "key" },
    });
  };
  return (
    <div className="product-container">
      <div className="tilte-product">
        {category === categories.MOUSE ? (
          <span>Chuột bán chạy</span>
        ) : category === categories.KEYBOARD ? (
          <span>Bàn phím bán chạy</span>
        ) : (
          <span>{capitalizeWords(category)} bán chạy</span>
        )}

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
          {category === categories.MOUSE || category === categories.KEYBOARD
            ? "Giao hàng toàn quốc"
            : "Miễn phí giao hàng"}
        </span>
        <p onClick={() => handleCategoryClick(category)}>Xem tất cả</p>
      </div>
      <div className="product-list">
        <Carousel
          value={productList}
          numScroll={1}
          numVisible={5}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
        />
      </div>
    </div>
  );
};

export default ProductList;
