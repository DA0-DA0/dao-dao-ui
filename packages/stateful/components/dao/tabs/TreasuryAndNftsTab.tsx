import { useWallet } from '@noahsaso/cosmodal'

import {
  TreasuryAndNftsTab as StatelessTreasuryAndNftsTab,
  useCachedLoading,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { useActionForKey } from '../../../actions'
import { useMembership } from '../../../hooks'
import {
  nftCardInfosForDaoSelector,
  treasuryTokenCardInfosSelector,
} from '../../../recoil'
import {
  useCw20CommonGovernanceTokenInfoIfExists,
  useCw721CommonGovernanceTokenInfoIfExists,
  useNativeCommonGovernanceTokenInfoIfExists,
} from '../../../voting-module-adapter'
import { ButtonLink } from '../../ButtonLink'
import { NftCard } from '../../NftCard'
import { StargazeNftImportModal } from '../../StargazeNftImportModal'
import { DaoFiatDepositModal } from '../DaoFiatDepositModal'
import { DaoTokenCard } from '../DaoTokenCard'

export const TreasuryAndNftsTab = () => {
  const daoInfo = useDaoInfoContext()
  const { connected } = useWallet()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { isMember = false } = useMembership(daoInfo)

  const { denomOrAddress: cw20GovernanceTokenAddress } =
    useCw20CommonGovernanceTokenInfoIfExists() ?? {}
  const { denomOrAddress: nativeGovernanceTokenDenom } =
    useNativeCommonGovernanceTokenInfoIfExists() ?? {}
  const { denomOrAddress: cw721GovernanceCollectionAddress } =
    useCw721CommonGovernanceTokenInfoIfExists() ?? {}

  const tokens = useCachedLoading(
    treasuryTokenCardInfosSelector({
      chainId: daoInfo.chainId,
      coreAddress: daoInfo.coreAddress,
      cw20GovernanceTokenAddress,
      nativeGovernanceTokenDenom,
    }),
    []
  )
  const nfts = useCachedLoading(
    nftCardInfosForDaoSelector({
      chainId: daoInfo.chainId,
      coreAddress: daoInfo.coreAddress,
      governanceCollectionAddress: cw721GovernanceCollectionAddress,
    }),
    []
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
    <StatelessTreasuryAndNftsTab
      ButtonLink={ButtonLink}
      FiatDepositModal={connected ? DaoFiatDepositModal : undefined}
      NftCard={NftCard}
      StargazeNftImportModal={StargazeNftImportModal}
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
      createCrossChainAccountPrefillHref={getDaoProposalPath(
        daoInfo.coreAddress,
        'create',
        {
          prefill: createCrossChainAccountPrefill,
        }
      )}
      isMember={isMember}
      nfts={nfts}
      tokens={tokens}
    />
  )
}
