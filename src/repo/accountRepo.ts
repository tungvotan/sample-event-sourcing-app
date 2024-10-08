import db from '../db/dbClient';
import { Account } from '../domain/entities/accountEntity';

export class AccountRepository {
  async getById(accountId: string): Promise<Account | undefined> {
    const result = await db
      .selectFrom('accounts')
      .selectAll()
      .where('account_id', '=', accountId)
      .executeTakeFirst();
    //  TODO: put a transform snake-case to camelCase
    return (
      result && {
        ...result,
        accountId: result.account_id,
        version: result.version,
      }
    );
  }

  async save(account: Account): Promise<void> {
    await db
      .insertInto('accounts')
      .values({
        account_id: account.accountId,
        balance: account.balance,
        version: account.version,
      })
      .onConflict((oc) =>
        oc.column('account_id').doUpdateSet({
          balance: account.balance,
          version: account.version,
        })
      )
      .execute();
  }
}
