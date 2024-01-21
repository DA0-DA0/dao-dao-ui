import {
  WalletDaos as StatelessWalletDaos,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { StatefulWalletDaosProps } from '@dao-dao/types'

import { allWalletDaosSelector } from '../../recoil'
import { LazyDaoCard } from '../dao'

export const WalletDaos = ({ chainWallets }: StatefulWalletDaosProps) => {
  const walletDaos = useCachedLoadingWithError(
    chainWallets.loading || chainWallets.errored
      ? undefined
      : allWalletDaosSelector(chainWallets.data)
  )

  return (
    <StatelessWalletDaos
      LazyDaoCard={LazyDaoCard}
      daos={chainWallets.errored ? chainWallets : walletDaos}
    />
  )
}
