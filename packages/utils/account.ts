import { Account } from '@dao-dao/types'

export const areAccountsEqual = (a: Account, b: Account) =>
  a.type === b.type && a.chainId === b.chainId && a.address === b.address
