import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.price_range);
      console.log(response.data.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    navigate("/");
  };

  function SubmitButton() {
    if (name && location && priceRange > 0 && priceRange < 6) {
      return (
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      );
    } else {
      return (
        <button type="submit" className="btn btn-primary" disabled>
          Submit
        </button>
      );
    }
  }
  console.log(id);
  return (
    <div className="container">
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priceRange">Price Range</label>
          <select
            className="custom-select"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            required
          >
            <option value="1">₹</option>
            <option value="2">₹₹</option>
            <option value="3">₹₹₹</option>
            <option value="4">₹₹₹₹</option>
            <option value="4">₹₹₹₹₹</option>
          </select>
        </div>
        <div className="col-md-12 text-center">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
