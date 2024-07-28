import React from "react";
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

const CategoryList = () => {
  return (
    <div className="category-list-container">
      <div className="tilte-product">
        <span>Danh mục sản phẩm</span>
      </div>

      <div className="bg-category">
        <div className="item">
          <div className="item-img">
            <img src={cate1} alt="laptop" />
          </div>
          <div className="item-tilte">
            <span>Laptop</span>
          </div>
        </div>

        <div className="item">
          <div className="item-img">
            <img src={cate2} alt="laptop" />
          </div>
          <div className="item-tilte">
            <span>PC</span>
          </div>
        </div>

        <div className="item">
          <div className="item-img">
            <img src={cate3} alt="laptop" />
          </div>
          <div className="item-tilte">
            <span>Màn hình</span>
          </div>
        </div>

        <div className="item">
          <div className="item-img">
            <img src={cate8} alt="laptop" />
          </div>
          <div className="item-tilte">
            <span>Mainboard</span>
          </div>
        </div>

        <div className="item">
          <div className="item-img">
            <img src={cate9} alt="laptop" />
          </div>
          <div className="item-tilte">
            <span>CPU</span>
          </div>
        </div>

        <div className="item">
          <div className="item-img">
            <img src={cate10} alt="laptop" />
          </div>
          <div className="item-tilte">
            <span>VGA</span>
          </div>
        </div>

        <div className="item">
          <div className="item-img">
            <img src={cate11} alt="laptop" />
          </div>
          <div className="item-tilte">
            <span>RAM</span>
          </div>
        </div>

        <div className="item">
          <div className="item-img">
            <img src={cate4} alt="laptop" />
          </div>
          <div className="item-tilte">
            <span>Bàn phím</span>
          </div>
        </div>

        <div className="item">
          <div className="item-img">
            <img src={cate5} alt="laptop" />
          </div>
          <div className="item-tilte">
            <span>Chuột</span>
          </div>
        </div>

        <div className="item">
          <div className="item-img">
            <img src={cate6} alt="laptop" />
          </div>
          <div className="item-tilte">
            <span>Ghế</span>
          </div>
        </div>

        <div className="item">
          <div className="item-img">
            <img src={cate7} alt="laptop" />
          </div>
          <div className="item-tilte">
            <span>Tai nghe</span>
          </div>
        </div>

        <div className="item">
          <div className="item-img">
            <img src={cate12} alt="laptop" />
          </div>
          <div className="item-tilte">
            <span>Console</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
