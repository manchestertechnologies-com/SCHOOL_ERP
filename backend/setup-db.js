const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://neondb_owner:npg_VAycbL8g9FBs@ep-mute-mountain-atswk9sz.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function run() {
  console.log('Connecting to online Neon database...');
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    console.log('Connected successfully!');

    const schemaPath = path.join(__dirname, '..', 'docs', 'DATABASE_SCHEMA.sql');
    console.log(`Reading schema file from: ${schemaPath}`);
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing schema queries (this may take a few seconds)...');
    await client.query(sql);

    console.log('Database schema successfully initialized online!');
  } catch (err) {
    console.error('Error executing schema setup:', err);
  } finally {
    await client.end();
  }
}

run();
