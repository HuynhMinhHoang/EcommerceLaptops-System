import React, { useState, useEffect } from "react";
import "./FilterBar.scss";
import { Backdrop, Button, CircularProgress } from "@mui/material";

const FilterBar = ({ onFilterChange }) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    manufacturer: [],
    usage: [],
    priceRange: "",
    sortOrder: "",
  });

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => {
      let newValues;
      if (checked) {
        newValues = [value];
      } else {
        newValues = [];
      }
      return { ...prevFilters, [name]: newValues };
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      manufacturer: [],
      usage: [],
      priceRange: "",
      sortOrder: "",
    });
  };

  useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      onFilterChange(filters);
    }, 500);
  }, [filters, onFilterChange]);

  return (
    <>
      <div className="filter-bar">
        <div className="filter-group">
          <h4>Hãng sản xuất</h4>
          {["Asus", "Lenovo", "Dell", "LG", "Acer"].map((brand) => (
            <label key={brand}>
              <input
                type="checkbox"
                name="manufacturer"
                value={brand}
                onChange={handleCheckboxChange}
                checked={filters.manufacturer.includes(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
        <div className="filter-group">
          <h4>Mục đích sử dụng</h4>
          {["Gaming", "Văn phòng"].map((usage) => (
            <label key={usage}>
              <input
                type="checkbox"
                name="usage"
                value={usage}
                onChange={handleCheckboxChange}
                checked={filters.usage.includes(usage)}
              />
              {usage}
            </label>
          ))}
        </div>
        <div className="filter-group">
          <h4>Mức giá</h4>
          {[
            "Dưới 10 triệu",
            "Từ 10 - 15 triệu",
            "Từ 15 - 20 triệu",
            "Trên 20 triệu",
          ].map((price) => (
            <label key={price}>
              <input
                type="radio"
                name="priceRange"
                value={price}
                onChange={handleRadioChange}
                checked={filters.priceRange === price}
              />
              {price}
            </label>
          ))}
        </div>
        <div className="filter-group">
          <h4>Sắp xếp</h4>
          {["Giá tăng dần", "Giá giảm dần", "Không sắp xếp"].map((sort) => (
            <label key={sort}>
              <input
                type="radio"
                name="sortOrder"
                value={sort}
                onChange={handleRadioChange}
                checked={filters.sortOrder === sort}
              />
              {sort}
            </label>
          ))}
        </div>
        <Button variant="contained" color="error" onClick={handleReset}>
          Reset Filter
        </Button>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default FilterBar;
