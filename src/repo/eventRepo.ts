import { AccountEvent } from '../domain/events/accountEvent';
import db from '../db/dbClient';

export class EventRepository {
  async saveEvent(event: AccountEvent): Promise<void> {
    await db
      .insertInto('account_events')
      .values({
        account_id: event.accountId,
        event_type: event.eventType,
        payload: event.payload,
        version: event.version,
        created_at: event.createdAt || new Date(),
      })
      .execute();
  }

  async getEventsAfterVersion(
    accountId: string,
    version: number
  ): Promise<AccountEvent[]> {
    const events = await db
      .selectFrom('account_events')
      .select([
        'id',
        'account_id as accountId',
        'event_type as eventType',
        'payload',
        'version',
        'created_at as createdAt',
      ])
      .where('account_id', '=', accountId)
      .where('version', '>', version)
      .orderBy('version')
      .execute();

    return events;
  }
}
