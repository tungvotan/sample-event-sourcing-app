import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const runMigrations = async () => {
  const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'solid_snake',
    password: 'big_boss',
    database: 'whoz_es',
  });

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const migrationFiles = fs
      .readdirSync(path.join(__dirname, 'migrations'))
      .sort();

    for (const file of migrationFiles) {
      const filePath = path.join(__dirname, 'migrations', file);
      const sql = fs.readFileSync(filePath, 'utf8');
      console.log(`Running migration: ${file}`);
      await client.query(sql);
    }

    await client.query('COMMIT');
    console.log('Migrations completed successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', error);
  } finally {
    client.release();
    await pool.end();
  }
};

runMigrations().catch(console.error);
