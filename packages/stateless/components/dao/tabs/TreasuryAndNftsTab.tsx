import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ButtonLinkProps,
  DaoFiatDepositModalProps,
  LoadingData,
  LoadingNfts,
  NftCardInfo,
  TokenCardInfo,
  TokenType,
} from '@dao-dao/types'
import {
  getChainForChainId,
  getDisplayNameForChainId,
  getNativeTokenForChainId,
  getSupportedChainConfig,
} from '@dao-dao/utils'

import { useDaoInfoContext, useSupportedChainContext } from '../../../hooks'
import { Button } from '../../buttons'
import { CopyToClipboard } from '../../CopyToClipboard'
import { GridCardContainer } from '../../GridCardContainer'
import { DropdownIconButton } from '../../icon_buttons'
import { Loader } from '../../logo/Loader'
import { ModalProps } from '../../modals/Modal'
import { NoContent } from '../../NoContent'

export interface TreasuryAndNftsTabProps<
  T extends TokenCardInfo,
  N extends NftCardInfo
> {
  connected: boolean
  tokens: LoadingData<{
    infos: T[]
    // Map chain ID to loading state.
    loading: Record<string, boolean>
  }>
  TokenCard: ComponentType<T>
  nfts: LoadingNfts<N>
  NftCard: ComponentType<N>
  isMember: boolean
  createCrossChainAccountPrefillHref: string
  addCollectionHref?: string
  StargazeNftImportModal: ComponentType<Pick<ModalProps, 'onClose'>>
  FiatDepositModal: ComponentType<DaoFiatDepositModalProps>
  ButtonLink: ComponentType<ButtonLinkProps>
}

export const TreasuryAndNftsTab = <
  T extends TokenCardInfo,
  N extends NftCardInfo
>({
  connected,
  tokens,
  TokenCard,
  nfts,
  NftCard,
  isMember,
  createCrossChainAccountPrefillHref,
  addCollectionHref,
  FiatDepositModal,
  ButtonLink,
}: TreasuryAndNftsTabProps<T, N>) => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: chainId },
    config: { polytone = {} },
  } = useSupportedChainContext()
  const {
    chainId: daoChainId,
    coreAddress,
    polytoneProxies,
  } = useDaoInfoContext()

  // Tokens and NFTs on the various Polytone-supported chains.
  const treasuries = [
    [chainId, coreAddress],
    ...Object.keys(polytone).map((chainId): [string, string | undefined] => [
      chainId,
      polytoneProxies[chainId],
    ]),
  ].map(
    ([chainId, address]): {
      chainId: string
      address: string | undefined
      tokens: LoadingData<T[]>
      nfts: LoadingData<N[]>
    } => {
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
    }
  )

  const [depositFiatChainId, setDepositFiatChainId] = useState<
    string | undefined
  >()
  const [chainsCollapsed, setChainsCollapsed] = useState(
    {} as Record<string, boolean | undefined>
  )

  return (
    <>
      <div className="mb-9">
        {tokens.loading || !tokens.data ? (
          <Loader className="mt-6" fill={false} />
        ) : tokens.data.infos.length ? (
          <div className="flex flex-col gap-4">
            {treasuries.map(({ chainId, address, tokens, nfts }) => {
              const bech32Prefix = getChainForChainId(chainId).bech32_prefix
              // Whether or not the treasury address is defined, meaning it is
              // the current chain or a polytone account has already been
              // created on that chain.
              const exists = !!address

              return (
                <div key={chainId} className="flex flex-col gap-4">
                  {/* header min-height of 3.5rem standardized across all tabs */}
                  <div className="flex min-h-[3.5rem] flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-3">
                      {exists ? (
                        <DropdownIconButton
                          open={!chainsCollapsed[chainId]}
                          toggle={() =>
                            setChainsCollapsed((prev) => ({
                              ...prev,
                              [chainId]: !prev[chainId],
                            }))
                          }
                        />
                      ) : (
                        <div className="flex h-6 w-6 items-center justify-center">
                          <div className="h-1 w-1 rounded-full bg-icon-interactive-disabled"></div>
                        </div>
                      )}

                      <p className="title-text shrink-0">
                        {getDisplayNameForChainId(chainId)}
                      </p>

                      {exists && (
                        <CopyToClipboard
                          className="min-w-0 !gap-2 rounded-md bg-background-tertiary p-2 font-mono transition hover:bg-background-secondary"
                          takeStartEnd={{
                            start: bech32Prefix.length + 6,
                            end: 6,
                          }}
                          textClassName="!bg-transparent !p-0"
                          tooltip={t('button.clickToCopyAddress')}
                          value={address}
                        />
                      )}
                    </div>

                    {exists ? (
                      connected &&
                      !!getSupportedChainConfig(chainId)?.kado && (
                        <Button
                          onClick={() => setDepositFiatChainId(chainId)}
                          variant="secondary"
                        >
                          {t('button.depositFiat')}
                        </Button>
                      )
                    ) : (
                      <ButtonLink
                        href={createCrossChainAccountPrefillHref.replace(
                          'CHAIN_ID',
                          chainId
                        )}
                        variant="primary"
                      >
                        {t('button.createAccount')}
                      </ButtonLink>
                    )}
                  </div>

                  {exists && (
                    <div
                      className={clsx(
                        'ml-8 flex flex-col gap-3 overflow-hidden',
                        chainsCollapsed[chainId] ? 'h-0' : 'h-auto'
                      )}
                    >
                      {tokens.loading ? (
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

                      {nfts.loading ? (
                        <Loader className="mt-6" />
                      ) : (
                        nfts.data.length > 0 && (
                          <>
                            <p className="title-text mt-4">{t('title.nfts')}</p>

                            <GridCardContainer>
                              {nfts.data.map((props, index) => (
                                <NftCard {...(props as N)} key={index} />
                              ))}
                            </GridCardContainer>
                          </>
                        )
                      )}

                      {!tokens.loading &&
                        tokens.data.length === 0 &&
                        !nfts.loading &&
                        nfts.data.length === 0 &&
                        (chainId === daoChainId ? (
                          <p className="secondary-text">
                            {t('info.nothingFound')}
                          </p>
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
            })}
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
