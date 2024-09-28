import { AccountRepository } from '../../repo/accountRepo';
import { EventRepository } from '../../repo/eventRepo';
import { addFunds } from '../account';
import { createAccountEvent } from '../events/accountEvent';

export type AddFundCommand = {
  commandType: 'ADD_FUND';
  accountId: string;
  amount: number;
};

export const handleAddFund = async (
  command: AddFundCommand,
  accountRepository: AccountRepository,
  eventRepository: EventRepository
) => {
  const { accountId, amount } = command;

  const account = await accountRepository.getById(accountId);
  if (!account) {
    throw new Error(`Account with ID ${accountId} does not exist.`);
  }

  const updatedAccount = addFunds(account, amount);

  const event = createAccountEvent(
    accountId,
    'FUND_ADDED',
    { amount },
    updatedAccount.version
  );
  await eventRepository.saveEvent(event);

  await accountRepository.save(updatedAccount);
};
