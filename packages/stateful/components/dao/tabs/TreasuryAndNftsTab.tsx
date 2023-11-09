import { waitForAny } from 'recoil'

import {
  TreasuryAndNftsTab as StatelessTreasuryAndNftsTab,
  useCachedLoading,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, LazyNftCardProps, TokenCardInfo } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { useActionForKey } from '../../../actions'
import { useMembership, useWallet } from '../../../hooks'
import {
  lazyNftCardPropsForDaoSelector,
  treasuryTokenCardInfosSelector,
} from '../../../recoil'
import {
  useCw20CommonGovernanceTokenInfoIfExists,
  useCw721CommonGovernanceTokenInfoIfExists,
  useNativeCommonGovernanceTokenInfoIfExists,
} from '../../../voting-module-adapter'
import { ButtonLink } from '../../ButtonLink'
import { LazyNftCard } from '../../NftCard'
import { DaoFiatDepositModal } from '../DaoFiatDepositModal'
import { DaoTokenCard } from '../DaoTokenCard'

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

  const chains = [
    [daoInfo.chainId, daoInfo.coreAddress],
    ...Object.entries(daoInfo.polytoneProxies),
  ]
  const tokens = useCachedLoading(
    waitForAny(
      chains.map(([chainId, address]) =>
        treasuryTokenCardInfosSelector({
          chainId,
          coreAddress: address,
          cw20GovernanceTokenAddress:
            chainId === daoInfo.chainId
              ? cw20GovernanceTokenAddress
              : undefined,
          nativeGovernanceTokenDenom:
            chainId === daoInfo.chainId
              ? nativeGovernanceTokenDenom
              : undefined,
        })
      )
    ),
    []
  )
  const nfts = useCachedLoading(
    lazyNftCardPropsForDaoSelector({
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
    <StatelessTreasuryAndNftsTab<TokenCardInfo, LazyNftCardProps>
      ButtonLink={ButtonLink}
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
      tokens={
        tokens.loading
          ? {
              loading: true,
            }
          : {
              loading: false,
              updating: tokens.updating,
              data: {
                infos: tokens.data
                  .map((loadable) =>
                    loadable.state === 'hasValue'
                      ? loadable.contents
                      : undefined
                  )
                  .filter(
                    (value): value is TokenCardInfo[] => value !== undefined
                  )
                  .flat(),
                // Map chain ID to loading state.
                loading: chains.reduce(
                  (acc, [chainId], index) => ({
                    ...acc,
                    [chainId]: tokens.data[index]?.state === 'loading',
                  }),
                  {} as Record<string, boolean>
                ),
              },
            }
      }
    />
  )
}
