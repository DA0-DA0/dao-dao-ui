import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoChainTreasury,
  DaoFiatDepositModalProps,
  LoadingData,
  LoadingNfts,
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
  tokens: LoadingData<{
    infos: T[]
    // Map chain ID to loading state.
    loading: Record<string, boolean>
  }>
  nfts: LoadingNfts<N & { key: string }>
  FiatDepositModal: ComponentType<DaoFiatDepositModalProps>
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
  ...props
}: TreasuryAndNftsTabProps<T, N>) => {
  const { t } = useTranslation()
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
    const chainNfts = nfts[chainId]

    return {
      chainId,
      address,
      tokens:
        tokens.loading || tokens.data.loading[chainId]
          ? { loading: true }
          : {
              loading: false,
              updating: tokens.updating,
              data: tokens.data.infos
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
      <div className="mb-9">
        {tokens.loading || !tokens.data ? (
          <Loader className="mt-6" fill={false} />
        ) : tokens.data.infos.length ? (
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
        ) : (
          <p className="secondary-text">{t('info.nothingFound')}</p>
        )}
      </div>

      {connected && !!depositFiatChainId && (
        <FiatDepositModal
          chainId={depositFiatChainId}
          onClose={() => setDepositFiatChainId(undefined)}
          visible
        />
      )}
    </>
  )
}
