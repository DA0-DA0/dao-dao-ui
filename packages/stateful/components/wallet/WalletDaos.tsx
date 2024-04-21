import uniqBy from 'lodash.uniqby'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, useSetRecoilState, waitForAny } from 'recoil'

import { commandModalVisibleAtom } from '@dao-dao/state/recoil'
import {
  WalletDaos as StatelessWalletDaos,
  useCachedLoadingWithError,
  useChain,
} from '@dao-dao/stateless'
import { LazyDaoCardProps, StatefulWalletDaosProps } from '@dao-dao/types'
import { getSupportedChains } from '@dao-dao/utils'

import { useProfile } from '../../hooks/useProfile'
import {
  lazyWalletDaosSelector,
  lazyWalletFollowingDaosSelector,
} from '../../recoil'
import { LazyDaoCard } from '../dao'
import { ProfileAddChains } from '../profile/ProfileAddChains'

export const WalletDaos = ({ address }: StatefulWalletDaosProps) => {
  const { t } = useTranslation()

  const { chain_id: chainId } = useChain()
  const { connected, chains } = useProfile({
    address,
  })

  const missingChains =
    !chains.loading && chains.data.length < getSupportedChains().length

  const walletDaos = useCachedLoadingWithError(
    chains.loading
      ? undefined
      : // If no chains and an address is passed, just use the current chain.
      chains.data.length === 0 && address
      ? waitForAny([
          waitForAny([
            lazyWalletDaosSelector({
              chainId,
              address,
            }),
            // Can't load following DAOs if there are no chains and thus no
            // public key to load from.
            constSelector([]),
          ]),
        ])
      : waitForAny(
          chains.data.map(({ chainId, address, publicKey }) =>
            waitForAny([
              lazyWalletDaosSelector({
                chainId,
                address,
              }),
              // If wallet connected, load following.
              connected
                ? lazyWalletFollowingDaosSelector({
                    chainId,
                    publicKey,
                  })
                : constSelector([]),
            ])
          )
        ),
    (data) =>
      data
        .flatMap((loadable): LazyDaoCardProps[] => {
          if (loadable.state !== 'hasValue') {
            return []
          }

          const [memberOf, following] = loadable.contents.map(
            (value) => value.valueMaybe() || []
          )

          const memberDaos = new Set(
            memberOf.map(({ coreAddress }) => coreAddress)
          )
          const followingDaos = new Set(
            following.map(({ coreAddress }) => coreAddress)
          )

          // Combine DAOs and remove duplicates.
          return uniqBy(
            [...memberOf, ...following],
            (dao) => dao.coreAddress
          ).map((props) => ({
            ...props,
            isMember: memberDaos.has(props.coreAddress),
            isFollowed: followingDaos.has(props.coreAddress),
          }))
        })
        .sort((a, b) => a.name.localeCompare(b.name))
  )

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
