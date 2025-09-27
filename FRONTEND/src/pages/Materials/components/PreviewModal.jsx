import React, { useState } from "react";
import "./PreviewModal.css";
import RatingStars from "./RatingStars"; // optional

const WOWPreviewModal = ({ material, onClose }) => {
  const [activeTab, setActiveTab] = useState("preview");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
    }
  };

  return (
    <div className="wow-overlay">
      <div className="wow-modal">
        <button className="wow-close-btn" onClick={onClose}>
          ✖
        </button>
        <h2 className="wow-title">{material.title}</h2>

        {/* Tabs */}
        <div className="wow-tabs">
          <button
            className={activeTab === "preview" ? "active" : ""}
            onClick={() => setActiveTab("preview")}
          >
            👁 Preview
          </button>
          <button
            className={activeTab === "ai" ? "active" : ""}
            onClick={() => setActiveTab("ai")}
          >
             AI Summary
          </button>
          <button
            className={activeTab === "related" ? "active" : ""}
            onClick={() => setActiveTab("related")}
          >
             Related
          </button>
          <button
            className={activeTab === "comments" ? "active" : ""}
            onClick={() => setActiveTab("comments")}
          >
            💬 Comment & Rate
          </button>
        </div>

        {/* Tab Content */}
        <div className="wow-content">
          {activeTab === "preview" && (
            <div className="wow-section">
              <iframe
                src={material.imageUrl}
                title="preview"
                width="100%"
                height="400px"
                style={{ borderRadius: "10px", border: "1px solid #ccc" }}
              ></iframe>
            </div>
          )}
          {activeTab === "ai" && (
            <div className="wow-section">
              <p>
                Newton's laws of motion describe the relationship between the motion of an object and the forces acting on it.
                <br /> 
1. First Law (Law of Inertia): An object will stay at rest or move in a straight line at constant speed unless acted upon by a force.
<br />
2. Second Law: Force equals mass times acceleration (F = ma).
<br />
3. Third Law: For every action, there is an equal and opposite reaction.
              </p>
            </div>
          )}
          {activeTab === "related" && (
            <div className="wow-section">
              <ul>
                <li>Related Material 1</li>
                <li>Related Material 2</li>
                <li>Related Material 3</li>
              </ul>
            </div>
          )}
          {activeTab === "comments" && (
            <div className="wow-section">
              <RatingStars rating={material.rating} />
              <div className="wow-comment-box">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Add</button>
              </div>
              <ul className="wow-comment-list">
                {comments.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WOWPreviewModal;
