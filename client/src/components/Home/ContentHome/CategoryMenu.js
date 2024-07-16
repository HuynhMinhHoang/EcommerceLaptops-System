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

const CategoryMenu = () => {
  const menuItems = [
    { title: "Laptop", icon: <MdLaptop /> },
    { title: "Laptop Gaming", icon: <LuGamepad2 /> },
    { title: "PC GVN", icon: <FaComputer /> },
    { title: "Main, CPU, VGA", icon: <PiComputerTower /> },
    { title: "Màn hình", icon: <MdOutlineDesktopWindows /> },
    { title: "Bàn phím", icon: <FaRegKeyboard /> },
    { title: "Chuột + Lót chuột", icon: <LuMouse /> },
    { title: "Tai Nghe", icon: <MdOutlineHeadphones /> },
    { title: "Ghế - Bàn", icon: <PiOfficeChair /> },
  ];

  return (
    <div className="category-menu">
      {menuItems.map((item, index) => (
        <div key={index} className="menu-item">
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
