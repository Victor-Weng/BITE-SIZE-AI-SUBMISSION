require('dotenv').config();
const { Pool } = require('pg');

// Log environment variables to debug
console.log('POSTGRES_URL:', `postgres://default:BSRwY4ZIF2Px@ep-crimson-frost-a1i93kjl-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require`);

const pool = new Pool({
  connectionString: `postgres://default:BSRwY4ZIF2Px@ep-crimson-frost-a1i93kjl.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require`
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the PostgreSQL database');
    done(); // release the client back to the pool
  }
});

module.exports = pool;
