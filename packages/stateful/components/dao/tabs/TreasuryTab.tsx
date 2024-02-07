import {
  TreasuryTab as StatelessTreasuryTab,
  useCachedLoading,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, LazyNftCardInfo, TokenCardInfo } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

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

  const createCrossChainAccountPrefill = getDaoProposalSinglePrefill({
    actions: [
      {
        actionKey: ActionKey.CreateCrossChainAccount,
        data: {
          chainId: 'CHAIN_ID',
        },
      },
    ],
  })

  return (
    <StatelessTreasuryTab<TokenCardInfo, LazyNftCardInfo>
      FiatDepositModal={DaoFiatDepositModal}
      NftCard={LazyNftCard}
      TokenLine={DaoTokenLine}
      TreasuryHistoryGraph={TreasuryHistoryGraph}
      connected={isWalletConnected}
      createCrossChainAccountPrefillHref={getDaoProposalPath(
        daoInfo.coreAddress,
        'create',
        {
          prefill: createCrossChainAccountPrefill,
        }
      )}
      nfts={nfts}
      tokens={tokens.loading ? {} : tokens.data}
    />
  )
}
