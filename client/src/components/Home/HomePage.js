import React, { useRef } from "react";
import "./HomePage.scss";
import BannerCarousel from "./ContentHome/BannerCarousel";

import CategoryMenu from "./ContentHome/CategoryMenu";
import picture1 from "../../assets/picture1.png";
import picture2 from "../../assets/picture2.png";
import banner6 from "../../assets/banner6.png";
import banner7 from "../../assets/banner7.png";
import ProductList from "./ContentHome/ProductList";
import PCList from "./ContentHome/PCList";
import pic1 from "../../assets/pic1.png";
import pic2 from "../../assets/pic2.png";
import pic3 from "../../assets/pic3.png";
import CategoryList from "./ContentHome/CategoryList";
import SubList from "./SubList";
import categories from "../../utils/categoriesProduct";

const HomePage = () => {
  const laptopGamingRef = useRef(null);
  const laptopRef = useRef(null);
  const pcRef = useRef(null);
  const mouseRef = useRef(null);
  const keyboardRef = useRef(null);

  const handleScrollTo = (ref) => {
    if (ref.current) {
      const offsetPosition = ref.current.offsetTop - 210;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="homepage-container">
      <div className="content-main">
        <div className="category-container">
          <CategoryMenu
            onMenuItemClick={(category) => {
              switch (category) {
                case categories.LAPTOPGAMING:
                  handleScrollTo(laptopGamingRef);
                  break;
                case categories.LAPTOP:
                  handleScrollTo(laptopRef);
                  break;
                case categories.PC:
                  handleScrollTo(pcRef);
                  break;
                case categories.MOUSE:
                  handleScrollTo(mouseRef);
                  break;
                case categories.KEYBOARD:
                  handleScrollTo(keyboardRef);
                  break;
                default:
                  break;
              }
            }}
          />
        </div>

        <div className="banner-container">
          <BannerCarousel />
        </div>

        <div className="ad-container">
          <img src={banner6} alt="banner6" />
          <img src={banner7} alt="banner7" />
        </div>
      </div>
      <div ref={pcRef} className="product-pc-list">
        <PCList />
      </div>
      <div className="picture-list">
        <div className="bg-img">
          <img src={picture1} alt="picture1" />
          <img src={picture2} alt="picture2" />
        </div>
      </div>
      <div ref={laptopGamingRef} className="product-laptopGM-list">
        <ProductList category={categories.LAPTOPGAMING} />
      </div>
      <div ref={laptopRef} className="product-laptop-list">
        <ProductList category={categories.LAPTOP} />
      </div>
      <div className="banner-sale">
        <div className="bg-img1">
          <img src={pic1} alt="pic1" />
        </div>

        <div className="bg-img2">
          <img src={pic2} alt="pic1" />
          <img src={pic3} alt="pic1" />
        </div>
      </div>
      <div ref={mouseRef} className="product-mouse-list">
        <ProductList category={categories.MOUSE} />
      </div>
      <div ref={keyboardRef} className="product-keyboard-list">
        <ProductList category={categories.KEYBOARD} />
      </div>
      <div className="category-list">
        <CategoryList />
      </div>
    </div>
  );
};

export default HomePage;
