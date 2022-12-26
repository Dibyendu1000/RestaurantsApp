import React, { useEffect } from "react";
import { useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { ResturantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(ResturantsContext);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get();
      setRestaurants(response.data.data.restaurants);
    };
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await RestaurantFinder.delete(`/${id}`);
    setRestaurants(
      restaurants.filter((restaurant) => {
        return restaurant.id !== id;
      })
    );
  };

  const handleRestaurantSelect = async (id) => {
    navigate(`/restaurants/${id}`);
  };

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning ml-1">0 Reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.avg_rating} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"₹".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
