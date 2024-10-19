import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./BannerCarousel.scss";
import banner1 from "../../../assets/banner1.png";
import banner2 from "../../../assets/banner2.png";
import banner3 from "../../../assets/banner3.png";
import banner4 from "../../../assets/banner4.png";
import banner5 from "../../../assets/banner5.png";

const BannerHome = () => {
  return (
    <div className="banner-home">
      <Carousel fade>
        <Carousel.Item>
          <img className="carousel-image" src={banner1} alt="First slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="carousel-image" src={banner2} alt="Second slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="carousel-image" src={banner3} alt="Third slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="carousel-image" src={banner4} alt="Four slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="carousel-image" src={banner5} alt="Five slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default BannerHome;
