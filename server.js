const express = require("express");
const morgan = require("morgan");
const prisma = require("./prisma");

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

// Create
app.post("/api/customers/:id/reservations", async (req, res) => {
  const { id } = req.params;
  const { restaurantId, date, partyCount } = req.body;

  try {
    const reservation = await prisma.reservation.create({
      data: {
        date: new Date(date),
        partyCount,
        customerId: parseInt(id),
        restaurantId: parseInt(restaurantId),
      },
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));