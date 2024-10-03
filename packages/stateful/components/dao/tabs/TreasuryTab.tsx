import {
  lazyNftCardInfosForDaoSelector,
  treasuryTokenCardInfosForDaoSelector,
} from '@dao-dao/state'
import {
  TreasuryTab as StatelessTreasuryTab,
  useCachedLoading,
  useDao,
  useDaoNavHelpers,
  useInitializedActionForKey,
} from '@dao-dao/stateless'
import { ActionKey, LazyNftCardInfo, TokenCardInfo } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { useWallet } from '../../../hooks'
import {
  useCw20CommonGovernanceTokenInfoIfExists,
  useCw721CommonGovernanceTokenInfoIfExists,
  useNativeCommonGovernanceTokenInfoIfExists,
} from '../../../voting-module-adapter'
import { ButtonLink } from '../../ButtonLink'
import { IconButtonLink } from '../../IconButtonLink'
import { LazyNftCard } from '../../nft'
import { TreasuryHistoryGraph } from '../../TreasuryHistoryGraph'
import { DaoFiatDepositModal } from '../DaoFiatDepositModal'
import { DaoTokenLine } from '../DaoTokenLine'

export const TreasuryTab = () => {
  const dao = useDao()
  const { isWalletConnected } = useWallet()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const { denomOrAddress: cw20GovernanceTokenAddress } =
    useCw20CommonGovernanceTokenInfoIfExists() ?? {}
  const { denomOrAddress: nativeGovernanceTokenDenom } =
    useNativeCommonGovernanceTokenInfoIfExists() ?? {}
  const { denomOrAddress: cw721GovernanceCollectionAddress } =
    useCw721CommonGovernanceTokenInfoIfExists() ?? {}

  const tokens = useCachedLoading(
    treasuryTokenCardInfosForDaoSelector({
      chainId: dao.chainId,
      coreAddress: dao.coreAddress,
      cw20GovernanceTokenAddress,
      nativeGovernanceTokenDenom,
    }),
    {}
  )
  const nfts = useCachedLoading(
    lazyNftCardInfosForDaoSelector({
      chainId: dao.chainId,
      coreAddress: dao.coreAddress,
      governanceCollectionAddress: cw721GovernanceCollectionAddress,
    }),
    {}
  )

  const createCrossChainAccountAction = useInitializedActionForKey(
    ActionKey.CreateCrossChainAccount
  )
  const createCrossChainAccountPrefill =
    createCrossChainAccountAction.loading ||
    createCrossChainAccountAction.errored
      ? undefined
      : getDaoProposalSinglePrefill({
          actions: [
            {
              actionKey: createCrossChainAccountAction.data.key,
              data: createCrossChainAccountAction.data.defaults,
            },
          ],
        })

  const configureRebalancerAction = useInitializedActionForKey(
    ActionKey.ConfigureRebalancer
  )
  const configureRebalancerPrefill =
    configureRebalancerAction.loading || configureRebalancerAction.errored
      ? undefined
      : getDaoProposalSinglePrefill({
          actions: [
            {
              actionKey: configureRebalancerAction.data.key,
              data: configureRebalancerAction.data.defaults,
            },
          ],
        })

  return (
    <StatelessTreasuryTab<TokenCardInfo, LazyNftCardInfo>
      ButtonLink={ButtonLink}
      FiatDepositModal={DaoFiatDepositModal}
      IconButtonLink={IconButtonLink}
      NftCard={LazyNftCard}
      TokenLine={DaoTokenLine}
      TreasuryHistoryGraph={TreasuryHistoryGraph}
      configureRebalancerHref={
        // Prefill URL only valid if action exists.
        configureRebalancerAction
          ? getDaoProposalPath(dao.coreAddress, 'create', {
              prefill: configureRebalancerPrefill,
            })
          : undefined
      }
      connected={isWalletConnected}
      createCrossChainAccountHref={
        // Only show create cross-chain account button if we can use the action
        // (i.e. chains are missing and can be created).
        createCrossChainAccountPrefill &&
        !createCrossChainAccountAction.loading &&
        !createCrossChainAccountAction.errored &&
        !createCrossChainAccountAction.data.metadata.hideFromPicker
          ? getDaoProposalPath(dao.coreAddress, 'create', {
              prefill: createCrossChainAccountPrefill,
            })
          : undefined
      }
      nfts={nfts}
      tokens={tokens.loading ? {} : tokens.data}
    />
  )
}
