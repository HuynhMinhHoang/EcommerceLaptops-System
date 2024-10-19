import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaUserFriends,
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { MdVerifiedUser, MdChat } from "react-icons/md";
import "./Footer.scss";
import ship1 from "../../assets/ship_1.png";
import ship2 from "../../assets/ship_2.png";
import ship3 from "../../assets/ship_3.png";
import ship4 from "../../assets/ship_4.png";

import pay1 from "../../assets/momo.png";
import pay2 from "../../assets/pay_1.png";
import pay3 from "../../assets/pay_5.png";

import icon1 from "../../assets/footer5.png";
import icon2 from "../../assets/footer1.png";
import icon3 from "../../assets/footer2.png";
import icon4 from "../../assets/footer3.png";
import icon5 from "../../assets/footer4.png";

import logo from "../../assets/logo-bct.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-sections">
        <div className="footer-column">
          <h6>VỀ GEARVN</h6>
          <p>Giới thiệu</p>
          <p>Tuyển dụng</p>
        </div>
        <div className="footer-column">
          <h6>CHÍNH SÁCH</h6>
          <p>Chính sách bảo hành</p>
          <p>Chính sách thanh toán</p>
          <p>Chính sách giao hàng</p>
          <p>Chính sách bảo mật</p>
        </div>
        <div className="footer-column">
          <h6>THÔNG TIN</h6>
          <p>Hệ thống cửa hàng</p>
          <p>Hướng dẫn mua hàng</p>
          <p>Tra cứu địa chỉ bảo hành</p>
        </div>
        <div className="footer-column footer-column-sup">
          <h6>TỔNG ĐÀI HỖ TRỢ</h6>
          <p>
            Mua hàng: <span href="tel:19005301">1900.5301</span>
          </p>
          <p>
            Bảo hành: <span href="tel:19005325">1900.5325</span>
          </p>
          <p>
            Kiếu nại: <span href="tel:18006173">1800.6173</span>
          </p>
          <p>
            Email: <span href="mailto:cskh@gearvn.com">cskh@gearvn.com</span>
          </p>
        </div>
        <div className="footer-column">
          <h6>ĐƠN VỊ VẬN CHUYỂN</h6>
          <div className="shipping-logos">
            <img src={ship1} alt="GHN" />
            <img src={ship2} alt="EMS" />
            <img src={ship3} alt="GVN" />
            <img src={ship4} alt="Other" />
          </div>
          <h6>CÁCH THỨC THANH TOÁN</h6>
          <div className="payment-logos">
            <img src={pay1} alt="pay1" />
            <img src={pay2} alt="pay2" />
            <img src={pay3} alt="pay3" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="bg-icon">
          <h6>KẾT NỐI VỚI CHÚNG TÔI</h6>
          <div className="social-icons">
            <img src={icon1} alt="fb" />
            <img src={icon2} alt="tt" />
            <img src={icon3} alt="ytb" />
            <img src={icon4} alt="zl" />
            <img src={icon5} alt="gr" />
          </div>
        </div>
        <div className="certificates">
          <img src={logo} alt="bct" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
