import { SignData } from '@noahsaso/cosmos-kit-web3auth'

export type Web3AuthPrompt = {
  signData: SignData
  resolve: (approved: boolean) => void
}
