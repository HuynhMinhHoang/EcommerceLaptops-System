import React, { useEffect, useState } from "react";
import "./PCList.scss";
import pc1 from "../../../assets/pc.png";
import { FaTruck, FaStar } from "react-icons/fa";
import { Carousel } from "primereact/carousel";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { AiFillThunderbolt } from "react-icons/ai";
import { getListProductHome } from "../../../service/APIService";
import banner_pc from "../../../assets/banner-pc.png";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/Constants";

const PCList = () => {
  const navigate = useNavigate();

  const [PCList, setPCList] = useState();

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
    fetchPCList();
  }, []);

  const fetchPCList = async () => {
    try {
      const response = await getListProductHome("PC");
      setPCList(response.data.data);
      // console.log("====", response.data.data);
    } catch (error) {
      console.log("Error fetching pc list");
    }
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

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

  const productTemplate = (product) => {
    return (
      <div
        className="pc-card"
        onClick={() => {
          handleClickDetail(product.idProduct, product.nameProduct);
        }}
      >
        <div className="product-image">
          <img src={product.images[0]?.thumbnail} alt={product.nameProduct} />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.nameProduct}</h3>
          <div className="product-price">
            <span className="discount-price">
              {formatCurrency(product.price)}
              <span className="discount-percentage">-0%</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="product-pc-container">
      <div className="tilte-product">
        <span>
          <AiFillThunderbolt className="pulse-icon" />
          DEAL SỐC - GIÁ HỜI
        </span>
        <p>Flash Sale</p>
      </div>
      <div className="product-list-pc">
        <div className="bg-banner-pc">
          <img src={banner_pc} alt="banner_pc" />
        </div>

        <div className="bg-carousel">
          <Carousel
            value={PCList}
            numScroll={1}
            numVisible={4}
            responsiveOptions={responsiveOptions}
            itemTemplate={productTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default PCList;
