import React from "react";
import "./HomePage.scss";
import BannerCarousel from "./ContentHome/BannerCarousel";
import { RxVideo } from "react-icons/rx";
import { SlCreditCard } from "react-icons/sl";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { TbCoins } from "react-icons/tb";
import { MdOutlineDiscount } from "react-icons/md";
import { BiCheckShield } from "react-icons/bi";
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

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="sub-header">
        <div className="sub-main">
          <ul>
            <li>
              <span>
                <MdOutlineDiscount
                  style={{
                    // color: "#303030",
                    fontSize: "21px",
                    marginRight: "5px",
                    transition: "0.3s",
                  }}
                />
              </span>
              <span>Săn Voucher GEARVN</span>
            </li>

            <li>
              <span>
                <HiOutlineClipboardDocumentList
                  style={{
                    // color: "#303030",
                    fontSize: "21px",
                    marginRight: "5px",
                    transition: "0.3s",
                  }}
                />
              </span>
              <span>Tin công nghệ</span>
            </li>

            <li>
              <span>
                <RxVideo
                  style={{
                    // color: "#303030",
                    fontSize: "21px",
                    marginRight: "5px",
                    transition: "0.3s",
                  }}
                />
              </span>
              <span>Video</span>
            </li>

            <li>
              <span>
                <SlCreditCard
                  style={{
                    // color: "#303030",
                    fontSize: "21px",
                    marginRight: "5px",
                    transition: "0.3s",
                  }}
                />
              </span>
              <span>Hướng dẫn thanh toán</span>
            </li>

            <li>
              <span>
                <TbCoins
                  style={{
                    // color: "#303030",
                    fontSize: "21px",
                    marginRight: "5px",
                    transition: "0.3s",
                  }}
                />
              </span>
              <span>Hướng dẫn trả góp</span>
            </li>

            <li>
              <span>
                <BiCheckShield
                  style={{
                    // color: "#303030",
                    fontSize: "21px",
                    marginRight: "5px",
                    transition: "0.3s",
                  }}
                />
              </span>
              <span>Tra cứu bảo hành</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="content-main">
        <div className="category-container">
          <CategoryMenu />
        </div>

        <div className="banner-container">
          <BannerCarousel />
        </div>

        <div className="ad-container">
          <img src={banner6} alt="banner6" />
          <img src={banner7} alt="banner7" />
        </div>
      </div>

      <div className="product-pc-list">
        <PCList />
      </div>

      <div className="picture-list">
        <div className="bg-img">
          <img src={picture1} alt="picture1" />
          <img src={picture2} alt="picture2" />
        </div>
      </div>

      <div className="product-laptopGM-list">
        <ProductList category={"LAPTOP GAMING"} />
      </div>

      <div className="product-laptop-list">
        <ProductList category={"LAPTOP"} />
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

      <div className="product-mouse-list">
        <ProductList category={"MOUSE"} />
      </div>

      <div className="product-keyboard-list">
        <ProductList category={"KEY BOARD"} />
      </div>

      <div className="category-list">
        <CategoryList />
      </div>
    </div>
  );
};

export default HomePage;
