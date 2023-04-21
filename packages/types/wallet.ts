import { SignData } from '@noahsaso/cosmodal/dist/wallets/web3auth/types'

export type Web3AuthPrompt = {
  signData: SignData
  resolve: (approved: boolean) => void
}
