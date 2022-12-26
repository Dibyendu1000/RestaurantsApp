import React, { useState, createContext } from "react";

export const ResturantsContext = createContext();

export const ResturantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };
  return (
    <ResturantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {props.children}
    </ResturantsContext.Provider>
  );
};
