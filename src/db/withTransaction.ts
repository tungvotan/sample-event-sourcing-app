import { Transaction } from 'kysely';
import db from './dbClient';

export const withTransaction = async <T>(
  handler: (trx: Transaction<any>) => Promise<T>
): Promise<T> => {
  return await db.transaction().execute(async (trx) => {
    try {
      return await handler(trx);
    } catch (error) {
      throw error;
    }
  });
};
