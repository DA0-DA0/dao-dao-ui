import { ComponentType } from 'react'

import { LoadingDataWithError } from '../misc'
import { LazyDaoCardProps } from './DaoCard'

export type WalletDaosProps = {
  /**
   * All DAOs.
   */
  daos: LoadingDataWithError<LazyDaoCardProps[]>
  /**
   * Stateful lazy DAO card component.
   */
  LazyDaoCard: ComponentType<LazyDaoCardProps>
  /**
   * Optionally prompt to search for DAOs if nothing is found.
   */
  openSearch?: () => void
  /**
   * Whether or not `daos` includes DAOs the profile follows. If so, additional
   * filtering options will be available.
   */
  includesFollowing?: boolean
}

export type StatefulWalletDaosProps = {
  /**
   * Optionally specify a wallet to fetch DAOs for. If not specified, will load
   * from current wallet and add following DAOs.
   */
  address?: string
}
