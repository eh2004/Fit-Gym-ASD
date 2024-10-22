import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../css/stylebest.css";

function App() {

    const [muscleInfo, setMuscleInfo] = useState({ name: "", description: "" });

    const muscles = {
        neck: {
            name: "Neck",
            description: "There are a fair few neck muscles."
        },
        shoulders: {
            name: "Shoulders",
            description: "The shoulders are a muscle group that support arm movement, enabling lifting, rotating, and stabilizing actions."
        },
        biceps: {
            name: "Biceps",
            description: "The biceps are a muscle group in the upper arm that help with lifting and pulling."
        },
        forearms: {
            name: "Forearms",
            description: "The forearms are a muscle group in the lower arm that assist with gripping, lifting, and rotating movements of the hand and wrist."
        },
        chest: {
            name: "Chest",
            description: "The chest muscles (pectorals) help with pushing movements."
        },
        abs: {
            name: "Abs or Core",
            description: "The abdominal muscles support your core and help with bending movements."
        },
        quadriceps: {
            name: "Quadriceps",
            description: "The quadriceps are a group of muscles on the front of your thighs that help extend your knee."
        },
        calves: {
            name: "Calves",
            description: "The calf muscles (gastrocnemius and soleus) are responsible for foot and ankle movement."
        }

        

    };

    const handleMouseEnter = (muscleId) => {
        const muscle = muscles[muscleId];
        setMuscleInfo(muscle);
    };

    const handleMouseLeave = () => {
        setMuscleInfo({ name: "", description: "" });
    };

    return (
        <React.Fragment>
            <Header />
            <h1>Learn About The Body:</h1>
            <h3 className="begintext">Hover over the body to begin:</h3>
            
             {/* SVG Body Map with Human Image */}
             <div className="muscle-map">
                <svg viewBox="0 0 500 1000" xmlns="http://www.w3.org/2000/svg">
                    {/* Insert human body image */}
                    <image href="../assets/body.jpg" x="0" y="0" width="500" height="1000" />

                    {/* Neck */}
                    <polygon id="neck" points="260 180, 260 180, 320 230, 180 240" /*TL,TR,BL,BR */
                        className="body-part"
                        onClick={() => handleMouseEnter("neck")}
                    ></polygon>

                    {/* Shoulder L */}
                    <polygon id="shoulders" points="155 250, 180 245, 180 300, 140 300" 
                        className="body-part"
                        onClick={() => handleMouseEnter("shoulders")}
                    ></polygon>

                    {/* Shoulder R */}
                    <polygon id="shoulders" points="320 230, 320 270, 360 310, 370 250" /*TL,TR,BR,BL */
                        className="body-part"
                        onClick={() => handleMouseEnter("shoulders")}
                    ></polygon>

                    {/* Bicep L */}
                    <polygon id="biceps" points="140 300, 180 300, 170 390, 130 370"
                        className="body-part"
                        onClick={() => handleMouseEnter("biceps")}
                    ></polygon>

                    {/* Bicep R */}
                    <polygon id="biceps" points="320 270, 380 310, 385 360, 350 380"
                        className="body-part"
                        onClick={() => handleMouseEnter("biceps")}
                    ></polygon>

                    {/* Forearm L */}
                    <polygon id="forearms" points="130 370, 170 390, 100 470, 70 470"
                        className="body-part"
                        onClick={() => handleMouseEnter("forearms")}
                    ></polygon>

                    {/* Forearm R */}
                    <polygon id="forearms" points="350 380, 385 360, 430 470, 400 470"
                        className="body-part"
                        onClick={() => handleMouseEnter("forearms")}
                    ></polygon>

                    {/* Chest */}
                    <polygon id="chest" points="180 240, 320 240, 320 310, 180 310" 
                        className="body-part"
                        onClick={() => handleMouseEnter("chest")}
                    ></polygon>

                    {/* Abs */}
                    <polygon id="abs" points="180 310, 320 310, 270 480, 210 480" 
                        className="body-part"
                        onClick={() => handleMouseEnter("abs")}
                    ></polygon>

                    {/* Quadricep L*/}
                    <polygon id="quadriceps" points="150 470, 230 500, 220 650, 150 650"
                        className="body-part"
                        onClick={() => handleMouseEnter("quadriceps")}
                    ></polygon>

                    {/* Quadriceps R*/}
                    <polygon id="quadriceps" points="250 500, 330 450, 340 640, 280 640"
                        className="body-part"
                        onClick={() => handleMouseEnter("quadriceps")}
                    ></polygon>

                    {/* Calf L */}
                    <polygon id="calves" points="155 670, 210 670, 210 800, 155 800"
                        className="body-part"
                        onClick={() => handleMouseEnter("calves")}
                    ></polygon>

                    {/* Calf R */}
                    <polygon id="calves" points="290 670, 350 670, 340 800, 300 800"
                        className="body-part"
                        onClick={() => handleMouseEnter("calves")}
                    ></polygon>

                </svg>

                {/* Display muscle info on click */}
                {muscleInfo.name && (
                    <div className="muscle-info">
                        <h2>{muscleInfo.name}</h2>
                        <p>{muscleInfo.description}</p>
                    </div>
                )}
            </div>

            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)