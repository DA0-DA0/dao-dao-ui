import {
  WalletDaos as StatelessWalletDaos,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { StatefulWalletDaosProps } from '@dao-dao/types'

import { allWalletDaosSelector, walletDaosSelector } from '../../recoil'
import { LazyDaoCard } from '../dao'

export const WalletDaos = ({
  walletAddress,
  chainId,
}: StatefulWalletDaosProps) => {
  const walletDaos = useCachedLoadingWithError(
    chainId
      ? walletDaosSelector({
          walletAddress,
          chainId,
        })
      : allWalletDaosSelector({
          walletAddress,
        })
  )

  return <StatelessWalletDaos LazyDaoCard={LazyDaoCard} daos={walletDaos} />
}
