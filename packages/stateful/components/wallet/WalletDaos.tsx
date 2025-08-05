import { useQueries } from '@tanstack/react-query'
import uniqBy from 'lodash.uniqby'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { walletQueries } from '@dao-dao/state/query'
import { commandModalVisibleAtom } from '@dao-dao/state/recoil'
import { WalletDaos as StatelessWalletDaos, useChain } from '@dao-dao/stateless'
import {
  LazyDaoCardProps,
  LoadingDataWithError,
  StatefulWalletDaosProps,
} from '@dao-dao/types'
import {
  getSupportedChains,
  makeCombineQueryResultsIntoLoadingDataWithError,
  serializeDaoSource,
} from '@dao-dao/utils'

import { useFollowingDaos, useLoadingLazyDaos } from '../../hooks'
import { useProfile } from '../../hooks/useProfile'
import { LazyDaoCard } from '../dao'
import { ProfileAddChains } from '../profile/ProfileAddChains'

export const WalletDaos = ({ address }: StatefulWalletDaosProps) => {
  const { t } = useTranslation()

  const { chainId } = useChain()

  const { connected, chains } = useProfile({
    address,
  })

  const missingChains =
    !chains.loading && chains.data.length < getSupportedChains().length

  const { following } = useFollowingDaos()
  const lazyFollowing = useLoadingLazyDaos(following)
  const lazyMemberOf = useQueries({
    queries: chains.loading
      ? []
      : chains.data.length === 0 && address
        ? // If no chains and an address is passed, just use the current chain.
          [
            walletQueries.lazyWalletDaos({
              chainId,
              address,
            }),
          ]
        : chains.data.map(({ chainId, address }) =>
            walletQueries.lazyWalletDaos({
              chainId,
              address,
            })
          ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      firstLoad: 'one',
      errorIf: 'all',
      transform: (results) => results.flat(),
    }),
  })

  const getWalletDaos = (): LoadingDataWithError<LazyDaoCardProps[]> => {
    if (lazyMemberOf.loading && lazyFollowing.loading) {
      return {
        loading: true,
        errored: false,
      }
    }

    if (lazyMemberOf.errored && lazyFollowing.errored) {
      const error =
        'error' in lazyMemberOf
          ? lazyMemberOf.error
          : 'error' in lazyFollowing
            ? lazyFollowing.error
            : new Error('Unknown error')
      return {
        loading: false,
        errored: true,
        error,
      }
    }

    const memberOf =
      lazyMemberOf.loading ||
      ('errored' in lazyMemberOf && lazyMemberOf.errored)
        ? []
        : lazyMemberOf.data
    const following =
      lazyFollowing.loading ||
      ('errored' in lazyFollowing && lazyFollowing.errored)
        ? []
        : lazyFollowing.data

    const memberDaos = new Set(
      memberOf.map((dao) => serializeDaoSource(dao.info))
    )
    const followingDaos = new Set(
      following.map((dao) => serializeDaoSource(dao.info))
    )

    // Combine DAOs and remove duplicates.
    return {
      loading: false,
      errored: false,
      data: uniqBy([...memberOf, ...following], (dao) =>
        serializeDaoSource(dao.info)
      )
        .map((props) => ({
          ...props,
          isMember: memberDaos.has(serializeDaoSource(props.info)),
          isFollowed: followingDaos.has(serializeDaoSource(props.info)),
        }))
        .sort((a, b) => a.info.name.localeCompare(b.info.name)),
    }
  }
  const walletDaos = getWalletDaos()

  const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)
  const openSearch = useCallback(
    () => setCommandModalVisible(true),
    [setCommandModalVisible]
  )

  return (
    <div className="flex flex-col gap-4">
      <StatelessWalletDaos
        LazyDaoCard={LazyDaoCard}
        daos={walletDaos}
        includesFollowing={!address}
        openSearch={address ? undefined : openSearch}
      />

      {missingChains && connected && (
        <ProfileAddChains
          className="self-end"
          prompt={t('button.addChains')}
          promptTooltip={t('info.supportedChainDaosNotShowingUpPrompt')}
        />
      )}
    </div>
  )
}
