import React, { useState } from "react";
import "./Review.css";

const ReviewForm = () => {
  const emailregex = /^[^@]+@[^@]+\.[^@]+$/;
  const initial = {
    uname: "",
    email: "",
    review: "",
    rating: 0,
  };

  const [inputForm, setInputForm] = useState(initial);
  const [inputErr, setInputErr] = useState({});
  const [allReviews, setAllReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleErrors()) {
      setAllReviews([...allReviews, inputForm]);
      setInputForm(initial);
      setInputErr({});
      alert("Thank you for your feedback!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleRating = (num) => {
    setInputForm({ ...inputForm, rating: num });
  };

  const handleErrors = () => {
    let errors = {};
    if (inputForm.uname === "") {
      errors.unameErr = "Enter your username";
    }
    if (inputForm.email === "") {
      errors.emailErr = "Enter your email address";
    } else if (!emailregex.test(inputForm.email)) {
      errors.emailErr = "Enter a valid email";
    }
    if (inputForm.rating === 0) {
      errors.ratingErr = "Please rate this product";
    }
    if (inputForm.review === "") {
      errors.reviewErr = "Please share your review";
    }

    setInputErr(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="review-page">
      <div className="review-container">
        <h2 className="form-title"> Rate & Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="uname"
              value={inputForm.uname}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {inputErr.unameErr && <span className="error">{inputErr.unameErr}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={inputForm.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {inputErr.emailErr && <span className="error">{inputErr.emailErr}</span>}
          </div>

          <div className="form-group rating-group">
            <label>Rating</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  onClick={() => handleRating(num)}
                  className={num <= inputForm.rating ? "star active" : "star"}
                >
                  &#9733;
                </span>
              ))}
            </div>
            {inputErr.ratingErr && <span className="error">{inputErr.ratingErr}</span>}
          </div>

          <div className="form-group">
            <label>Write Review</label>
            <textarea
              name="review"
              value={inputForm.review}
              onChange={handleChange}
              placeholder="Share your experience..."
              rows="4"
            />
            {inputErr.reviewErr && <span className="error">{inputErr.reviewErr}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Submit Review
          </button>
        </form>
      </div>

      <div className="review-list">
        <h3>Customer Reviews</h3>
        {allReviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first!</p>
        ) : (
          allReviews.map((r, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <div>
                  <h4>{r.uname}</h4>
                  <p>{r.email}</p>
                </div>
                <div className="stars-display">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <span key={num} className={num <= r.rating ? "star active" : "star"}>
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>
              <p className="review-text">“{r.review}”</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
