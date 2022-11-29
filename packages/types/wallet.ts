import { ActionKeyAndData } from './actions'

export interface WalletTransactionForm {
  title: string
  description: string
  actionData: ActionKeyAndData[]
}
