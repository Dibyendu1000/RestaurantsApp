import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ResturantsContextProvider } from "./context/RestaurantsContext";
import Home from "./routes/Home";
import RestaurantDetails from "./routes/RestaurantDetails";
import UpdatePage from "./routes/UpdatePage";

const app = () => {
  return (
    <ResturantsContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/restaurants/:id/update" element={<UpdatePage />} />
          </Routes>
        </Router>
      </div>
    </ResturantsContextProvider>
  );
};

export default app;
