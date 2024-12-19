const prisma = require("./index");

const seed = async () => {
  try {
    // Create Customers
    const customer1 = await prisma.customer.create({
      data: { name: "Steve Howard" },
    });
    const customer2 = await prisma.customer.create({
      data: { name: "Emily Rawls" },
    });
    const customer3 = await prisma.customer.create({
      data: { name: "Jemma Maynard" },
    });
    const customer4 = await prisma.customer.create({
      data: { name: "Joseph Lennox" },
    });

    // Create Restaurants
    const restaurant1 = await prisma.restaurant.create({
      data: { name: "Bravo Italian" },
    });
    const restaurant2 = await prisma.restaurant.create({
      data: { name: "Walk-On's" },
    });
    const restaurant3 = await prisma.restaurant.create({
      data: { name: "Sushiro" },
    });

    // Create Reservations
    await prisma.reservation.create({
      data: {
        date: new Date("2024-12-19T12:00:00Z"),
        partyCount: 2,
        customer: { connect: { id: customer1.id } },
        restaurant: { connect: { id: restaurant1.id } },
      },
    });

    await prisma.reservation.create({
      data: {
        date: new Date("2024-12-20T18:30:00Z"),
        partyCount: 4,
        customer: { connect: { id: customer2.id } },
        restaurant: { connect: { id: restaurant2.id } },
      },
    });

    await prisma.reservation.create({
      data: {
        date: new Date("2024-12-21T20:00:00Z"),
        partyCount: 3,
        customer: { connect: { id: customer3.id } },
        restaurant: { connect: { id: restaurant3.id } },
      },
    });

    console.log("Database seeded!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
