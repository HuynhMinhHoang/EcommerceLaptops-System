import React from "react";
import "./CategoryCollections.scss";

import collection_pc from "../../../assets/collection-pc.png";
import collection_sale from "../../../assets/collection-pc2.png";
import collection_pc3 from "../../../assets/collection-pc3.png";
import collection_pc4 from "../../../assets/collection-pc4.png";
import collection_pc5 from "../../../assets/collection-pc5.png";

import Carousel from "react-bootstrap/Carousel";
import FilterBar from "./FilterBar";

const CategoryCollections = () => {
  return (
    <div className="collection-list-container">
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

      <nav className="filter-bar-container">
        <div className="filter-bar-container-inner">
          <FilterBar />
        </div>

        <div className="product-list-container">
            
        </div>
      </nav>
    </div>
  );
};

export default CategoryCollections;
