import { coins, StdFee } from '@cosmjs/stargate'

export const defaultExecuteFee: StdFee = {
  amount: coins(3000, process.env.NEXT_PUBLIC_STAKING_DENOM!),
  gas: '333333',
}
