import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../css/stylebest.css";

function App() {

    const exerciseData = {
        legWorkouts: [
          {
            title: "Squats",
            videoUrl: "https://www.youtube.com/embed/xqvCmoLULNY",
            description: "Squats are great for strengthening your quadriceps and glutes."
          },
          {
            title: "Lunges",
            videoUrl: "https://www.youtube.com/embed/BbExjzx75Hs",
            description: "Lunges target the legs, glutes, and improve balance."
          },
          {
            title: "Leg Press",
            videoUrl: "https://www.youtube.com/embed/VFk3RzndUEc",
            description: "The leg press machine helps to isolate the quadriceps muscles."
          }
        ],
        armWorkouts: [
          {
            title: "Bicep Curls",
            videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
            description: "Bicep curls are effective for building the biceps."
          },
          {
            title: "Tricep Dips",
            videoUrl: "https://www.youtube.com/embed/6kALZikXxLc",
            description: "Tricep dips help strengthen your triceps and shoulders."
          }
        ],
        chestWorkouts: [
          {
            title: "Bench Press",
            videoUrl: "https://www.youtube.com/embed/2pUbZ6MgNkk",
            description: "The bench press is an exercise that focuses on the chest but also engages the shoulders and triceps."
          },
          {
            title: "Push-ups",
            videoUrl: "https://www.youtube.com/embed/JyCG_5l3XLk",
            description: "Push-ups are a bodyweight exercise targeting the chest, shoulders, and triceps."
          },
          {
            title: "Chest Flys",
            videoUrl: "https://www.youtube.com/embed/eGjt4lk6g34",
            description: "The chest fly exercise isolates the pectoral muscles, helping to build size and strength."
          }
        ],
        backWorkouts: [
          {
            title: "Deadlift",
            videoUrl: "https://www.youtube.com/embed/plb5jEO4Unw",
            description: "Deadlifts work the entire posterior chain, including the back muscles, glutes, and hamstrings."
          },
          {
            title: "Pull-ups",
            videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
            description: "Pull-ups are a bodyweight exercise that primarily targets the latissimus dorsi muscles in the back."
          },
          {
            title: "Bent-Over Rows",
            videoUrl: "https://www.youtube.com/embed/FWJR5Ve8bnQ",
            description: "Bent-over rows target the upper and middle back, engaging the rhomboids, traps, and lats."
          }
        ]
      };
    
      const renderVideos = (videos) => {
        return videos.map((exercise, index) => (
          <div key={index} className="exercise-box">
            <div className="video-container">
              <iframe
                width="250"
                height="150"
                src={exercise.videoUrl}
                title={exercise.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="description-container">
              <p>{exercise.description}</p>
            </div>
          </div>
        ));
      };

    return (
        <React.Fragment>
            <Header />
            <div className="exercise-tutorials">
            <h1>Exercise Tutorials</h1>

            <section>
                <h2>Leg Workouts</h2>
                {renderVideos(exerciseData.legWorkouts)}
            </section>

            <section>
                <h2>Arm Workouts</h2>
                {renderVideos(exerciseData.armWorkouts)}
            </section>

            <section>
                <h2>Chest Workouts</h2>
                {renderVideos(exerciseData.chestWorkouts)}
            </section>

            <section>
                <h2>Back Workouts</h2>
                {renderVideos(exerciseData.backWorkouts)}
            </section>
            </div>
            <Footer />
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)