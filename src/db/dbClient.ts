import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { eventType } from '../domain/events/accountEvent';

// Define the database schema
type Database = {
  accounts: {
    account_id: string;
    balance: number;
    version: number;
  };
  account_events: {
    id?: number;
    account_id: string;
    event_type: eventType;
    payload: object;
    version: number;
    created_at: Date;
  };
};

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: 'localhost',
      port: 5432,
      database: 'whoz_es',
      user: 'solid_snake',
      password: 'big_boss',
    }),
  }),
});

export default db;
