import {
  TreasuryAndNftsTab as StatelessTreasuryAndNftsTab,
  useCachedLoading,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, LazyNftCardInfo, TokenCardInfo } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { useActionForKey } from '../../../actions'
import { useMembership, useWallet } from '../../../hooks'
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
import { DaoFiatDepositModal } from '../DaoFiatDepositModal'
import { DaoTokenCard } from '../DaoTokenCard'
import { DaoTreasuryHistoryGraph } from '../DaoTreasuryHistoryGraph'

export const TreasuryAndNftsTab = () => {
  const daoInfo = useDaoInfoContext()
  const { isWalletConnected } = useWallet()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { isMember = false } = useMembership(daoInfo)

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

  // ManageCw721 action defaults to adding
  const addCw721Action = useActionForKey(ActionKey.ManageCw721)
  const addCw721ActionDefaults = addCw721Action?.action.useDefaults()

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
    <StatelessTreasuryAndNftsTab<TokenCardInfo, LazyNftCardInfo>
      ButtonLink={ButtonLink}
      DaoTreasuryHistoryGraph={DaoTreasuryHistoryGraph}
      FiatDepositModal={DaoFiatDepositModal}
      NftCard={LazyNftCard}
      TokenCard={DaoTokenCard}
      addCollectionHref={
        // Prefill URL only valid if action exists.
        !!addCw721Action
          ? getDaoProposalPath(daoInfo.coreAddress, 'create', {
              prefill: getDaoProposalSinglePrefill({
                actions: addCw721Action
                  ? [
                      {
                        actionKey: addCw721Action.action.key,
                        data: addCw721ActionDefaults,
                      },
                    ]
                  : [],
              }),
            })
          : undefined
      }
      connected={isWalletConnected}
      createCrossChainAccountPrefillHref={getDaoProposalPath(
        daoInfo.coreAddress,
        'create',
        {
          prefill: createCrossChainAccountPrefill,
        }
      )}
      isMember={isMember}
      nfts={nfts.loading ? {} : nfts.data}
      tokens={tokens.loading ? {} : tokens.data}
    />
  )
}
