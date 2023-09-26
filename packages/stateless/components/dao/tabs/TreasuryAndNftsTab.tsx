import { ComponentType, useState } from 'react'

import {
  DaoChainTreasury,
  DaoFiatDepositModalProps,
  LoadingNfts,
  LoadingTokens,
  TokenCardInfo,
  TokenType,
} from '@dao-dao/types'
import { getNativeTokenForChainId } from '@dao-dao/utils'

import { useDaoInfoContext, useSupportedChainContext } from '../../../hooks'
import { Loader } from '../../logo/Loader'
import {
  DaoChainTreasuryAndNfts,
  DaoChainTreasuryAndNftsProps,
} from '../DaoChainTreasuryAndNfts'

export type TreasuryAndNftsTabProps<
  T extends TokenCardInfo,
  N extends object
> = {
  connected: boolean
  tokens: LoadingTokens<T>
  nfts: LoadingNfts<N & { key: string }>
  FiatDepositModal: ComponentType<DaoFiatDepositModalProps>
  DaoTreasuryHistoryGraph: ComponentType<{ className?: string }>
} & Omit<
  DaoChainTreasuryAndNftsProps<T, N>,
  'treasury' | 'setDepositFiatChainId'
>

export const TreasuryAndNftsTab = <T extends TokenCardInfo, N extends object>({
  connected,
  tokens,
  nfts,
  FiatDepositModal,
  createCrossChainAccountPrefillHref,
  DaoTreasuryHistoryGraph,
  ...props
}: TreasuryAndNftsTabProps<T, N>) => {
  const {
    chain: { chain_id: currentChainId },
    config: { polytone = {} },
  } = useSupportedChainContext()
  const { coreAddress, polytoneProxies } = useDaoInfoContext()

  // Tokens and NFTs on the various Polytone-supported chains.
  const treasuries = [
    [currentChainId, coreAddress],
    ...Object.keys(polytone).map((chainId): [string, string | undefined] => [
      chainId,
      polytoneProxies[chainId],
    ]),
  ].map(([chainId, address]): DaoChainTreasury<T, N> => {
    const chainTokens = tokens[chainId]
    const chainNfts = nfts[chainId]

    return {
      chainId,
      address,
      tokens: !chainTokens
        ? { loading: false, data: [] }
        : chainTokens.loading || chainTokens.errored
        ? { loading: true }
        : {
            loading: false,
            updating: chainTokens.updating,
            data: chainTokens.data
              .filter(({ token }) => token.chainId === chainId)
              // Sort governance token first, then native currency, then by
              // balance.
              .sort((a, b) => {
                const aValue = a.isGovernanceToken
                  ? -2
                  : a.token.type === TokenType.Native &&
                    a.token.denomOrAddress ===
                      getNativeTokenForChainId(chainId).denomOrAddress
                  ? -1
                  : a.lazyInfo.loading
                  ? a.unstakedBalance
                  : a.lazyInfo.data.totalBalance
                const bValue = b.isGovernanceToken
                  ? -2
                  : b.token.type === TokenType.Native &&
                    b.token.denomOrAddress ===
                      getNativeTokenForChainId(chainId).denomOrAddress
                  ? -1
                  : b.lazyInfo.loading
                  ? b.unstakedBalance
                  : b.lazyInfo.data.totalBalance

                // Put smaller value first if either is negative (prioritized
                // token), otherwise sort balances descending.
                return aValue < 0 || bValue < 0
                  ? aValue - bValue
                  : bValue - aValue
              }),
          },
      nfts: !chainNfts
        ? { loading: false, data: [] }
        : chainNfts.loading || chainNfts.errored
        ? { loading: true }
        : chainNfts,
    }
  })

  const [depositFiatChainId, setDepositFiatChainId] = useState<
    string | undefined
  >()

  return (
    <>
      <DaoTreasuryHistoryGraph />

      <div className="mb-9 mt-6">
        {
          // If there is nothing loaded, `every` returns true and shows loading.
          Object.values(tokens).every(
            (chainTokens) => chainTokens?.loading || chainTokens?.errored
          ) ? (
            <Loader className="mt-6" fill={false} />
          ) : (
            <div className="flex flex-col gap-8">
              {treasuries.map((treasury) => (
                <DaoChainTreasuryAndNfts
                  key={treasury.chainId}
                  connected={connected}
                  setDepositFiatChainId={setDepositFiatChainId}
                  treasury={treasury}
                  {...props}
                  createCrossChainAccountPrefillHref={createCrossChainAccountPrefillHref.replace(
                    'CHAIN_ID',
                    treasury.chainId
                  )}
                />
              ))}
            </div>
          )
        }
      </div>

      {connected && !!depositFiatChainId && (
        <FiatDepositModal
          accountType={
            depositFiatChainId === currentChainId ? 'native' : 'polytone'
          }
          chainId={depositFiatChainId}
          onClose={() => setDepositFiatChainId(undefined)}
          visible
        />
      )}
    </>
  )
}
