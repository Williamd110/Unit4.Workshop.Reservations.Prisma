const express = require("express");
const morgan = require("morgan");
const prisma = require("./prisma");
const pg = require("pg");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Get all customers
app.get("/api/customers", async (req, res) => {
  const customers = await prisma.customer.findMany();
  res.json(customers);
});

// Get all restaurants
app.get("/api/restaurants", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany();
  res.json(restaurants);
});

// all reservations
app.get("/api/reservations", async (req, res) => {
  const reservations = await prisma.reservation.findMany({
    include: { customer: true, restaurant: true },
  });
  res.json(reservations);
});

// Create reservation
app.post('/api/reservations', async (req, res) => {
    const { date, partyCount, customerId, restaurantId } = req.body;
    const query = `
      INSERT INTO reservations (date, partyCount, customerId, restaurantId)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [date, partyCount, customerId, restaurantId];
  
    try {
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
// Delete
app.delete(
  "/api/customers/:customerId/reservations/:id",
  async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.reservation.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);
// create new restaurant
app.post('/api/restaurants', async (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO restaurants (name) VALUES ($1) RETURNING *';
    const values = [name];
  
    try {
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

//   create customer
  app.post('/api/customers', async (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO customers (name) VALUES ($1) RETURNING *';
    const values = [name];
  
    try {
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));