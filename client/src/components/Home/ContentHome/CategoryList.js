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

const categories = [
  { img: cate1, name: "Laptop" },
  { img: cate2, name: "PC" },
  { img: cate3, name: "Màn hình" },
  { img: cate8, name: "Mainboard" },
  { img: cate9, name: "CPU" },
  { img: cate10, name: "VGA" },
  { img: cate11, name: "RAM" },
  { img: cate4, name: "Bàn phím" },
  { img: cate5, name: "Chuột" },
  { img: cate6, name: "Ghế" },
  { img: cate7, name: "Tai nghe" },
  { img: cate12, name: "Console" },
];

const CategoryList = () => {
  const navigate = useNavigate();

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleCategoryClick = (categoryName) => {
    const formattedCategory = removeDiacritics(
      categoryName.toLowerCase().replace(/\s+/g, "-")
    );
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
            onClick={() => handleCategoryClick(category.name)}
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
