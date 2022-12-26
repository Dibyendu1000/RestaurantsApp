//import environment variables from .env config file
require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");

//declare the app from express
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  const results = await db.query(
    "SELECT * FROM restaurants LEFT JOIN(SELECT restaurant_id, TRUNC(AVG(rating),1) AS avg_rating, COUNT(*) FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id"
  );
  res.status(200).json({
    status: "success",
    results: results.rows.length,
    data: {
      restaurants: results.rows,
    },
  });
});

//Get Restaurant by ID
app.get("/api/v1/restaurants/:id", async (req, res) => {
  const restaurant = await db.query(
    "SELECT * FROM restaurants LEFT JOIN(SELECT restaurant_id, TRUNC(AVG(rating),1) AS avg_rating, COUNT(*) FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id WHERE id = $1",
    [req.params.id]
  );
  const reviews = await db.query(
    "SELECT * FROM reviews WHERE restaurant_id = $1",
    [req.params.id]
  );
  console.log(reviews);
  res.status(200).json({
    status: "success",
    data: {
      restaurant: restaurant.rows[0],
      reviews: reviews.rows,
    },
  });
});

//Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  //console.log(req.body);
  const results = await db.query(
    "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *",
    [req.body.name, req.body.location, req.body.price_range]
  );
  //console.log(results);
  res.status(200).json({
    status: "success",
    data: {
      restaurant: results.rows[0],
    },
  });
});

//Update a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//Delete a restuarant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  const results = await db.query(
    "DELETE FROM restaurants WHERE id = $1 returning *",
    [req.params.id]
  );
  res.status(200).json({
    status: "success",
    data: {
      restaurant: results.rows[0],
    },
  });
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  const results = await db.query(
    "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1,$2,$3,$4) returning *",
    [req.params.id, req.body.name, req.body.review, req.body.rating]
  );
  console.log(results);
  res.status(200).json({
    status: "success",
    data: {
      review: results.rows[0],
    },
  });
});
//Incase there is not value present for PORT in env variables 3001 would be used
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is up and running ${port}`);
});
