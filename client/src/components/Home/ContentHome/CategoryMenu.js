import React from "react";
import "./CategoryMenu.scss";
import { MdLaptop } from "react-icons/md";
import { LuGamepad2 } from "react-icons/lu";
import { FaComputer } from "react-icons/fa6";
import { PiComputerTower } from "react-icons/pi";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { FaRegKeyboard } from "react-icons/fa6";
import { LuMouse } from "react-icons/lu";
import { MdOutlineHeadphones } from "react-icons/md";
import { PiOfficeChair } from "react-icons/pi";

import { MdOutlineNavigateNext } from "react-icons/md";

const CategoryMenu = ({ onMenuItemClick }) => {
  const menuItems = [
    { title: "Laptop Gaming", icon: <LuGamepad2 />, category: "LAPTOPGAMING" },
    { title: "Laptop", icon: <MdLaptop />, category: "LAPTOP" },
    { title: "PC GVN", icon: <FaComputer />, category: "PC" },
    // {
    //   title: "Main, CPU, VGA",
    //   icon: <PiComputerTower />,
    //   category: "MAIN_CPU_VGA",
    // },
    // {
    //   title: "Màn hình",
    //   icon: <MdOutlineDesktopWindows />,
    //   category: "MONITOR",
    // },
    { title: "Bàn phím", icon: <FaRegKeyboard />, category: "KEYBOARD" },
    { title: "Chuột + Lót chuột", icon: <LuMouse />, category: "MOUSE" },
    // {
    //   title: "Tai Nghe",
    //   icon: <MdOutlineHeadphones />,
    //   category: "HEADPHONES",
    // },
    // { title: "Ghế - Bàn", icon: <PiOfficeChair />, category: "CHAIR_TABLE" },
  ];

  return (
    <div className="category-menu">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="menu-item"
          onClick={() => onMenuItemClick(item.category)}
        >
          <div className="menu-title">
            <span className="menu-icon">{item.icon}</span>
            {item.title}
            <span className="menu-icon-next">
              <MdOutlineNavigateNext />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryMenu;
