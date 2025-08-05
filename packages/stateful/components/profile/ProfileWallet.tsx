import { useQueries } from '@tanstack/react-query'
import { constSelector, waitForAny } from 'recoil'

import { accountQueries } from '@dao-dao/state/query'
import { walletTokenCardInfosSelector } from '@dao-dao/state/recoil'
import {
  ProfileWallet as StatelessProfileWallet,
  useCachedLoadingWithError,
  useInitializedActionForKey,
} from '@dao-dao/stateless'
import { ActionKey, StatefulProfileWalletProps } from '@dao-dao/types'
import {
  getActionBuilderPrefillPath,
  makeCombineQueryResultsIntoLoadingDataWithError,
} from '@dao-dao/utils'

import {
  useHiddenBalancesKvpkClient,
  useProfile,
  useQueryLoadingDataWithError,
} from '../../hooks'
import { ButtonLink } from '../ButtonLink'
import { IconButtonLink } from '../IconButtonLink'
import { TreasuryHistoryGraph } from '../TreasuryHistoryGraph'
import { WalletTokenLineReadonly } from '../wallet'
import { WalletTokenLine } from '../wallet/WalletTokenLine'
import { ProfileAddChains } from './ProfileAddChains'

export const ProfileWallet = ({ address }: StatefulProfileWalletProps = {}) => {
  // Read-only if address is defined.
  const readOnly = !!address

  const { profile, chains } = useProfile({
    address,
  })
  const { client: hiddenBalancesKvpkClient } = useHiddenBalancesKvpkClient()

  const accounts = useQueries({
    queries:
      chains.loading || chains.data.length === 0
        ? []
        : chains.data.map(({ chainId, address }) =>
            accountQueries.list({
              chainId,
              address,
            })
          ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      loadIfNone: chains.loading,
      firstLoad: 'one',
      errorIf: 'all',
      transform: (data) => data.flat(),
    }),
  })

  const tokens = useCachedLoadingWithError(
    chains.loading
      ? undefined
      : chains.data.length > 0
        ? waitForAny(
            chains.data.map(({ chainId, address }) =>
              walletTokenCardInfosSelector({
                chainId,
                walletAddress: address,
              })
            )
          )
        : constSelector([]),
    (chainLoadables) => chainLoadables.flatMap((l) => l.valueMaybe() || [])
  )

  const hiddenTokens = useQueryLoadingDataWithError(
    profile.loading
      ? undefined
      : hiddenBalancesKvpkClient.listQuery({ uuid: profile.data.uuid }),
    (data) => data.map(({ key }) => key)
  )

  const configureRebalancerAction = useInitializedActionForKey(
    ActionKey.ConfigureRebalancer
  )

  return (
    <StatelessProfileWallet
      ButtonLink={ButtonLink}
      IconButtonLink={IconButtonLink}
      ProfileAddChains={ProfileAddChains}
      TokenLine={readOnly ? WalletTokenLineReadonly : WalletTokenLine}
      TreasuryHistoryGraph={TreasuryHistoryGraph}
      accounts={accounts}
      configureRebalancerHref={
        !readOnly &&
        !configureRebalancerAction.loading &&
        !configureRebalancerAction.errored
          ? getActionBuilderPrefillPath([
              {
                actionKey: configureRebalancerAction.data.key,
                data: configureRebalancerAction.data.defaults,
              },
            ])
          : undefined
      }
      hiddenTokens={hiddenTokens}
      readOnly={readOnly}
      tokens={tokens}
    />
  )
}
