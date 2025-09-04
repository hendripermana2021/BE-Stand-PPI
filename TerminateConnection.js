import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const terminateConnections = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();

  // Replace 'stand_ppi' with your database name
  const dbName = 'stand_ppi';

  // Terminate all other connections
  await client.query(`
    SELECT pg_terminate_backend(pid)
    FROM pg_stat_activity
    WHERE datname = '${dbName}' AND pid <> pg_backend_pid();
  `);

  console.log(`All connections to database ${dbName} terminated.`);
  await client.end();
};

terminateConnections().catch(err => {
  console.error(err);
  process.exit(1);
});
