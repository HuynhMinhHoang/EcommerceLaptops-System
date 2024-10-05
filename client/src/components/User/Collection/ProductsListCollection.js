import React, { useEffect, useState } from "react";
import "./ProductsListCollection.scss";
import { FaStar } from "react-icons/fa";
import { getListProductHome } from "../../../service/APIService";
import { FaLaptop } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/Constants";
import categories from "../../../utils/categoriesProduct";

const ProductsListConllection = ({ category, filters }) => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await getListProductHome(category);
        let products = response.data.data;
        if (category === categories.LAPTOP) {
          const gamingResponse = await getListProductHome(
            categories.LAPTOPGAMING
          );
          products = products.concat(gamingResponse.data.data);
        }
        setProductList(products);
      } catch (error) {
        console.log("Error fetching product list");
      }
    };
    fetchProductList();
  }, [category]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = productList;

      if (filters.manufacturer.length > 0) {
        filtered = filtered.filter((product) =>
          filters.manufacturer.some((brand) =>
            product.nameProduct.toLowerCase().includes(brand.toLowerCase())
          )
        );
      }

      if (filters.usage.length > 0) {
        filtered = filtered.filter((product) =>
          filters.usage.some((use) => {
            if (use === "Gaming") {
              return product.nameProduct.toLowerCase().includes("gaming");
            } else if (use === "Văn phòng") {
              return !product.nameProduct.toLowerCase().includes("gaming");
            }
            return true;
          })
        );
      }

      if (filters.priceRange) {
        filtered = filtered.filter((product) => {
          const price = product.price;
          switch (filters.priceRange) {
            case "Dưới 10 triệu":
              return price < 10000000;
            case "Từ 10 - 15 triệu":
              return price >= 10000000 && price <= 15000000;
            case "Từ 15 - 20 triệu":
              return price >= 15000000 && price <= 20000000;
            case "Trên 20 triệu":
              return price > 20000000;
            default:
              return true;
          }
        });
      }

      if (filters.sortOrder) {
        filtered = filtered.sort((a, b) => {
          if (filters.sortOrder === "Giá tăng dần") {
            return a.price - b.price;
          } else if (filters.sortOrder === "Giá giảm dần") {
            return b.price - a.price;
          }
          return 0;
        });
      }

      if (filters.availability) {
        filtered = filtered.filter((product) => {
          if (filters.availability === "Còn hàng") {
            return product.quantity > 0;
          } else if (filters.availability === "Hết hàng") {
            return product.quantity === 0;
          }
          return true;
        });
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filters, productList]);

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

  return (
    <div className="product-list-grid">
      {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div className="item-product-collection" key={product.idProduct}>
            {productTemplate(product)}
          </div>
        ))
      ) : (
        <div className="no-products-message">Không có sản phẩm phù hợp!</div>
      )}
    </div>
  );
};

export default ProductsListConllection;
