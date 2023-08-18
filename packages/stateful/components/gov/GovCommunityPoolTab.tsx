import { communityPoolBalancesSelector } from '@dao-dao/state/recoil'
import {
  GridCardContainer,
  Loader,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { TokenCardInfo } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

import { GovTokenCard } from './GovTokenCard'

export const GovCommunityPoolTab = () => {
  const { chain_id: chainId } = useChain()

  const tokenBalances = useCachedLoading(
    communityPoolBalancesSelector({
      chainId,
    }),
    []
  )

  const nativeToken = getNativeTokenForChainId(chainId)
  const tokenCardInfos: TokenCardInfo[] = tokenBalances.loading
    ? []
    : tokenBalances.data
        .map(({ token, balance }): TokenCardInfo => {
          const unstakedBalance = convertMicroDenomToDenomWithDecimals(
            balance,
            token.decimals
          )

          return {
            owner: '',
            token,
            isGovernanceToken:
              nativeToken.denomOrAddress === token.denomOrAddress,
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

  return tokenCardInfos.length === 0 ? (
    <Loader className="mt-6" fill={false} />
  ) : (
    <>
      <GridCardContainer cardType="wide">
        {tokenCardInfos.map((props, index) => (
          <GovTokenCard {...props} key={index} />
        ))}
      </GridCardContainer>
    </>
  )
}
