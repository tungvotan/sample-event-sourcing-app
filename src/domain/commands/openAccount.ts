import { AccountRepository } from '../../repo/accountRepo';
import { EventRepository } from '../../repo/eventRepo';
import { Account, createAccount } from '../account';
import { createAccountEvent } from '../events/accountEvent';

export type OpenAccountCommand = {
  commandType: 'OPEN_ACCOUNT';
  accountId: string;
  initialBalance: number;
};

export const handleOpenAccount = async (
  command: OpenAccountCommand,
  accountRepository: AccountRepository,
  eventRepository: EventRepository
) => {
  const { accountId, initialBalance } = command;

  const existingAccount = await accountRepository.getById(accountId);
  if (existingAccount) {
    throw new Error(`Account with ID ${accountId} already exists.`);
  }

  const newAccount: Account = createAccount(accountId, initialBalance);

  const event = createAccountEvent(
    accountId,
    'ACCOUNT_CREATED',
    { initialBalance },
    1
  );

  await accountRepository.save(newAccount);
  await eventRepository.saveEvent(event);
};
