require('dotenv').config(); 
const { Pool } = require('pg');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL= "postgres://willi:Williamd110!@localhost:5432/reservations_db"
});

// Test 
pool.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err.message);
  } else {
    console.log('Connected to the PostgreSQL database');
  }
});

module.exports = pool;