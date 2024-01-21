import { LoadingDataWithError } from '../misc'

export type StatefulWalletDaosProps = {
  chainWallets: LoadingDataWithError<
    {
      chainId: string
      walletAddress: string
    }[]
  >
}
