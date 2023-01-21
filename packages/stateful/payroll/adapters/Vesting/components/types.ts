import { EitherTokenInfo } from '@dao-dao/types'
import { VestingPayment } from '@dao-dao/types/contracts/CwVesting'

export type StatefulVestingPaymentCardProps = {
  vestingContractAddress: string
  vestingPayment: VestingPayment
  vestedAmount: number
  tokenInfo: EitherTokenInfo
}
