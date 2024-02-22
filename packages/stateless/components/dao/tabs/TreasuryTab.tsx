import { CopyAll } from '@mui/icons-material'
import { ComponentType, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  AccountType,
  ButtonLinkProps,
  DaoFiatDepositModalProps,
  LoadingData,
  LoadingDataWithError,
  LoadingNfts,
  LoadingTokens,
  TokenCardInfo,
  TreasuryHistoryGraphProps,
} from '@dao-dao/types'
import {
  concatAddressStartEnd,
  getDisplayNameForChainId,
  getImageUrlForChainId,
  serializeTokenSource,
} from '@dao-dao/utils'

import {
  useButtonPopupSorter,
  useDaoInfoContext,
  useSupportedChainContext,
  useTokenSortOptions,
} from '../../../hooks'
import { ErrorPage } from '../../error'
import { LineLoaders } from '../../LineLoader'
import { NftSection } from '../../nft/NftSection'
import { ButtonPopup, FilterableItemPopup } from '../../popup'
import { TokenLineHeader } from '../../token'
import { Tooltip, TooltipInfoIcon } from '../../tooltip'
import { WarningCard } from '../../WarningCard'

export type TreasuryTabProps<T extends TokenCardInfo, N extends object> = {
  connected: boolean
  tokens: LoadingTokens<T>
  nfts: LoadingData<LoadingNfts<N & { key: string }>>
  /**
   * Create cross-chain account proposal prefill URL. If undefined, this means
   * the action cannot be used, most likely because all accounts are already
   * created.
   */
  createCrossChainAccountHref: string | undefined
  FiatDepositModal: ComponentType<DaoFiatDepositModalProps>
  TreasuryHistoryGraph: ComponentType<TreasuryHistoryGraphProps>
  TokenLine: ComponentType<T>
  NftCard: ComponentType<N>
  ButtonLink: ComponentType<ButtonLinkProps>
}

