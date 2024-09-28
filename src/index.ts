import express from 'express';

import { processCommand } from './application/accountService';
import { AccountRepository } from './repo/accountRepo';
import { EventRepository } from './repo/eventRepo';
import { withTransaction } from './db/withTransaction';

const accountRepository = new AccountRepository();
const eventRepository = new EventRepository();

const app = express();
app.use(express.json());

const addFunds = async (accountId: string, amount: number) => {
  // use function name for getting funcName in the log
  await withTransaction(async function addFundsCommand(transaction) {
    await processCommand(
      { commandType: 'ADD_FUND', accountId, amount },
      accountRepository,
      eventRepository
    );
  });
};

const chargeAccount = async (accountId: string, amount: number) => {
  await withTransaction(async function chargeAccount(transaction) {
    await processCommand(
      { commandType: 'CHARGE', accountId, amount },
      accountRepository,
      eventRepository
    );
  });
};

const openAccount = async (accountId: string) => {
  await withTransaction(async function openAccount(transaction) {
    await processCommand(
      { commandType: 'OPEN_ACCOUNT', accountId },
      accountRepository,
      eventRepository
    );
  });
};

app.post('/api/account', async (req, res) => {
  const { accountId } = req.body;

  try {
    await openAccount(accountId);
    res.status(200).send({ message: `Opened account ${accountId}` });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Add Fund Endpoint
app.post('/api/account/addFund', async (req, res) => {
  const { accountId, amount } = req.body;

  try {
    await addFunds(accountId, amount);
    res
      .status(200)
      .send({ message: `Added ${amount} to account ${accountId}` });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Charge Endpoint
app.post('/api/account/charge', async (req, res) => {
  const { accountId, amount } = req.body;

  try {
    await chargeAccount(accountId, amount);
    res
      .status(200)
      .send({ message: `Charged ${amount} from account ${accountId}` });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
