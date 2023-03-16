import { GenericToken } from '@dao-dao/types'

export type WyndDepositData = {
  markdown: string
  buttonLabel: string
  outputAddress: string
  outputToken: Pick<GenericToken, 'type' | 'denomOrAddress'>
  outputAmount: string
}
