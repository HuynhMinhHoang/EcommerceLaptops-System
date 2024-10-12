import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryList.scss";
import cate1 from "../../../assets/cate1.png";
import cate2 from "../../../assets/cate2.png";
import cate3 from "../../../assets/cate3.png";
import cate4 from "../../../assets/cate4.png";
import cate5 from "../../../assets/cate5.png";
import cate6 from "../../../assets/cate6.png";
import cate7 from "../../../assets/cate7.png";
import cate8 from "../../../assets/cate8.png";
import cate9 from "../../../assets/cate9.png";
import cate10 from "../../../assets/cate10.png";
import cate11 from "../../../assets/cate11.png";
import cate12 from "../../../assets/cate12.png";
import { path } from "../../../utils/Constants";
import categoriesProduct from "../../../utils/categoriesProduct";

const categories = [
  { img: cate1, key: categoriesProduct.LAPTOP, name: "Laptop" },
  { img: cate2, key: categoriesProduct.PC, name: "PC" },
  { img: cate3, key: categoriesProduct.PC, name: "Màn hình" },
  { img: cate8, key: categoriesProduct.PC, name: "Mainboard" },
  { img: cate9, key: categoriesProduct.PC, name: "CPU" },
  { img: cate10, key: categoriesProduct.PC, name: "VGA" },
  { img: cate11, key: categoriesProduct.PC, name: "RAM" },
  { img: cate4, key: categoriesProduct.KEYBOARD, name: "Bàn phím" },
  { img: cate5, key: categoriesProduct.MOUSE, name: "Chuột" },
  { img: cate6, key: categoriesProduct.PC, name: "Ghế Gaming" },
  { img: cate7, key: categoriesProduct.HEADPHONE, name: "Tai nghe" },
  { img: cate12, key: categoriesProduct.PC, name: "Console" },
];

const CategoryList = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    const formattedCategory = category.key.toUpperCase();
    navigate(
      `${path.CATEGORY_COLLECTIONS.replace(":category", formattedCategory)}`
    );
  };

  return (
    <div className="category-list-container">
      <div className="tilte-product">
        <span>Danh mục sản phẩm</span>
      </div>

      <div className="bg-category">
        {categories.map((category, index) => (
          <div
            className="item"
            key={index}
            onClick={() => handleCategoryClick(category)}
          >
            <div className="item-img">
              <img src={category.img} alt={category.name} />
            </div>
            <div className="item-tilte">
              <span>{category.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
