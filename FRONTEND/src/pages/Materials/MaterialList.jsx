import React from 'react';
import './MaterialList.css';

function MaterialList() {
  const materials = [
    { id: 1, title: 'Artificial Intelligence', description: 'Learn AI concepts, ML algorithms, and deep learning fundamentals.' },
    { id: 2, title: 'Data Structures', description: 'Understand arrays, linked lists, trees, graphs, and sorting algorithms.' },
    { id: 3, title: 'Web Development', description: 'Full stack web development with React, Node.js, and modern frameworks.' },
    { id: 4, title: 'Database Management', description: 'Learn SQL, NoSQL, and database design principles.' },
    { id: 5, title: 'Machine Learning Projects', description: 'Hands-on projects for ML, AI, and data analysis.' },
  ];

  return (
    <div className="material-list-container">
      <h1 className="material-list-title">Available Learning Materials</h1>
      <div className="material-list-cards">
        {materials.map((material) => (
          <div key={material.id} className="material-card">
            <h2>{material.title}</h2>
            <p>{material.description}</p>
            <button className="material-button">View Material</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MaterialList;
