import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./GoToTop.scss";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="go-to-top">
      <div
        onClick={scrollToTop}
        className={`go-to-top-button ${isVisible ? "visible" : ""}`}
      >
        <FaArrowUp />
      </div>
    </div>
  );
};

export default GoToTop;
