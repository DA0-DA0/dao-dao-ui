import { GenericToken } from '@dao-dao/types'

export type WyndDepositData = {
  markdown: string
  outputToken: Pick<GenericToken, 'type' | 'denomOrAddress'>
  outputAmount: string

  // Optional
  // Defaults to DAO's treasury.
  outputAddress?: string
  // Defaults to 'Deposit'
  buttonLabel?: string
  // Defaults to 'Choose token to pay with...'
  tokenInstructions?: string | null
}
