import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ButtonLinkProps,
  LoadingData,
  NftCardInfo,
  TokenCardInfo,
} from '@dao-dao/types'
import {
  CHAIN_ID,
  POLYTONE_NOTES,
  getChainForChainId,
  getDisplayNameForChainId,
} from '@dao-dao/utils'

import { useChain, useDaoInfoContext } from '../../../hooks'
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
  tokens: LoadingData<T[]>
  TokenCard: ComponentType<T>
  nfts: LoadingData<N[]>
  NftCard: ComponentType<N>
  isMember: boolean
  createCrossChainAccountPrefillHref?: string
  addCollectionHref?: string
  StargazeNftImportModal: ComponentType<Pick<ModalProps, 'onClose'>>
  FiatDepositModal?: ComponentType<Pick<ModalProps, 'onClose' | 'visible'>>
  ButtonLink: ComponentType<ButtonLinkProps>
}

export const TreasuryAndNftsTab = <
  T extends TokenCardInfo,
  N extends NftCardInfo
>({
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
  const { chain_id: chainId } = useChain()
  const { coreAddress, polytoneProxies } = useDaoInfoContext()

  // Tokens and NFTs on the various Polytone-supported chains.
  const treasuries = [
    [chainId, coreAddress],
    ...Object.entries(POLYTONE_NOTES).map(
      ([chainId]): [string, string | undefined] => [
        chainId,
        polytoneProxies[chainId],
      ]
    ),
  ].map(([chainId, address]) => ({
    chainId,
    address,
    tokens: tokens.loading
      ? []
      : tokens.data
          .filter(({ token }) => token.chainId === chainId)
          // Sort governance token first.
          .sort((a, b) =>
            !!a.isGovernanceToken === !!b.isGovernanceToken
              ? 0
              : a.isGovernanceToken
              ? -1
              : 1
          ),
    nfts: nfts.loading
      ? []
      : nfts.data.filter((nft) => nft.chainId === chainId),
  }))

  const [showDepositFiat, setShowDepositFiat] = useState(false)
  const [chainsCollapsed, setChainsCollapsed] = useState(
    {} as Record<string, boolean | undefined>
  )

  return (
    <>
      <div className="mb-9">
        {tokens.loading || !tokens.data ? (
          <Loader className="mt-6" fill={false} />
        ) : tokens.data.length ? (
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

                    {exists
                      ? // Only show if defined, which indicates wallet connected, and only show for the current chain.
                        FiatDepositModal &&
                        chainId === CHAIN_ID && (
                          <Button
                            onClick={() => setShowDepositFiat(true)}
                            variant="secondary"
                          >
                            {t('button.depositFiat')}
                          </Button>
                        )
                      : createCrossChainAccountPrefillHref && (
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
                      {tokens.length > 0 && (
                        <GridCardContainer cardType="wide">
                          {tokens.map((props, index) => (
                            <TokenCard {...props} key={index} />
                          ))}
                        </GridCardContainer>
                      )}

                      {nfts.length > 0 && (
                        <>
                          <p className="title-text mt-4">{t('title.nfts')}</p>

                          <GridCardContainer>
                            {nfts.map((props, index) => (
                              <NftCard {...(props as N)} key={index} />
                            ))}
                          </GridCardContainer>
                        </>
                      )}

                      {tokens.length === 0 &&
                        nfts.length === 0 &&
                        (chainId === CHAIN_ID ? (
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

      {FiatDepositModal && (
        <FiatDepositModal
          onClose={() => setShowDepositFiat(false)}
          visible={showDepositFiat}
        />
      )}
    </>
  )
}
