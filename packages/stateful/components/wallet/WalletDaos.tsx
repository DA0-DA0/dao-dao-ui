import { waitForAny } from 'recoil'

import {
  WalletDaos as StatelessWalletDaos,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { StatefulWalletDaosProps } from '@dao-dao/types'
import { transformLoadingDataWithError } from '@dao-dao/utils'

import { walletDaosSelector } from '../../recoil'
import { LazyDaoCard } from '../dao'

export const WalletDaos = ({
  chainWallets,
  ...props
}: StatefulWalletDaosProps) => {
  const walletDaos = useCachedLoadingWithError(
    chainWallets.loading || chainWallets.errored
      ? undefined
      : waitForAny(
          chainWallets.data.map((chainWallet) =>
            walletDaosSelector(chainWallet)
          )
        ),
    (data) =>
      data
        .flatMap((loadable) => loadable.valueMaybe() || [])
        .sort((a, b) => a.name.localeCompare(b.name))
  )

  return (
    <StatelessWalletDaos
      {...props}
      LazyDaoCard={LazyDaoCard}
      chainIds={transformLoadingDataWithError(chainWallets, (data) =>
        data.map(({ chainId }) => chainId)
      )}
      daos={chainWallets.errored ? chainWallets : walletDaos}
    />
  )
}
