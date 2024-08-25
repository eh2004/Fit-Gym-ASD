import React from "react";
import Slider from "react-slick";
import GymContainer from "./GymContainer.jsx";
import gym1 from "../assets/gym1.jpg"
import gym2 from "../assets/gym2.png"
import gym3 from "../assets/gym3.jpg"
import gym4 from "../assets/gym4.jpg"
import gym5 from "../assets/gym5.jpg"
import gym6 from "../assets/gym6.jpg"

function MultipleItems() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <div className="gyms-carousel-div">
      <Slider {...settings} style={{height: 470}}>
        <div>
            <GymContainer imageLink={gym1} location={"Alexandria Sydney"} phoneNumber={"04 5427 6512"} address="28 Maddox St, Alexandria NSW 2015" addressLink={"https://maps.app.goo.gl/UcY7BxxSXXbswatn8"}/>
        </div>
        <div>
            <GymContainer imageLink={gym2} location={"Windsor Brisbane"} phoneNumber={"04 8365 1932"} address="54 Nicholas St, Windsor QLD 4030" addressLink={"https://maps.app.goo.gl/yY1Jw6N4jH6BhFms6"}/>
        </div>
        <div>
            <GymContainer imageLink={gym3} location={"Hadfield Melbourne"} phoneNumber={"04 1934 8273"} address="94 West St, Hadfield VIC 3046" addressLink={"https://maps.app.goo.gl/7rHWpe7dFEm4NurH6"}/>
        </div>
        <div>
            <GymContainer imageLink={gym4} location={"Bull Creek Perth"} phoneNumber={"04 9783 2634"} address="9 Benningfield Rd, Bull Creek WA 6149" addressLink={"https://maps.app.goo.gl/iAExf6NFUCJBH2x66"}/>
        </div>
        <div>
            <GymContainer imageLink={gym5} location={"Beverley Adelaide"} phoneNumber={"04 2311 6212"} address="634 Port Rd Beverley SA" addressLink={"https://maps.app.goo.gl/bPmxHx1GvXbvhKKa9"}/>
        </div>
        <div>
            <GymContainer imageLink={gym6} location={"Mount Hutton Newcastle"} phoneNumber={"04 2827 3436"} address="16 Wilsons Rd, Mount Hutton NSW 2290" addressLink={"https://maps.app.goo.gl/rf4W6egJLVcbBxRC7"}/>
        </div>
      </Slider>
    </div>
  );
}

export default MultipleItems;