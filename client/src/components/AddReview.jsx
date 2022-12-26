import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const newReview = await RestaurantFinder.post(`/${id}/addReview`, {
      name,
      review: reviewText,
      rating,
    });
    window.location.reload();
    console.log(newReview);
  };

  return (
    <div>
      <div className="mb-2">
        <form action="">
          <div className="form-row">
            <div className="form-group col-8">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group col-4">
              <label htmlFor="rating">Rating</label>
              <select
                id="rating"
                className="custom-select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="review">Review</label>
            <textarea
              className="form-control"
              id="review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <button onClick={handleSubmitReview} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
