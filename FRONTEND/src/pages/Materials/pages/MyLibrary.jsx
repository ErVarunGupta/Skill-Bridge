// import '../styles.css'
import React from "react";
import "./MyLibrary.css";
import demoData from "../utils/demoData";
import Navbar from "../components/Navbar";

function MyLibrary() {
  // Example data (replace with real data later)
  const materials = [
    {
      id: 1,
      title: "Algebra Basics",
      category: "Math",
      description: "Introduction to algebra with examples.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Web Development Guide",
      category: "Web Dev",
      description: "Learn HTML, CSS, and JavaScript.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Physics Notes",
      category: "Science",
      description: "Important formulas and explanations.",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <>
    <Navbar />
    <div className="library-container">
      <h3>My Library</h3>
      <p>Saved notes and uploaded study materials will appear here.</p>

      <div className="materials-grid">
        {demoData.map((material) => (
          <div className="material-card" key={material.id}>
            <img src={material.imageUrl} alt={material.title} />
            <div className="material-info">
              <h4>{material.title}</h4>
              <span className="category">{material.category}</span>
              <p>{material.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default MyLibrary;
