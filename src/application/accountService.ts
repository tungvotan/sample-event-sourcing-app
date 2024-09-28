import { AddFundCommand, handleAddFund } from '../domain/commands/addFund';
import { ChargeCommand, handleCharge } from '../domain/commands/charge';
import {
  handleOpenAccount,
  OpenAccountCommand,
} from '../domain/commands/openAccount';
import { AccountRepository } from '../repo/accountRepo';
import { EventRepository } from '../repo/eventRepo';

export const processCommand = async (
  command: any,
  accountRepository: AccountRepository,
  eventRepository: EventRepository
) => {
  switch (command.commandType) {
    case 'OPEN_ACCOUNT':
      await handleOpenAccount(
        command as OpenAccountCommand,
        accountRepository,
        eventRepository
      );
      break;
    case 'ADD_FUND':
      await handleAddFund(
        command as AddFundCommand,
        accountRepository,
        eventRepository
      );
      break;
    case 'CHARGE':
      await handleCharge(
        command as ChargeCommand,
        accountRepository,
        eventRepository
      );
      break;
    default:
      throw new Error(`Unknown command type: ${command.commandType}`);
  }
};
