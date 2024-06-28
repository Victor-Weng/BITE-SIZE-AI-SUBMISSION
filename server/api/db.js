require('dotenv').config();
const { Pool } = require('pg');

// Log environment variables to debug
console.log(process.env)
console.log('POSTGRES_URL:', process.env.REACT_APP_POSTGRES_URL);

const pool = new Pool({
  connectionString: process.env.REACT_APP_POSTGRES_URL
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the PostgreSQL database');
  }
});

module.exports = pool;
