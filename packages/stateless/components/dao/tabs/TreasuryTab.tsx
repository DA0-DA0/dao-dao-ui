import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AccountType,
  DaoAccountTreasuryInfo,
  DaoFiatDepositModalProps,
  LoadingData,
  LoadingNfts,
  LoadingTokens,
  TokenCardInfo,
  TokenType,
  TreasuryHistoryGraphProps,
} from '@dao-dao/types'
import { areAccountsEqual, getNativeTokenForChainId } from '@dao-dao/utils'

import { useDaoInfoContext, useSupportedChainContext } from '../../../hooks'
import { LineLoaders } from '../../LineLoader'
import { TooltipInfoIcon } from '../../tooltip'
import {
  DaoAccountTreasury,
  DaoAccountTreasuryProps,
} from '../DaoAccountTreasury'

export type TreasuryTabProps<T extends TokenCardInfo, N extends object> = {
  connected: boolean
  tokens: LoadingTokens<T>
  nfts: LoadingData<LoadingNfts<N & { key: string }>>
  createCrossChainAccountPrefillHref: string
  FiatDepositModal: ComponentType<DaoFiatDepositModalProps>
  TreasuryHistoryGraph: ComponentType<TreasuryHistoryGraphProps>
} & Omit<
  DaoAccountTreasuryProps<T, N>,
  'treasury' | 'setDepositFiatChainId' | 'tokenSourceColorMap'
>

export const TreasuryTab = <T extends TokenCardInfo, N extends object>({
  connected,
  tokens,
  nfts,
  FiatDepositModal,
  TreasuryHistoryGraph,
  ...props
}: TreasuryTabProps<T, N>) => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: currentChainId },
  } = useSupportedChainContext()
  const { chainId: daoChainId, coreAddress, accounts } = useDaoInfoContext()

  // Tokens and NFTs on the various Polytone-supported chains.
  const treasuries = accounts.map((account): DaoAccountTreasuryInfo<T, N> => {
    const chainTokens = tokens[account.chainId]
    // NFTs are only loaded for main account on a chain.
    const chainNfts =
      !nfts.loading &&
      (account.type === AccountType.Native ||
        account.type === AccountType.Polytone)
        ? nfts.data[account.chainId]
        : undefined

    return {
      account,
      tokens: !chainTokens
        ? { loading: false, errored: false, data: [] }
        : chainTokens.loading || chainTokens.errored
        ? chainTokens
        : {
            loading: false,
            errored: false,
            updating: chainTokens.updating,
            data: chainTokens.data
              .filter(({ owner }) => areAccountsEqual(owner, account))
              // Sort governance token first, then native currency, then by
              // balance.
              .sort((a, b) => {
                const aValue = a.isGovernanceToken
                  ? -2
                  : a.token.type === TokenType.Native &&
                    a.token.denomOrAddress ===
                      getNativeTokenForChainId(account.chainId).denomOrAddress
                  ? -1
                  : a.lazyInfo.loading
                  ? a.unstakedBalance
                  : a.lazyInfo.data.totalBalance
                const bValue = b.isGovernanceToken
                  ? -2
                  : b.token.type === TokenType.Native &&
                    b.token.denomOrAddress ===
                      getNativeTokenForChainId(account.chainId).denomOrAddress
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
      nfts: nfts.loading
        ? { loading: true, errored: false }
        : !chainNfts
        ? { loading: false, errored: false, data: [] }
        : chainNfts.loading || chainNfts.errored
        ? chainNfts
        : chainNfts,
    }
  })

  const [depositFiatChainId, setDepositFiatChainId] = useState<
    string | undefined
  >()

  // Maps serialized token source to color.
  const [tokenSourceColorMap, setTokenSourceColorMap] = useState<
    Record<string, string>
  >({})

  return (
    <>
      <TreasuryHistoryGraph
        address={coreAddress}
        chainId={daoChainId}
        className="mb-12 mt-4 hidden rounded-md bg-background-tertiary p-6 md:flex"
        graphClassName="max-h-[20rem]"
        header={
          <div className="flex flex-row items-center justify-center gap-1">
            <p className="title-text">{t('title.treasuryValue')}</p>

            <TooltipInfoIcon size="sm" title={t('info.treasuryValueTooltip')} />
          </div>
        }
        registerTokenColors={setTokenSourceColorMap}
      />

      {
        // If there is nothing loaded, `every` returns true and shows loading.
        Object.values(tokens).every(
          (chainTokens) => chainTokens?.loading || chainTokens?.errored
        ) ? (
          <LineLoaders lines={20} />
        ) : (
          <div className="mt-2 flex flex-col gap-6 md:mt-0 md:gap-8">
            {treasuries.map((treasury) => (
              <DaoAccountTreasury
                key={treasury.account.address}
                connected={connected}
                setDepositFiatChainId={setDepositFiatChainId}
                tokenSourceColorMap={tokenSourceColorMap}
                treasury={treasury}
                {...props}
              />
            ))}
          </div>
        )
      }

      {connected && !!depositFiatChainId && (
        <FiatDepositModal
          accountType={
            depositFiatChainId === currentChainId
              ? AccountType.Native
              : AccountType.Polytone
          }
          chainId={depositFiatChainId}
          onClose={() => setDepositFiatChainId(undefined)}
          visible
        />
      )}
    </>
  )
}
