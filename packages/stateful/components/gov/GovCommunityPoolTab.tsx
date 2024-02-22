import { waitForAny } from 'recoil'

import { communityPoolBalancesSelector } from '@dao-dao/state/recoil'
import {
  ButtonPopup,
  ErrorPage,
  LineLoaders,
  TokenLineHeader,
  useButtonPopupSorter,
  useCachedLoadingWithError,
  useChain,
  useTokenSortOptions,
} from '@dao-dao/stateless'
import { LoadingDataWithError, TokenCardInfo } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
  loadableToLoadingData,
} from '@dao-dao/utils'

import { GovActionsProvider } from '../../actions'
import { tokenCardLazyInfoSelector } from '../../recoil'
import { GovTokenLine } from './GovTokenLine'

export const GovCommunityPoolTab = () => {
  const { chain_id: chainId } = useChain()

  const tokenCardInfos = useCachedLoadingWithError(
    communityPoolBalancesSelector({
      chainId,
    }),
    (data) =>
      data
        .map(({ owner, token, balance }): TokenCardInfo => {
          const unstakedBalance = convertMicroDenomToDenomWithDecimals(
            balance,
            token.decimals
          )

          return {
            owner,
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

  // Load separately so they cache separately.
  const tokenLazyInfos = useCachedLoadingWithError(
    !tokenCardInfos.loading && !tokenCardInfos.errored
      ? waitForAny(
          tokenCardInfos.data.map(({ owner, token, unstakedBalance }) =>
            tokenCardLazyInfoSelector({
              owner: owner.address,
              token,
              unstakedBalance,
            })
          )
        )
      : undefined
  )

  const tokens: LoadingDataWithError<TokenCardInfo[]> =
    tokenCardInfos.loading || tokenCardInfos.errored
      ? tokenCardInfos
      : {
          loading: false,
          errored: false,
          updating:
            tokenCardInfos.updating ||
            (!tokenLazyInfos.loading &&
              !tokenLazyInfos.errored &&
              tokenLazyInfos.updating),
          data: tokenCardInfos.data.map(
            (token, i): TokenCardInfo => ({
              ...token,
              lazyInfo:
                tokenLazyInfos.loading ||
                tokenLazyInfos.errored ||
                tokenCardInfos.data.length !== tokenLazyInfos.data.length
                  ? { loading: true }
                  : loadableToLoadingData(tokenLazyInfos.data[i], {
                      usdUnitPrice: undefined,
                      stakingInfo: undefined,
                      totalBalance: token.unstakedBalance,
                    }),
            })
          ),
        }

  const tokenSortOptions = useTokenSortOptions()
  const {
    sortedData: sortedTokens,
    buttonPopupProps: sortTokenButtonPopupProps,
  } = useButtonPopupSorter({
    data: tokens.loading || tokens.errored ? undefined : tokens.data,
    options: tokenSortOptions,
  })

  return (
    <>
      {/* TODO: commenting out for now since this query is very heavy */}
      {/* Only have history data for indexed chains. */}
      {/* {chainIsIndexed(chainId) && (
        <TreasuryHistoryGraph
          address={COMMUNITY_POOL_ADDRESS_PLACEHOLDER}
          chainId={chainId}
          className="mb-8 mt-4 hidden rounded-md bg-background-tertiary p-6 md:flex"
          graphClassName="max-h-[20rem]"
          header={
            <div className="flex flex-row items-center justify-center gap-1">
              <p className="title-text">{t('title.treasuryValue')}</p>

              <TooltipInfoIcon
                size="sm"
                title={t('info.treasuryValueTooltip')}
              />
            </div>
          }
        />
      )} */}

      <div className="mb-6 flex flex-row justify-end">
        <ButtonPopup position="left" {...sortTokenButtonPopupProps} />
      </div>

      <GovActionsProvider
        loader={
          <div>
            <TokenLineHeader />
            <LineLoaders lines={10} type="token" />
          </div>
        }
      >
        {tokens.loading ? (
          <div className="space-y-1">
            <TokenLineHeader />
            <LineLoaders lines={10} type="token" />
          </div>
        ) : tokens.errored ? (
          <ErrorPage error={tokens.error} />
        ) : (
          <div className="space-y-1">
            <TokenLineHeader />

            {sortedTokens.map((props: TokenCardInfo, index) => (
              <GovTokenLine
                {...props}
                key={props.token.chainId + props.token.denomOrAddress}
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
