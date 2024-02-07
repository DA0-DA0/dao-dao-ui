import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AccountType,
  DaoAccountTreasuryInfo,
  TokenCardInfo,
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
import { LineLoaders } from '../LineLoader'
import { Loader } from '../logo'
import { PAGINATION_MIN_PAGE, Pagination } from '../Pagination'
import { TokenLineHeader } from '../token'
import { TooltipInfoIcon } from '../tooltip'

export type DaoAccountTreasuryProps<
  T extends TokenCardInfo,
  N extends object
> = {
  treasury: DaoAccountTreasuryInfo<T, N>
  connected: boolean
  // Maps serialized token source to color.
  tokenSourceColorMap: Record<string, string>
  setDepositFiatChainId: (chainId: string | undefined) => void
  TokenLine: ComponentType<T>
  NftCard: ComponentType<N>
}

const NFTS_PER_PAGE = 18

export const DaoAccountTreasury = <T extends TokenCardInfo, N extends object>({
  treasury: { account, tokens, nfts },
  connected,
  tokenSourceColorMap,
  setDepositFiatChainId,
  TokenLine,
  NftCard,
}: DaoAccountTreasuryProps<T, N>) => {
  const { t } = useTranslation()

  const bech32Prefix = getChainForChainId(account.chainId).bech32_prefix

  const [collapsed, setCollapsed] = useState(false)
  const [nftPage, setNftPage] = useState(PAGINATION_MIN_PAGE)

  return (
    <div className="flex flex-col gap-4">
      {/* header min-height of 3.5rem standardized across all tabs */}
      <div className="flex grow flex-row items-center justify-between gap-4">
        <div className="-ml-3 flex flex-row items-center gap-2">
          <DropdownIconButton
            open={!collapsed}
            toggle={() => setCollapsed((c) => !c)}
          />

          <ChainLogo
            chainId={account.chainId}
            className="cursor-pointer"
            onClick={() => setCollapsed((c) => !c)}
            size={28}
          />

          <p
            className="title-text shrink-0 cursor-pointer"
            onClick={() => setCollapsed((c) => !c)}
          >
            {getDisplayNameForChainId(account.chainId)}
          </p>

          {account.type === AccountType.Ica && (
            <TooltipInfoIcon title={t('info.icaExperimental')} warning />
          )}
        </div>

        <div className="flex min-w-0 grow flex-row items-stretch justify-between gap-6">
          <CopyToClipboard
            className="!gap-2 rounded-md bg-background-tertiary p-2 font-mono text-xs transition hover:bg-background-secondary"
            iconClassName="text-icon-secondary"
            iconSize="sm"
            takeStartEnd={{
              start: bech32Prefix.length + 6,
              end: 6,
            }}
            textClassName="!bg-transparent !p-0 text-text-secondary"
            tooltip={t('button.clickToCopyAddress')}
            value={account.address}
          />

          {connected && !!getSupportedChainConfig(account.chainId)?.kado && (
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
        {tokens.loading ||
        (!tokens.errored && tokens.updating && tokens.data.length === 0) ? (
          <div>
            <TokenLineHeader />
            <LineLoaders lines={3} type="token" />
          </div>
        ) : tokens.errored ? (
          <ErrorPage error={tokens.error} />
        ) : (
          tokens.data.length > 0 && (
            <div>
              <TokenLineHeader />

              {tokens.data.map((props, index) => (
                <TokenLine
                  {...props}
                  key={index}
                  color={tokenSourceColorMap[serializeTokenSource(props.token)]}
                  hideChainIcon
                  transparentBackground={index % 2 !== 0}
                />
              ))}
            </div>
          )
        )}

        {nfts.loading ||
        (!nfts.errored && nfts.updating && nfts.data.length === 0) ? (
          <div className="mt-4 flex flex-row items-center gap-4">
            <p className="title-text">{t('title.nfts')}</p>
            <Loader fill={false} size={22} />
          </div>
        ) : nfts.errored ? (
          <ErrorPage error={nfts.error} />
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
        ) : null}
      </div>
    </div>
  )
}
