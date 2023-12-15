import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AccountType,
  DaoAccountTreasury,
  DaoFiatDepositModalProps,
  LoadingNfts,
  LoadingTokens,
  TokenCardInfo,
  TokenType,
  TreasuryHistoryGraphProps,
} from '@dao-dao/types'
import { areAccountsEqual, getNativeTokenForChainId } from '@dao-dao/utils'

import { useDaoInfoContext, useSupportedChainContext } from '../../../hooks'
import { Loader } from '../../logo/Loader'
import { TooltipInfoIcon } from '../../tooltip'
import {
  DaoAccountTreasuryAndNfts,
  DaoAccountTreasuryAndNftsProps,
} from '../DaoAccountTreasuryAndNfts'

export type TreasuryAndNftsTabProps<
  T extends TokenCardInfo,
  N extends object
> = {
  connected: boolean
  tokens: LoadingTokens<T>
  nfts: LoadingNfts<N & { key: string }>
  createCrossChainAccountPrefillHref: string
  FiatDepositModal: ComponentType<DaoFiatDepositModalProps>
  TreasuryHistoryGraph: ComponentType<TreasuryHistoryGraphProps>
} & Omit<
  DaoAccountTreasuryAndNftsProps<T, N>,
  'treasury' | 'setDepositFiatChainId' | 'tokenSourceColorMap'
>

export const TreasuryAndNftsTab = <T extends TokenCardInfo, N extends object>({
  connected,
  tokens,
  nfts,
  FiatDepositModal,
  TreasuryHistoryGraph,
  ...props
}: TreasuryAndNftsTabProps<T, N>) => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: currentChainId },
  } = useSupportedChainContext()
  const { chainId: daoChainId, coreAddress, accounts } = useDaoInfoContext()

  // Tokens and NFTs on the various Polytone-supported chains.
  const treasuries = accounts.map((account): DaoAccountTreasury<T, N> => {
    const chainTokens = tokens[account.chainId]
    // NFTs are only loaded for main account on a chain.
    const chainNfts =
      account.type === AccountType.Native ||
      account.type === AccountType.Polytone
        ? nfts[account.chainId]
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
      nfts: !chainNfts
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
        className="mb-8 mt-4 rounded-md bg-background-tertiary p-6"
        graphClassName="max-h-[20rem]"
        header={
          <div className="flex flex-row items-center justify-center gap-1">
            <p className="title-text">{t('title.treasuryValue')}</p>

            <TooltipInfoIcon size="sm" title={t('info.treasuryValueTooltip')} />
          </div>
        }
        registerTokenColors={setTokenSourceColorMap}
      />

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
                <DaoAccountTreasuryAndNfts
                  key={treasury.account.address}
                  TreasuryHistoryGraph={TreasuryHistoryGraph}
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
      </div>

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
