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
            description: `
                The neck muscles include:
                
                - **Sternocleidomastoid**: 
                  Helps in rotating and flexing the head.
    
                - **Trapezius (upper portion)**: 
                  Assists in moving the shoulders and supports neck movement.
    
                - **Scalenes**: 
                  Involved in neck flexion, lateral movement, and rotation.
    
                - **Levator Scapulae**: 
                  Elevates the scapula and assists in neck rotation.
    
                These muscles are primarily responsible for head and neck movement.`
        },
        shoulders: {
            name: "Shoulders",
            description: `
                The shoulder muscles include:
                
                - **Deltoid**: 
                  Facilitates arm abduction, flexion, and extension.
    
                - **Rotator Cuff (Supraspinatus, Infraspinatus, Teres Minor)**: 
                  Provides stability and enables rotation and lifting of the arm.
    
                These muscles support arm movement, enabling lifting and rotating.`
        },
        biceps: {
            name: "Biceps",
            description: `
                The biceps muscle group includes:
                
                - **Biceps Brachii**: 
                  Involved in elbow flexion and forearm supination.
    
                - **Brachialis**: 
                  Assists in flexing the elbow.
    
                - **Brachioradialis**: 
                  Helps in flexing the elbow, especially in a pronated position.
    
                These muscles assist with lifting, pulling, and flexing the elbow joint.`
        },
        forearms: {
            name: "Forearms",
            description: `
                The forearm muscles include:
                
                - **Flexor Group**: 
                  Enables flexion of the wrist and fingers, aiding in gripping.
    
                - **Extensor Group**: 
                  Extends the wrist and fingers, allowing for hand opening and pushing.
    
                - **Pronator Teres**: 
                  Rotates the forearm to a palm-down position (pronation).
    
                - **Supinator**: 
                  Rotates the forearm to a palm-up position (supination).
    
                These muscles assist with movements of the hand and wrist.`
        },
        chest: {
            name: "Chest",
            description: `
                The chest muscles (pectorals) include:
                
                - **Pectoralis Major**: 
                  Responsible for pushing movements, arm flexion, and adduction.
    
                - **Pectoralis Minor**: 
                  Assists in stabilizing the shoulder blades and moving them downward.
    
                These muscles help with pushing movements and shoulder stabilization.`
        },
        abs: {
            name: "Abs or Core",
            description: `
                The abdominal muscles include:
                
                - **Rectus Abdominis**: 
                  Known as the "six-pack," it helps with flexion and stabilizing the core.
    
                - **Obliques (Internal and External)**: 
                  Allow for twisting and side bending of the torso.
    
                - **Transverse Abdominis**: 
                  Provides deep core stability and compresses the abdominal cavity.
    
                These muscles support your core, helping with stabilizing movements.`
        },
        quadriceps: {
            name: "Quadriceps",
            description: `
                The quadriceps are on the front of the thighs, muscles include:
                
                - **Rectus Femoris**: 
                  Assists with knee extension and hip flexion.
    
                - **Vastus Lateralis**: 
                  Extends the knee.
    
                - **Vastus Medialis**: 
                  Extends the knee and stabilizes the patella.
    
                - **Vastus Intermedius**: 
                  Also aids in knee extension.
    
                These muscles help extend the knee and stabilize the hip.`
        },
        calves: {
            name: "Calves",
            description: `
                The calf muscles include:
                
                - **Gastrocnemius**: 
                  The larger calf muscle, responsible for plantarflexion and knee flexion.
    
                - **Soleus**: 
                  Lies underneath the gastrocnemius and also aids in plantarflexion.
    
                These muscles are responsible for foot and ankle movement.`
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
            <h3 className="begintext">Click on a part of the body to see what muscles are there:</h3>
            
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