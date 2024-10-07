import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import musclegroups from "../assets/musclegroups.jpg";
import exercisetutorials from "../assets/exercisetutorials.jpg";
import workoutsplits from "../assets/workoutsplits.jpg";
import "../css/stylebest.css";

export default function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className="slider">
      <Slider {...settings}>
        <div className="slide">
          <a href="../" className="carousel-link">
            <img src={musclegroups} alt="Muscle Groups" className="carousel-image" />
          </a>
        </div>
        <div className="slide">
          <a href="/stretching-page" className="carousel-link">
            <img src={exercisetutorials} alt="Exercise Tutorials" className="carousel-image" />
          </a>
        </div>
        <div className="slide">
          <a href="/weight-training-page" className="carousel-link">
            <img src={workoutsplits} alt="Workout Splits" className="carousel-image" />
          </a>
        </div>
      </Slider>
    </div>
  );
}