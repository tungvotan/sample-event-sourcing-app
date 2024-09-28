import { AccountRepository } from '../../repo/accountRepo';
import { EventRepository } from '../../repo/eventRepo';
import { charge } from '../account';
import { createAccountEvent } from '../events/accountEvent';

export type ChargeCommand = {
  commandType: 'CHARGE';
  accountId: string;
  amount: number;
};

export const handleCharge = async (
  command: ChargeCommand,
  accountRepository: AccountRepository,
  eventRepository: EventRepository
) => {
  const { accountId, amount } = command;

  let account = await accountRepository.getById(accountId);
  if (!account) {
    throw new Error(`Account with ID ${accountId} does not exist.`);
  }

  if (account.balance < amount) {
    throw new Error('Insufficient balance.');
  }

  const updatedAccount = charge(account, amount);

  const event = createAccountEvent(
    accountId,
    'CHARGE_APPLIED',
    { amount },
    updatedAccount.version
  );

  await eventRepository.saveEvent(event);
  await accountRepository.save(updatedAccount);
};
