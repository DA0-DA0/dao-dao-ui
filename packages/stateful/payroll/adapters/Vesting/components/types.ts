import { GenericToken } from '@dao-dao/types'
import { VestingPayment } from '@dao-dao/types/contracts/CwVesting'

export type VestingInfo = {
  vestingContractAddress: string
  vestingPayment: VestingPayment
  vestedAmount: number
  token: GenericToken
  owner: string | undefined
}
