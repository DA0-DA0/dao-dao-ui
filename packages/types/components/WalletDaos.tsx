import { ComponentType } from 'react'

import { LoadingDataWithError } from '../misc'
import { LazyDaoCardProps } from './DaoCard'

export type WalletDaosProps = {
  /**
   * All chains the DAOs are on.
   */
  chainIds: LoadingDataWithError<string[]>
  /**
   * All DAOs.
   */
  daos: LoadingDataWithError<LazyDaoCardProps[]>
  /**
   * Stateful lazy DAO card component.
   */
  LazyDaoCard: ComponentType<LazyDaoCardProps>
  /**
   * Chain selection callback. This may be used to attempt to connect to a chain
   * if not already connected.
   */
  onChainSelect?: (chainId: string) => void
}

export type StatefulWalletDaosProps = Pick<WalletDaosProps, 'onChainSelect'> & {
  chainWallets: LoadingDataWithError<
    {
      chainId: string
      address: string
    }[]
  >
}
