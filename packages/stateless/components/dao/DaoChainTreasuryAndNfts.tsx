import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ButtonLinkProps,
  ChainId,
  DaoChainTreasury,
  DaoTreasuryHistoryGraphProps,
  TokenCardInfo,
} from '@dao-dao/types'
import {
  VALENCE_ACCOUNT_ITEM_KEY_PREFIX,
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
  TooltipInfoIcon,
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
  DaoTreasuryHistoryGraph: ComponentType<DaoTreasuryHistoryGraphProps>
}

const NFTS_PER_PAGE = 18

export const DaoChainTreasuryAndNfts = <
  T extends TokenCardInfo,
  N extends object
>({
  treasury: { chainId, accounts, tokens, nfts },
  connected,
  isMember,
  createCrossChainAccountPrefillHref,
  addCollectionHref,
  setDepositFiatChainId,
  TokenCard,
  NftCard,
  ButtonLink,
  DaoTreasuryHistoryGraph,
}: DaoChainTreasuryAndNftsProps<T, N>) => {
  const { t } = useTranslation()
  const { chainId: daoChainId, items: daoItems } = useDaoInfoContext()

  const bech32Prefix = getChainForChainId(chainId).bech32_prefix
  const address = accounts.find(
    ({ type }) => type === 'native' || type === 'polytone'
  )?.address
  const valenceAddress = accounts.find(
    ({ type }) => type === 'valence'
  )?.address
  // Whether or not the treasury address is defined, meaning it is the current
  // chain or a polytone account has already been created on that chain.
  const exists = !!address

  const [collapsed, setCollapsed] = useState(false)
  const [nftPage, setNftPage] = useState(PAGINATION_MIN_PAGE)

  // Separate valence from non-valence account tokens and display valence
  // separately.
  const nonValenceTokens: typeof tokens = tokens.loading
    ? tokens
    : {
        loading: false,
        updating: tokens.updating,
        data: tokens.data.filter(
          ({ daoOwnerType }) => daoOwnerType !== 'valence'
        ),
      }
  const valenceTokens: typeof tokens = tokens.loading
    ? tokens
    : {
        loading: false,
        updating: tokens.updating,
        data: tokens.data.filter(
          ({ daoOwnerType }) => daoOwnerType === 'valence'
        ),
      }

  const hasValenceTokens = valenceTokens.loading
    ? // When tokens not yet loaded, check to see if valence account is set to determine if we should render UI and show loader.
      !!daoItems[VALENCE_ACCOUNT_ITEM_KEY_PREFIX + chainId]
    : valenceTokens.data.length > 0

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
          {nonValenceTokens.loading ||
          (nonValenceTokens.updating && nonValenceTokens.data.length === 0) ? (
            <Loader className="my-14" size={48} />
          ) : (
            nonValenceTokens.data.length > 0 && (
              <GridCardContainer cardType="wide">
                {nonValenceTokens.data.map((props, index) => (
                  <TokenCard {...props} key={index} />
                ))}
              </GridCardContainer>
            )
          )}

          {/* Valence Account */}
          {hasValenceTokens && !!valenceAddress && (
            <div className="mt-6 space-y-3">
              <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex flex-row items-center gap-1">
                  <p className="primary-text">{t('title.valenceAccount')}</p>
                  <TooltipInfoIcon
                    size="sm"
                    title={
                      // TODO(rebalancer): Add description.
                      'What is a Valence Account'
                    }
                  />
                </div>

                <CopyToClipboard
                  className="!gap-2 rounded-md bg-background-tertiary p-2 font-mono transition hover:bg-background-secondary"
                  takeStartEnd={{
                    start: bech32Prefix.length + 6,
                    end: 6,
                  }}
                  textClassName="!bg-transparent !p-0"
                  tooltip={t('button.clickToCopyAddress')}
                  value={valenceAddress}
                />
              </div>

              <div className="rounded-lg border border-dashed border-border-primary bg-background-tertiary p-3 sm:p-4 lg:p-5">
                {valenceTokens.loading ||
                (valenceTokens.updating && valenceTokens.data.length === 0) ? (
                  <Loader className="my-12" size={48} />
                ) : (
                  valenceTokens.data.length > 0 && (
                    <>
                      <DaoTreasuryHistoryGraph
                        className="mb-8 px-8"
                        filter={{
                          type: 'valence',
                          chainId,
                          address: valenceAddress,
                        }}
                        targets={[
                          // TODO(rebalancer): Provide actual targets.
                          {
                            source: {
                              chainId: ChainId.NeutronMainnet,
                              denomOrAddress: 'untrn',
                            },
                            targets: [
                              {
                                timestamp: new Date(0),
                                target: 0.75,
                              },
                            ],
                          },
                          {
                            source: {
                              chainId: 'axelar-dojo-1',
                              denomOrAddress: 'uusdc',
                            },
                            targets: [
                              {
                                timestamp: new Date(0),
                                target: 0.25,
                              },
                            ],
                          },
                        ]}
                      />

                      <GridCardContainer cardType="wide">
                        {valenceTokens.data.map((props, index) => (
                          <TokenCard {...props} key={index} noExtraActions />
                        ))}
                      </GridCardContainer>
                    </>
                  )
                )}
              </div>
            </div>
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