export const TreasuryTab = <T extends TokenCardInfo, N extends object>({
  connected,
  tokens,
  nfts,
  createCrossChainAccountHref,
  FiatDepositModal,
  TreasuryHistoryGraph,
  TokenLine,
  NftCard,
  ButtonLink,
}: TreasuryTabProps<T, N>) => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: currentChainId },
  } = useSupportedChainContext()
  const { chainId: daoChainId, coreAddress, accounts } = useDaoInfoContext()

  // Combine chain tokens into loadable, lazily. Load all that are ready.
  const allTokens = useMemo((): LoadingDataWithError<T[]> => {
    const chainTokens = Object.values(tokens)
    return chainTokens.every((l) => l?.loading)
      ? {
          loading: true,
          errored: false,
        }
      : chainTokens.every((l) => l?.errored)
      ? {
          loading: false,
          errored: true,
          // First error.
          error:
            // Type-check, will always be defined.
            (chainTokens[0]?.errored && chainTokens[0].error) || new Error(),
        }
      : {
          loading: false,
          errored: false,
          updating: chainTokens.some(
            (l) => l && !l.loading && !l.errored && l.updating
          ),
          data: chainTokens.flatMap((l) =>
            l && !l.loading && !l.errored ? l.data : []
          ),
        }
  }, [tokens])

  // Combine chain tokens into loadable, lazily. Load all that are ready.
  const allNfts = useMemo((): LoadingDataWithError<N[]> => {
    if (nfts.loading) {
      return {
        loading: true,
        errored: false,
      }
    }

    const chainNfts = Object.values(nfts.data)

    return chainNfts.every((l) => l?.loading)
      ? {
          loading: true,
          errored: false,
        }
      : chainNfts.every((l) => l?.errored)
      ? {
          loading: false,
          errored: true,
          // First error.
          error:
            // Type-check, will always be defined.
            (chainNfts[0]?.errored && chainNfts[0].error) || new Error(),
        }
      : {
          loading: false,
          errored: false,
          updating: chainNfts.some(
            (l) => l && (l.loading || (!l.errored && l.updating))
          ),
          data: chainNfts.flatMap((l) =>
            l && !l.loading && !l.errored ? l.data : []
          ),
        }
  }, [nfts])

  const [depositFiatChainId, setDepositFiatChainId] = useState<
    string | undefined
  >()

  // Maps serialized token source to color.
  const [tokenSourceColorMap, setTokenSourceColorMap] = useState<
    Record<string, string>
  >({})

  const tokenSortOptions = useTokenSortOptions()
  const {
    sortedData: sortedTokens,
    buttonPopupProps: sortTokenButtonPopupProps,
  } = useButtonPopupSorter({
    data: allTokens.loading || allTokens.errored ? undefined : allTokens.data,
    options: tokenSortOptions,
  })

  return (
    <>
      {/* header min-height of 3.5rem standardized across all tabs */}
      <div className="mb-6 flex min-h-[3.5rem] flex-row items-center justify-between gap-8 border-b border-border-secondary pb-6">
        <p className="title-text text-text-body">{t('title.treasury')}</p>

        <FilterableItemPopup
          filterableItemKeys={FILTERABLE_KEYS}
          items={accounts.map(({ chainId, address, type }) => ({
            key: chainId + address,
            label: getDisplayNameForChainId(chainId),
            iconUrl: getImageUrlForChainId(chainId),
            description: concatAddressStartEnd(address, 10, 6),
            rightNode: (
              <p className="caption-text self-end md:self-center">
                {t(`accountTypeLabel.${type}`)}
              </p>
            ),
            iconClassName: '!h-8 !w-8',
            contentContainerClassName: '!gap-4',
            chainId,
            address,
          }))}
          onSelect={({ chainId, address }) => {
            navigator.clipboard.writeText(address)
            toast.success(
              t('info.copiedDaoChainAddress', {
                chain: getDisplayNameForChainId(chainId),
              })
            )
          }}
          searchPlaceholder={t('info.searchForAccount')}
          trigger={{
            type: 'button',
            props: {
              className: 'self-start',
              variant: 'primary',
              contentContainerClassName: '!gap-1',
              children: (
                <>
                  <CopyAll className="!h-4 !w-4" />
                  {t('button.copyAddress')}
                </>
              ),
            },
          }}
        />
      </div>

      <TreasuryHistoryGraph
        address={coreAddress}
        chainId={daoChainId}
        className="mb-8 hidden rounded-md bg-background-tertiary p-6 md:flex"
        graphClassName="max-h-[20rem]"
        header={
          <div className="flex flex-row items-center justify-center gap-1">
            <p className="title-text">{t('title.treasuryValue')}</p>

            <TooltipInfoIcon size="sm" title={t('info.treasuryValueTooltip')} />
          </div>
        }
        registerTokenColors={setTokenSourceColorMap}
      />

      <div className="mb-6 flex flex-row flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="title-text">{t('title.tokens')}</p>

        <ButtonPopup position="left" {...sortTokenButtonPopupProps} />
      </div>

      {allTokens.loading ? (
        <div className="space-y-1">
          <TokenLineHeader />
          <LineLoaders lines={7} type="token" />
        </div>
      ) : allTokens.errored ? (
        <ErrorPage error={allTokens.error} />
      ) : (
        <div className="space-y-1">
          <TokenLineHeader />

          {sortedTokens.map((props: T, index) => (
            <TokenLine
              {...props}
              key={
                props.token.chainId +
                props.owner.address +
                props.token.denomOrAddress
              }
              color={tokenSourceColorMap[serializeTokenSource(props.token)]}
              transparentBackground={index % 2 !== 0}
            />
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-row justify-end">
        <Tooltip
          title={
            createCrossChainAccountHref
              ? undefined
              : t('error.allCrossChainAccountsCreated')
          }
        >
          <ButtonLink
            disabled={!createCrossChainAccountHref}
            href={createCrossChainAccountHref}
            variant="secondary"
          >
            {t('button.createCrossChainAccount')}
          </ButtonLink>
        </Tooltip>
      </div>

      {/* Show chain token load errors. */}
      {Object.entries(tokens).flatMap(([chainId, l]) =>
        l && l.errored ? (
          <WarningCard
            key={chainId}
            className="mt-6"
            content={t('error.loadingChainTokens', {
              chain: getDisplayNameForChainId(chainId),
            })}
          >
            <pre className="whitespace-pre-wrap text-xs text-text-interactive-error">
              {l.error instanceof Error ? l.error.message : l.error}
            </pre>
          </WarningCard>
        ) : (
          []
        )
      )}

      <NftSection NftCard={NftCard} className="mt-10" nfts={allNfts} />

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

const FILTERABLE_KEYS = ['label', 'chainId', 'address']
