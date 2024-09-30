import React, { useEffect, useState } from "react";
import "./CategoryCollections.scss";
import { NavLink, useParams } from "react-router-dom";
import collection_pc from "../../../assets/collection-pc.png";
import collection_sale from "../../../assets/collection-pc2.png";
import collection_pc3 from "../../../assets/collection-pc3.png";
import collection_pc4 from "../../../assets/collection-pc4.png";
import collection_pc5 from "../../../assets/collection-pc5.png";
import Carousel from "react-bootstrap/Carousel";
import FilterBar from "./FilterBar";
import { path } from "../../../utils/Constants";
import { TiHome } from "react-icons/ti";
import ProductsListCollection from "./ProductsListCollection";

const CategoryCollections = () => {
  const { category } = useParams();
  const [originalName, setOriginalName] = useState("");
  const [filters, setFilters] = useState({
    manufacturer: [],
    usage: [],
    priceRange: "",
    sortOrder: "",
  });

  useEffect(() => {
    if (category) {
      setOriginalName(category);
    }
  }, [category]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="collection-list-container">
      <div className="container-fluid">
        <ol className="breadcrumb">
          <li>
            <NavLink to={path.HOMEPAGE}>
              <TiHome
                style={{
                  color: "#1982f9",
                  fontSize: "21px",
                  marginRight: "5px",
                  marginBottom: "3px",
                }}
              />
              <span>Trang chủ</span>
            </NavLink>
          </li>
          <li>
            <span>{originalName}</span>
          </li>
        </ol>
      </div>

      <div className="banner-collection">
        <Carousel>
          <Carousel.Item>
            <img src={collection_pc} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={collection_pc3} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={collection_pc4} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={collection_pc5} alt="Second slide" />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="collection-sale">
        <div className="collection-intro">
          <img src={collection_sale} alt="collection" />
        </div>
      </div>

      <nav className="content-collection-container">
        <div className="filter-bar-container-inner">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        <div className="product-list-collection-container">
          <ProductsListCollection category={category} filters={filters} />
        </div>
      </nav>
    </div>
  );
};

export default CategoryCollections;
