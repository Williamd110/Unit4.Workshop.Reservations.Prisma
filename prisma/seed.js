const prisma = require("./index");

const seed = async () => {
  // Create Customers
  const customers = await prisma.customer.createMany({
    data: [
      { name: "Steve Howard" },
      { name: "Emily Rawls" },
      { name: "Jemma Maynard" },
      { name: "Joseph Lennox" },
    ],
  });

  // Create Restaurants
  const restaurants = await prisma.restaurant.createMany({
    data: [
      { name: "Bravo Italian" },
      { name: "Walk-On's" },
      { name: "Sushiro" },
    ],
  });

  // Create Reservations
  const reservations = await prisma.reservation.createMany({
    data: [
      {
        date: new Date("2024-12-19T12:00:00Z"),
        partyCount: 2,
        customerId: 1,
        restaurantId: 1,
      },
      {
        date: new Date("2024-12-20T18:30:00Z"),
        partyCount: 4,
        customerId: 2,
        restaurantId: 2,
      },
      {
        date: new Date("2024-12-21T20:00:00Z"),
        partyCount: 3,
        customerId: 3,
        restaurantId: 3,
      },
    ],
  });

  console.log("Database seeded!");
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });