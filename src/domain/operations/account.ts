import { Account } from '../entities/accountEntity';

export const createAccount = (accountId: string, balance = 0): Account => ({
  accountId,
  balance,
  version: 0,
});

export const addFunds = (account: Account, amount: number): Account => ({
  ...account,
  balance: account.balance + amount,
  version: account.version + 1,
});

export const charge = (account: Account, amount: number): Account => {
  if (amount > account.balance) throw new Error('Insufficient funds');
  return {
    ...account,
    balance: account.balance - amount,
    version: account.version + 1,
  };
};
