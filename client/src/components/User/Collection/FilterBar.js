import React from "react";
import "./FilterBar.scss";

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <select>
        <option>Tình trạng sản phẩm</option>
      </select>
      <select>
        <option>Giá</option>
      </select>
      <select>
        <option>Hãng</option>
      </select>
      <select>
        <option>RAM</option>
      </select>
      <select>
        <option>Xếp theo: Nổi bật</option>
      </select>
    </div>
  );
};

export default FilterBar;
