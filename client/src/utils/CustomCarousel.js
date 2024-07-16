import React from "react";
import Carousel from "react-elastic-carousel";

const CustomCarousel = ({ children, breakPoints, ...rest }) => {
  const validProps = { ...rest }; // Copy all props except invalid ones
  const invalidProps = [
    "itemPosition",
    "verticalMode",
    "isRTL",
    "sliderPosition",
    "swipedSliderPosition",
    "isSwiping",
  ];

  // Remove invalid props from validProps
  invalidProps.forEach((prop) => delete validProps[prop]);

  return (
    <Carousel breakPoints={breakPoints} {...validProps}>
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
