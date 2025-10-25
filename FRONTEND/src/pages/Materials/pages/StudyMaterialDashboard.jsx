import React, { useState } from "react";
import "./StudyMaterialDashboard.css";
import Navbar from "../components/Navbar";
import SearchFilterBar from "../components/SearchFilterBar";
import MaterialCard from "../components/MaterialCard";
import PreviewModal from "../components/PreviewModal";
// import SearchBar from "../components/SearchBar";
// import FilterMenu from "../components/FilterMenu";
// import MaterialCard from "../components/MaterialCard";
// import PreviewModal from "../components/PreviewModal";
import demoData from "../utils/demoData";
import FilterMenu from "../components/FilterMenu";
import Footer from "../../../layouts/Footer";
import { getMaterials } from "../../../api/materialApi";
import { useEffect } from "react";

const StudyMaterialDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const [materials, setMaterials] = useState([]);

  //data from backend
  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await getMaterials();
      console.log(data);

      setMaterials(data.materials);
    };

    fetchMaterials();
  }, []);

  // Filtered Data
  const filteredData = materials.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <div className="study-dashboard-container">
        <div className="dashboard-header">
          <h2>Study Material Dashboard</h2>
          <p>Find, preview, and download study resources with ease.</p>
        </div>

        <SearchFilterBar value={searchQuery} onChange={setSearchQuery} />
        <FilterMenu
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="material-grid">
          {filteredData.map((item) => (
            <MaterialCard
              key={item._id}
              material={item}
              onPreview={() => {
                setSelectedMaterial(item)
                localStorage.removeItem('material_id');
                localStorage.setItem('material_id', item._id)
                // console.log(item)
              }}
            />
          ))}
        </div>

        {/* Preview Modal */}
        {selectedMaterial && (
          <PreviewModal
            material={selectedMaterial}
            onClose={() => setSelectedMaterial(null)}
          />
        )}

        {/* AI Placeholder Section */}
        <div className="ai-section">
          <h3> AI Recommendations</h3>
          <p>Get personalized study suggestions here...</p>

          <div className="ai-recommendations-grid">
            {/* Demo AI Recommendations */}
            {demoData.slice(0, 3).map((item) => (
              <div className="ai-card" key={item.id}>
                <img src={item.imageUrl} alt={item.title} />
                <div className="ai-info">
                  <h4>{item.title}</h4>
                  <span className="category">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudyMaterialDashboard;
