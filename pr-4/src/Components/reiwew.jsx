import React, { useState } from "react";
import "./Review.css";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    stars: 0,
  });

  const [submitted, setSubmitted] = useState(false);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.stars) {
      alert("Please fill all required fields!");
      return;
    }
    console.log("User Review:", formData);
    setSubmitted(true);
  };

  return (
    <div className="review-container">
      <h2 className="review-title">Share Your Feedback</h2>

      {submitted ? (
        <div className="thankyou-box">
          <h3>Thank You! 🎉</h3>
          <p>We appreciate your feedback.</p>
        </div>
      ) : (
        <form onSubmit={submitForm} className="review-form">
          
          <div className="field">
            <label>Your Name *</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="field">
            <label>Email *</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          {/* Star Rating */}
          <div className="field rating-stars">
            <label>Rating *</label>
            <div>
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <span
                    key={starValue}
                    onClick={() => updateField("stars", starValue)}
                    style={{
                      cursor: "pointer",
                      fontSize: "28px",
                      color: starValue <= formData.stars ? "#ff9800" : "#ccc",
                    }}
                  >
                    ★
                  </span>
                );
              })}
            </div>
          </div>

          {/* Review */}
          <div className="field">
            <label>Your Review</label>
            <textarea
              placeholder="Write something..."
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
            ></textarea>
          </div>

          {/* Submit */}
          <button type="submit" className="submit-btn">
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
