import { useTranslation } from 'react-i18next'

import { communityPoolBalancesSelector } from '@dao-dao/state/recoil'
import {
  ErrorPage,
  LineLoaders,
  TokenLineHeader,
  TooltipInfoIcon,
  useCachedLoadingWithError,
  useChain,
} from '@dao-dao/stateless'
import { AccountType, TokenCardInfo } from '@dao-dao/types'
import {
  COMMUNITY_POOL_ADDRESS_PLACEHOLDER,
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

import { GovActionsProvider } from '../../actions'
import { TreasuryHistoryGraph } from '../TreasuryHistoryGraph'
import { GovTokenLine } from './GovTokenLine'

export const GovCommunityPoolTab = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()

  const tokenCardInfos = useCachedLoadingWithError(
    communityPoolBalancesSelector({
      chainId,
    }),
    (data) =>
      data
        .map(({ token, balance }): TokenCardInfo => {
          const unstakedBalance = convertMicroDenomToDenomWithDecimals(
            balance,
            token.decimals
          )

          return {
            owner: {
              type: AccountType.Native,
              address: '',
              chainId: token.chainId,
            },
            token,
            isGovernanceToken:
              getNativeTokenForChainId(token.chainId).denomOrAddress ===
              token.denomOrAddress,
            unstakedBalance,
            hasStakingInfo: false,
            lazyInfo: { loading: true },
          }
        })
        // Sort governance token first and factory tokens last.
        .sort((a, b) => {
          if (a.isGovernanceToken) {
            return -1
          }

          if (b.isGovernanceToken) {
            return 1
          }

          const aIsFactory = a.token.denomOrAddress.startsWith('factory/')
          const bIsFactory = b.token.denomOrAddress.startsWith('factory/')

          if (aIsFactory && !bIsFactory) {
            return 1
          }

          if (!aIsFactory && bIsFactory) {
            return -1
          }

          return 0
        })
  )

  return (
    <>
      <TreasuryHistoryGraph
        address={COMMUNITY_POOL_ADDRESS_PLACEHOLDER}
        chainId={chainId}
        className="mb-8 hidden rounded-md bg-background-tertiary p-6 md:flex"
        graphClassName="max-h-[20rem]"
        header={
          <div className="flex flex-row items-center justify-center gap-1">
            <p className="title-text">{t('title.treasuryValue')}</p>

            <TooltipInfoIcon size="sm" title={t('info.treasuryValueTooltip')} />
          </div>
        }
      />

      <GovActionsProvider
        loader={
          <div>
            <TokenLineHeader />
            <LineLoaders lines={10} type="token" />
          </div>
        }
      >
        {tokenCardInfos.loading ? (
          <div>
            <TokenLineHeader />
            <LineLoaders lines={10} type="token" />
          </div>
        ) : tokenCardInfos.errored ? (
          <ErrorPage error={tokenCardInfos.error} />
        ) : (
          <div>
            <TokenLineHeader />

            {tokenCardInfos.data.map((props, index) => (
              <GovTokenLine
                {...props}
                key={index}
                hideChainIcon
                transparentBackground={index % 2 !== 0}
              />
            ))}
          </div>
        )}
      </GovActionsProvider>
    </>
  )
}
