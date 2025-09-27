import React from 'react';
import './MaterialDetail.css';

function MaterialDetail() {
  return (
    <div className="material-container">
      <div className="material-header">
        <h1>Material Details</h1>
        <p className="material-subtitle">Comprehensive overview of educational materials</p>
      </div>

      <div className="material-cards">
        <div className="material-card">
          <h2>Topic: Artificial Intelligence</h2>
          <p>Learn the fundamentals of AI, machine learning, and deep learning with interactive examples.</p>
          <button className="material-button">View Material</button>
        </div>

        <div className="material-card">
          <h2>Topic: Data Structures</h2>
          <p>Understand arrays, linked lists, trees, graphs, and algorithms with visualizations.</p>
          <button className="material-button">View Material</button>
        </div>

        <div className="material-card">
          <h2>Topic: Web Development</h2>
          <p>Full stack web development concepts with React, Node.js, and modern frameworks.</p>
          <button className="material-button">View Material</button>
        </div>
      </div>
    </div>
  );
}

export default MaterialDetail;