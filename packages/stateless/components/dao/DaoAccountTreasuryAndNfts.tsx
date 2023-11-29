import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AccountType,
  DaoAccountTreasury,
  TokenCardInfo,
  TreasuryHistoryGraphProps,
  ValenceAccountTreasuryProps,
} from '@dao-dao/types'
import {
  getChainForChainId,
  getDisplayNameForChainId,
  getSupportedChainConfig,
  serializeTokenSource,
} from '@dao-dao/utils'

import { Button } from '../buttons'
import { ChainLogo } from '../ChainLogo'
import { CopyToClipboard } from '../CopyToClipboard'
import { ErrorPage } from '../error'
import { GridCardContainer } from '../GridCardContainer'
import { DropdownIconButton } from '../icon_buttons'
import { Loader } from '../logo'
import { NoContent } from '../NoContent'
import { PAGINATION_MIN_PAGE, Pagination } from '../Pagination'
import { TooltipInfoIcon } from '../tooltip'
import { ValenceAccountTreasury } from '../ValenceAccountTreasury'

export type DaoAccountTreasuryAndNftsProps<
  T extends TokenCardInfo,
  N extends object
> = {
  treasury: DaoAccountTreasury<T, N>
  connected: boolean
  isMember: boolean
  // Maps serialized token source to color.
  tokenSourceColorMap: Record<string, string>
  addCollectionHref?: string
  setDepositFiatChainId: (chainId: string | undefined) => void
  TokenCard: ComponentType<T>
  TokenLine: ComponentType<T>
  NftCard: ComponentType<N>
  TreasuryHistoryGraph: ComponentType<TreasuryHistoryGraphProps>
} & Pick<
  ValenceAccountTreasuryProps<T>,
  'ButtonLink' | 'IconButtonLink' | 'configureRebalancerHref'
>

const NFTS_PER_PAGE = 18

export const DaoAccountTreasuryAndNfts = <
  T extends TokenCardInfo,
  N extends object
>({
  treasury: { account, tokens, nfts },
  connected,
  isMember,
  tokenSourceColorMap,
  addCollectionHref,
  setDepositFiatChainId,
  TokenCard,
  TokenLine,
  NftCard,
  ButtonLink,
  IconButtonLink,
  TreasuryHistoryGraph,
  configureRebalancerHref,
}: DaoAccountTreasuryAndNftsProps<T, N>) => {
  const { t } = useTranslation()

  const bech32Prefix = getChainForChainId(account.chainId).bech32_prefix
  const isValence = account.type === AccountType.Valence

  const [collapsed, setCollapsed] = useState(false)
  const [nftPage, setNftPage] = useState(PAGINATION_MIN_PAGE)

  return (
    <div className="flex flex-col gap-4 pl-8">
      {/* header min-height of 3.5rem standardized across all tabs */}
      <div className="flex min-h-[3.5rem] grow flex-row flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="relative flex flex-row items-center gap-2">
          <DropdownIconButton
            className="absolute -left-8"
            open={!collapsed}
            toggle={() => setCollapsed((c) => !c)}
          />

          {/* TODO(rebalancer): overlay small valence logo over chain logo for valence account */}
          <ChainLogo chainId={account.chainId} size={28} />

          <p className="title-text shrink-0">
            {getDisplayNameForChainId(account.chainId)}
            {isValence && ' (' + t('title.valenceAccount') + ')'}
          </p>

          {isValence && (
            <TooltipInfoIcon
              size="sm"
              title={
                // TODO(rebalancer): Add description.
                'What is a Valence Account'
              }
            />
          )}
        </div>

        <div className="flex grow flex-row items-stretch justify-between gap-6">
          <CopyToClipboard
            className="!gap-2 rounded-md bg-background-tertiary p-2 font-mono transition hover:bg-background-secondary"
            takeStartEnd={{
              start: bech32Prefix.length + 6,
              end: 6,
            }}
            textClassName="!bg-transparent !p-0"
            tooltip={t('button.clickToCopyAddress')}
            value={account.address}
          />

          {connected &&
            !isValence &&
            !!getSupportedChainConfig(account.chainId)?.kado && (
              <Button
                onClick={() => setDepositFiatChainId(account.chainId)}
                variant="ghost_outline"
              >
                {t('button.depositFiat')}
              </Button>
            )}
        </div>
      </div>

      <div
        className={clsx(
          'flex flex-col gap-3 overflow-hidden',
          collapsed ? 'h-0' : 'h-auto'
        )}
      >
        {isValence ? (
          <ValenceAccountTreasury<T>
            key={account.address}
            ButtonLink={ButtonLink}
            IconButtonLink={IconButtonLink}
            TokenLine={TokenLine}
            TreasuryHistoryGraph={TreasuryHistoryGraph}
            account={account}
            configureRebalancerHref={configureRebalancerHref}
            inline
            tokens={tokens}
          />
        ) : tokens.loading ||
          (!tokens.errored && tokens.updating && tokens.data.length === 0) ? (
          <Loader className="my-14" size={48} />
        ) : tokens.errored ? (
          <ErrorPage title={t('error.unexpectedError')}>
            <pre className="whitespace-pre-wrap text-xs text-text-interactive-error">
              {tokens.error instanceof Error
                ? tokens.error.message
                : `${tokens.error}`}
            </pre>
          </ErrorPage>
        ) : (
          tokens.data.length > 0 && (
            <GridCardContainer cardType="wide">
              {tokens.data.map((props, index) => (
                <TokenCard
                  {...props}
                  key={index}
                  color={tokenSourceColorMap[serializeTokenSource(props.token)]}
                />
              ))}
            </GridCardContainer>
          )
        )}

        {nfts.loading ||
        (!nfts.errored && nfts.updating && nfts.data.length === 0) ? (
          <Loader className="mt-6" />
        ) : nfts.errored ? (
          <ErrorPage title={t('error.unexpectedError')}>
            <pre className="whitespace-pre-wrap text-xs text-text-interactive-error">
              {nfts.error instanceof Error
                ? nfts.error.message
                : `${nfts.error}`}
            </pre>
          </ErrorPage>
        ) : nfts.data.length > 0 ? (
          <>
            <p className="title-text mt-4">
              {nfts.loading
                ? t('title.nfts')
                : t('title.numNfts', { count: nfts.data.length })}
            </p>

            <GridCardContainer>
              {nfts.data
                .slice((nftPage - 1) * NFTS_PER_PAGE, nftPage * NFTS_PER_PAGE)
                .map((props) => (
                  <NftCard {...props} key={props.key} />
                ))}
            </GridCardContainer>

            <Pagination
              className="mx-auto mt-3"
              page={nftPage}
              pageSize={NFTS_PER_PAGE}
              setPage={setNftPage}
              total={nfts.data.length}
            />
          </>
        ) : (
          account.type === AccountType.Native && (
            // Show NFT add prompt on native chain if no tokens nor NFTs.
            <NoContent
              Icon={Image}
              actionNudge={t('info.areTheyMissingQuestion')}
              body={t('info.noNftsBeingDisplayed')}
              buttonLabel={t('button.addCollection')}
              className="mt-4"
              href={isMember ? addCollectionHref : undefined}
            />
          )
        )}
      </div>
    </div>
  )
}
