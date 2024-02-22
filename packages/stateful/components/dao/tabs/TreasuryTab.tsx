import {
  TreasuryTab as StatelessTreasuryTab,
  useCachedLoading,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, LazyNftCardInfo, TokenCardInfo } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { useActionForKey } from '../../../actions'
import { useWallet } from '../../../hooks'
import {
  lazyNftCardInfosForDaoSelector,
  treasuryTokenCardInfosForDaoSelector,
} from '../../../recoil'
import {
  useCw20CommonGovernanceTokenInfoIfExists,
  useCw721CommonGovernanceTokenInfoIfExists,
  useNativeCommonGovernanceTokenInfoIfExists,
} from '../../../voting-module-adapter'
import { ButtonLink } from '../../ButtonLink'
import { LazyNftCard } from '../../nft'
import { TreasuryHistoryGraph } from '../../TreasuryHistoryGraph'
import { DaoFiatDepositModal } from '../DaoFiatDepositModal'
import { DaoTokenLine } from '../DaoTokenLine'

export const TreasuryTab = () => {
  const daoInfo = useDaoInfoContext()
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
      chainId: daoInfo.chainId,
      coreAddress: daoInfo.coreAddress,
      cw20GovernanceTokenAddress,
      nativeGovernanceTokenDenom,
    }),
    {}
  )
  const nfts = useCachedLoading(
    lazyNftCardInfosForDaoSelector({
      chainId: daoInfo.chainId,
      coreAddress: daoInfo.coreAddress,
      governanceCollectionAddress: cw721GovernanceCollectionAddress,
    }),
    {}
  )

  const createCrossChainAccountAction = useActionForKey(
    ActionKey.CreateCrossChainAccount
  )
  const createCrossChainAccountActionDefaults =
    createCrossChainAccountAction?.useDefaults()
  const createCrossChainAccountPrefill = getDaoProposalSinglePrefill({
    actions: createCrossChainAccountAction
      ? [
          {
            actionKey: createCrossChainAccountAction.key,
            data: createCrossChainAccountActionDefaults,
          },
        ]
      : [],
  })

  return (
    <StatelessTreasuryTab<TokenCardInfo, LazyNftCardInfo>
      ButtonLink={ButtonLink}
      FiatDepositModal={DaoFiatDepositModal}
      NftCard={LazyNftCard}
      TokenLine={DaoTokenLine}
      TreasuryHistoryGraph={TreasuryHistoryGraph}
      connected={isWalletConnected}
      createCrossChainAccountHref={
        // Only show create cross-chain account button if we can use the action
        // (i.e. chains are missing and can be created).
        createCrossChainAccountAction &&
        !createCrossChainAccountAction.hideFromPicker
          ? getDaoProposalPath(daoInfo.coreAddress, 'create', {
              prefill: createCrossChainAccountPrefill,
            })
          : undefined
      }
      nfts={nfts}
      tokens={tokens.loading ? {} : tokens.data}
    />
  )
}
