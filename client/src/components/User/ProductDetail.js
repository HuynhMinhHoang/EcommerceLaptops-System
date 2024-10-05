import React, { useEffect, useRef, useState } from "react";
import "./ProductDetail.scss";
import { getProductById } from "../../service/APIService";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { TiHome } from "react-icons/ti";

import "react-image-gallery/styles/css/image-gallery.css";
import ProductInfo from "./DetailContent/ProductInfo";
import ProductDescription from "./DetailContent/ProductDescription";
import ProductSimilar from "./DetailContent/ProductSimilar";
import qc1 from "../../assets/qc1.png";
import qc2 from "../../assets/qc2.png";
import { path } from "../../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import NotificationAddProduct from "./DetailContent/NotificationAddProduct";
import { ThreeDots } from "react-loader-spinner";
import ProductReview from "./DetailContent/ProductReview";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const bannerLeftRef = useRef(null);
  const bannerRightRef = useRef(null);

  const { slug } = useParams();
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (bannerLeftRef.current && bannerRightRef.current) {
        bannerLeftRef.current.style.transform = `translateY(${
          scrollTop * 0.1
        }px)`;
        bannerRightRef.current.style.transform = `translateY(${
          scrollTop * 0.1
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slug, id]);

  const fetchProductById = async (productId) => {
    try {
      const response = await getProductById(productId);
      // console.log("Product:", response.data);
      setProduct(response.data);

      //add recently viewed local storage
      let recentlyViewed =
        JSON.parse(localStorage.getItem("recentlyViewProduct")) || [];

      if (!Array.isArray(recentlyViewed)) {
        recentlyViewed = [];
      }

      recentlyViewed = recentlyViewed.filter((p) => p.idProduct !== productId);

      recentlyViewed.push(response.data);

      localStorage.setItem(
        "recentlyViewProduct",
        JSON.stringify(recentlyViewed)
      );
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  if (!product) {
    return (
      <div className="bg-loading-product">
        <ThreeDots
          visible={true}
          height="50"
          width="50"
          color="#ec001c"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="pro-detail-container">
      <div className="banner-left" ref={bannerLeftRef}>
        <img src={qc1} alt="Banner Left" />
      </div>
      <div className="banner-right" ref={bannerRightRef}>
        <img src={qc2} alt="Banner Right" />
      </div>

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
            <span>{product.category.nameCategory}</span>
          </li>
          <li>
            <span>{product.nameProduct}</span>
          </li>
        </ol>
      </div>

      <div className="pro-info">
        <ProductInfo product={product} />
      </div>

      <div className="pro-description">
        <div className="bg-left">
          <ProductDescription product={product} />
        </div>
        <div className="bg-right">
          <div className="similar">
            <ProductSimilar
              product={product}
              category={product.category.nameCategory}
            />
          </div>
        </div>
      </div>

      <div className="pro-review">
        <ProductReview product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
