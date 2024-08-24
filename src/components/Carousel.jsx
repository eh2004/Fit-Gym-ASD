import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import treadmill from "../assets/treadmill.jpg"
import stretching from "../assets/stretching.jpg"
import weight_training from "../assets/weight-training.jpg"

export default function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 2500
  };
  return (
    <Slider {...settings}>
      <div className="slide">
        <img src={treadmill}/>
      </div>
      <div className="slide">
        <img src={stretching}/>
      </div>
      <div className="slide">
      <img src={weight_training}/>
      </div>
    </Slider>
  );
}