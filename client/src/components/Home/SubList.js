import React from "react";
import { RxVideo } from "react-icons/rx";
import { SlCreditCard } from "react-icons/sl";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { TbCoins } from "react-icons/tb";
import { MdOutlineDiscount } from "react-icons/md";
import { BiCheckShield } from "react-icons/bi";
import "./SubList.scss";

const SubList = () => {
  return (
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
  );
};

export default SubList;
