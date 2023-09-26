// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export async function query(text, params) {
//   const client = await pool.connect();
//   try {
//     const result = await client.query(text, params);
//     return result;
//   } finally {
//     client.release();
//   }
// }
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shipmenttracker',
  password: '1234',
  port: 5432, 
});


export default pool;