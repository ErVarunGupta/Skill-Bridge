import React from "react";
import './FilterMenu.css'

const FilterMenu = ({ selectedCategory, onCategoryChange }) => {
  const categories = ["All", "Math", "Science", "Programming", "History"];

  return (
    <div className="filter-menu">
      {categories.map((cat) => (
        <button
          key={cat}
          className={selectedCategory === cat ? "active" : ""}
          onClick={() => onCategoryChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterMenu;
