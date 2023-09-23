import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ButtonLinkProps,
  DaoChainTreasury,
  TokenCardInfo,
} from '@dao-dao/types'
import {
  getChainForChainId,
  getDisplayNameForChainId,
  getSupportedChainConfig,
} from '@dao-dao/utils'

import {
  CopyToClipboard,
  GridCardContainer,
  NoContent,
  PAGINATION_MIN_PAGE,
  Pagination,
} from '../../components'
import { useDaoInfoContext } from '../../hooks'
import { Button } from '../buttons'
import { ChainLogo } from '../ChainLogo'
import { DropdownIconButton } from '../icon_buttons'
import { Loader } from '../logo'

export type DaoChainTreasuryAndNftsProps<
  T extends TokenCardInfo,
  N extends object
> = {
  treasury: DaoChainTreasury<T, N>
  connected: boolean
  isMember: boolean
  createCrossChainAccountPrefillHref: string
  addCollectionHref?: string
  setDepositFiatChainId: (chainId: string | undefined) => void
  TokenCard: ComponentType<T>
  NftCard: ComponentType<N>
  ButtonLink: ComponentType<ButtonLinkProps>
}

const NFTS_PER_PAGE = 18

export const DaoChainTreasuryAndNfts = <
  T extends TokenCardInfo,
  N extends object
>({
  treasury: { chainId, address, tokens, nfts },
  connected,
  isMember,
  createCrossChainAccountPrefillHref,
  addCollectionHref,
  setDepositFiatChainId,
  TokenCard,
  NftCard,
  ButtonLink,
}: DaoChainTreasuryAndNftsProps<T, N>) => {
  const { t } = useTranslation()
  const { chainId: daoChainId } = useDaoInfoContext()

  const bech32Prefix = getChainForChainId(chainId).bech32_prefix
  // Whether or not the treasury address is defined, meaning it is the current
  // chain or a polytone account has already been created on that chain.
  const exists = !!address

  const [collapsed, setCollapsed] = useState(false)
  const [nftPage, setNftPage] = useState(PAGINATION_MIN_PAGE)

  return (
    <div className="flex flex-col gap-4 pl-8">
      {/* header min-height of 3.5rem standardized across all tabs */}
      <div className="flex min-h-[3.5rem] grow flex-row flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="relative flex flex-row items-center gap-2">
          <div className="absolute -left-8">
            {exists ? (
              <DropdownIconButton
                open={!collapsed}
                toggle={() => setCollapsed((c) => !c)}
              />
            ) : (
              <div className="flex h-6 w-6 items-center justify-center">
                <div className="h-1 w-1 rounded-full bg-icon-interactive-disabled"></div>
              </div>
            )}
          </div>

          <ChainLogo chainId={chainId} size={28} />

          <p className="title-text shrink-0">
            {getDisplayNameForChainId(chainId)}
          </p>
        </div>

        {exists ? (
          <div className="flex grow flex-row items-stretch justify-between gap-6">
            <CopyToClipboard
              className="!gap-2 rounded-md bg-background-tertiary p-2 font-mono transition hover:bg-background-secondary"
              takeStartEnd={{
                start: bech32Prefix.length + 6,
                end: 6,
              }}
              textClassName="!bg-transparent !p-0"
              tooltip={t('button.clickToCopyAddress')}
              value={address}
            />

            {connected && !!getSupportedChainConfig(chainId)?.kado && (
              <Button
                onClick={() => setDepositFiatChainId(chainId)}
                variant="ghost_outline"
              >
                {t('button.depositFiat')}
              </Button>
            )}
          </div>
        ) : (
          <ButtonLink
            href={createCrossChainAccountPrefillHref}
            variant="ghost_outline"
          >
            {t('button.createAccount')}
          </ButtonLink>
        )}
      </div>

      {exists && (
        <div
          className={clsx(
            'flex flex-col gap-3 overflow-hidden',
            collapsed ? 'h-0' : 'h-auto'
          )}
        >
          {tokens.loading || (tokens.updating && tokens.data.length === 0) ? (
            <Loader />
          ) : (
            tokens.data.length > 0 && (
              <GridCardContainer cardType="wide">
                {tokens.data.map((props, index) => (
                  <TokenCard {...props} key={index} />
                ))}
              </GridCardContainer>
            )
          )}

          {nfts.loading || (nfts.updating && nfts.data.length === 0) ? (
            <Loader className="mt-6" />
          ) : (
            nfts.data.length > 0 && (
              <>
                <p className="title-text mt-4">
                  {nfts.loading
                    ? t('title.nfts')
                    : t('title.numNfts', { count: nfts.data.length })}
                </p>

                <GridCardContainer>
                  {nfts.data
                    .slice(
                      (nftPage - 1) * NFTS_PER_PAGE,
                      nftPage * NFTS_PER_PAGE
                    )
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
            )
          )}

          {!tokens.loading &&
            !tokens.updating &&
            tokens.data.length === 0 &&
            !nfts.loading &&
            !nfts.updating &&
            nfts.data.length === 0 &&
            (chainId === daoChainId ? (
              <p className="secondary-text">{t('info.nothingFound')}</p>
            ) : (
              // Show NFT add prompt if on current chain.
              <NoContent
                Icon={Image}
                actionNudge={t('info.areTheyMissingQuestion')}
                body={t('info.noNftsYet')}
                buttonLabel={t('button.addCollection')}
                href={isMember ? addCollectionHref : undefined}
              />
            ))}
        </div>
      )}
    </div>
  )
}
