import React from "react";
import Slider from "react-slick";
import GymContainer from "./GymContainer.jsx";

function MultipleItems() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <div className="gyms-container">
      <Slider {...settings}>
        <div>
            <GymContainer />
        </div>
        <div>
            <GymContainer />
        </div>
        <div>
            <GymContainer />
        </div>
        <div>
            <GymContainer />
        </div>
        <div>
            <GymContainer />
        </div>
        <div>
            <GymContainer />
        </div>
      </Slider>
    </div>
  );
}

export default MultipleItems;