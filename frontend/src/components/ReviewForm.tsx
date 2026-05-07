import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReviewForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workshopId } = location.state || {};

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return setError("Please select a rating.");
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/api/workshops/${workshopId}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment, rating }),
      });
      navigate(-1);
    } catch {
      setError("Failed to submit review. Try again.");
    }
  };

  return (
    <div className="host-page-container">
      <div className="screen-header" style={{ flexDirection: "row", alignItems: "center" }}>
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h2 className="header-title" style={{ margin: 0 }}>
          Review
        </h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <p style={{ fontWeight: "600", marginBottom: "8px" }}>Workshop Rating</p>
          <div style={{ display: "flex", gap: "8px", fontSize: "2rem" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => setRating(star)} style={{ cursor: "pointer" }}>
                {star <= rating ? "★" : "☆"}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontWeight: "600", marginBottom: "8px" }}>Comments</p>
          <textarea
            className="bordered-input"
            placeholder="Enter a comment about the workshop (150 characters maximum)"
            maxLength={150}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>}

        <button type="submit" className="btn-dark-purple">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
