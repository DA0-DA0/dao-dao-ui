import { GenericToken } from '@dao-dao/types'

export type WyndDepositData = {
  outputToken: Pick<GenericToken, 'type' | 'denomOrAddress'>
  outputAmount: string

  // Optional
  // Defaults to hidden.
  markdown?: string | null
  // Defaults to DAO's treasury.
  outputAddress?: string
  // Defaults to 'Deposit'
  buttonLabel?: string
  // Defaults to 'Choose token to pay with...'
  tokenInstructions?: string | null
}
