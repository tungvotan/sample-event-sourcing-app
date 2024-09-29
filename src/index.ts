import express from 'express';

import { processCommand } from './application/accountService';
import { AccountRepository } from './repo/accountRepo';
import { EventRepository } from './repo/eventRepo';
import { withTransaction } from './db/withTransaction';
import requestLogger from './middleware/withRequestLogger';

const accountRepository = new AccountRepository();
const eventRepository = new EventRepository();

const app = express();

app.use(express.json());
app.use(requestLogger);

const addFunds = async (accountId: string, amount: number) => {
  // use function name for getting funcName in the log
  await withTransaction(async function addFundsCommand() {
    await processCommand(
      { commandType: 'ADD_FUND', accountId, amount },
      accountRepository,
      eventRepository
    );
  });
};

const chargeAccount = async (accountId: string, amount: number) => {
  await withTransaction(async function chargeAccount() {
    await processCommand(
      { commandType: 'CHARGE', accountId, amount },
      accountRepository,
      eventRepository
    );
  });
};

const openAccount = async (accountId: string, initialBalance: number) => {
  await withTransaction(async function openAccount() {
    await processCommand(
      { commandType: 'OPEN_ACCOUNT', accountId, initialBalance },
      accountRepository,
      eventRepository
    );
  });
};

app.post('/api/account', async (req, res) => {
  const { accountId, initialBalance } = req.body;

  try {
    await openAccount(accountId, initialBalance);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
