import React, { useState } from "react";
import "./FilterBar.scss";

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: "",
    price: "",
    category: "",
    ram: "",
    screenSize: "",
    processor: "",
    resolution: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   [name]: value,
    // }));
    // onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="filter-bar">
      <select name="status" onChange={handleFilterChange}>
        <option value="">Tình trạng sản phẩm</option>
        <option value="true">Còn hàng</option>
        <option value="false">Hết hàng</option>
      </select>
      <select name="price" onChange={handleFilterChange}>
        <option value="">Giá</option>
        <option value="low">Thấp đến cao</option>
        <option value="high">Cao đến thấp</option>
      </select>
      <select name="screenSize" onChange={handleFilterChange}>
        <option value="">Kích thước màn hình</option>
        <option value="14 inch">14 inch</option>
        <option value="15.6 inch">15.6 inch</option>
        <option value="16 inch">16 inch</option>
        <option value="18 inch">18 inch</option>
      </select>
      <select name="processor" onChange={handleFilterChange}>
        <option value="">Bộ xử lý</option>
        <option value="i3">Intel i3</option>
        <option value="i5">Intel i5</option>
        <option value="i7">Intel i7</option>
        <option value="i9">Intel i9</option>
        <option value="R5">AMD Ryzen 5</option>
        <option value="R7">AMD Ryzen 7</option>
        <option value="R9">AMD Ryzen 9</option>
      </select>
      <select name="ram" onChange={handleFilterChange}>
        <option value="">RAM</option>
        <option value="8GB">8GB</option>
        <option value="16GB">16GB</option>
        <option value="32GB">32GB</option>
      </select>
      <select name="resolution" onChange={handleFilterChange}>
        <option value="">Độ phân giải</option>
        <option value="FHD">FHD</option>
        <option value="2K">2K</option>
        <option value="2.5K">2.5K</option>
        <option value="3.2K">3.2K</option>
        <option value="UHD">UHD</option>
      </select>
    </div>
  );
};

export default FilterBar;
