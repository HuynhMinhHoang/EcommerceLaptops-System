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
import banner6 from "../../assets/banner6.png";
import banner7 from "../../assets/banner7.png";
import banner8 from "../../assets/banner8.png";
import banner9 from "../../assets/banner9.png";
import banner10 from "../../assets/banner10.png";
import LaptopList from "./ContentHome/LaptopList";

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
          {/* <img src={banner8} alt="banner8" /> */}
          {/* <img src={banner9} alt="banner9" /> */}
          {/* <img src={banner10} alt="banner10" /> */}
        </div>
      </div>

      <div className="product-list-main">
        <LaptopList />
      </div>
    </div>
  );
};

export default HomePage;
