import React, { useEffect, useState } from "react";
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

const ProductDetail = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  const { slug } = useParams();
  const location = useLocation();
  const { id } = location.state || {};

  // const isShowNotifications = useSelector(
  //   (state) => state.cartRedux.isShowNotifications
  // );

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slug, id]);

  const fetchProductById = async (productId) => {
    try {
      const response = await getProductById(productId);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  // console.log("Loading product", product);

  return (
    <div className="pro-detail-container">
      <div
        className="banner-left"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <img src={qc1} alt="Banner Left" />
      </div>
      <div
        className="banner-right"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <img src={qc2} alt="Banner Right" />
      </div>

      {/* <div className="bg-noti-add">
        {isShowNotifications && (
          <NotificationAddProduct
            product={product}
            setStateNoti={(status) => {
              if (!status) {
                dispatch({ type: "HIDE_NOTIFICATION" });
              }
            }}
          />
        )}
      </div> */}

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
          {/* <div className="technology">Technology</div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
