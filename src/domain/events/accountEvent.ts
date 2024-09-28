export type eventType = 'ACCOUNT_CREATED' | 'FUND_ADDED' | 'CHARGE_APPLIED';

export type AccountEvent = {
  accountId: string;
  eventType: eventType;
  payload: any;
  version: number;
  createdAt?: Date;
};

export const createAccountEvent = (
  accountId: string,
  eventType: eventType,
  payload: any,
  version: number
): AccountEvent => ({
  accountId,
  eventType,
  payload,
  version,
});
