import {
  ArrowOutwardRounded,
  AudiotrackRounded,
  ExpandCircleDownOutlined,
  ImageNotSupported,
} from '@mui/icons-material'
import clsx from 'clsx'
import Image from 'next/image'
import { ComponentType, forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'

import {
  ButtonLinkProps,
  ButtonPopupSection,
  NftCardInfo,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import {
  NFT_VIDEO_EXTENSIONS,
  getImageUrlForChainId,
  getNftName,
  objectMatchesStructure,
  toAccessibleImageUrl,
} from '@dao-dao/utils'

import { AudioPlayer } from './AudioPlayer'
import { Button } from './buttons'
import { CopyToClipboardUnderline } from './CopyToClipboard'
import { Checkbox } from './inputs'
import { LinkWrapper } from './LinkWrapper'
import { MarkdownRenderer } from './MarkdownRenderer'
import { ButtonPopup } from './popup/ButtonPopup'
import { TooltipLikeDisplay } from './tooltip/TooltipLikeDisplay'

export interface NftCardProps extends NftCardInfo {
  hideCollection?: boolean
  // Alternative label for Owner address.
  ownerLabel?: string
  checkbox?: {
    checked: boolean
    onClick: () => void
  }
  className?: string
  // Needs to be defined to show the NFT owner.
  EntityDisplay?: ComponentType<StatefulEntityDisplayProps>
  // If present, will show button popup dropdown.
  buttonPopup?: {
    sections: ButtonPopupSection[]
    ButtonLink: ComponentType<ButtonLinkProps>
  }
}

export const NftCard = forwardRef<HTMLDivElement, NftCardProps>(
  function NftCard(
    {
      hideCollection,
      ownerLabel,
      collection,
      owner,
      externalLink,
      checkbox,
      imageUrl,
      metadata,
      floorPrice,
      name,
      description,
      tokenId,
      chainId,
      className,
      EntityDisplay,
      buttonPopup,
    },
    ref
  ) {
    const { t } = useTranslation()

    // Loading if imageUrl is present.
    const [imageLoading, setImageLoading] = useState(!!imageUrl)

    const chainImage = getImageUrlForChainId(chainId)

    const [descriptionCollapsible, setDescriptionCollapsible] = useState(false)
    const [descriptionCollapsed, setDescriptionCollapsed] = useState(true)

    const video =
      // If image contains a video, treat it as a video.
      imageUrl && NFT_VIDEO_EXTENSIONS.includes(imageUrl.split('.').pop() || '')
        ? imageUrl
        : metadata &&
          objectMatchesStructure(metadata, {
            properties: {
              video: {},
            },
          })
        ? metadata.properties.video
        : null

    const audio =
      metadata &&
      objectMatchesStructure(metadata, {
        properties: {
          audio: {},
        },
      })
        ? metadata.properties.audio
        : null

    return (
      <div
        className={clsx(
          'group relative flex flex-col items-stretch overflow-hidden rounded-lg bg-background-primary outline outline-2 ring-2 ring-inset ring-[transparent] transition-all',
          {
            'hover:bg-background-secondary hover:ring-border-interactive-focus':
              externalLink || checkbox,
            'outline-[transparent]': !checkbox?.checked,
            'outline-border-interactive-active': checkbox?.checked,
          },
          imageLoading && !video && imageUrl && 'animate-pulse',
          className
        )}
        ref={ref}
      >
        <div
          className={clsx(
            'relative flex flex-col items-stretch',
            // Make entire image clickable checkbox if present.
            checkbox && 'cursor-pointer'
          )}
          onClick={checkbox?.onClick}
        >
          <div className="relative aspect-square">
            <div className="absolute top-0 right-0 bottom-0 left-0">
              {video ? (
                <ReactPlayer
                  controls
                  height="100%"
                  onReady={() => setImageLoading(false)}
                  url={video}
                  width="100%"
                />
              ) : imageUrl ? (
                <Image
                  alt={t('info.nftImage')}
                  className="h-full w-full object-cover"
                  fill
                  onLoadingComplete={() => setImageLoading(false)}
                  src={toAccessibleImageUrl(imageUrl, { proxy: true })}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  {audio ? (
                    <AudiotrackRounded className="!h-14 !w-14 text-icon-tertiary" />
                  ) : (
                    <ImageNotSupported className="!h-14 !w-14 text-icon-tertiary" />
                  )}
                </div>
              )}
            </div>

            {audio && !video && (
              <AudioPlayer
                className="absolute bottom-0 left-0 right-0 bg-transparent"
                iconClassName="text-icon-primary"
                progressClassName="text-text-primary"
                src={audio}
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 0.8) 50%, rgba(var(--color-background-base), 1) 100%)',
                }}
              />
            )}
          </div>

          {externalLink && (
            <LinkWrapper
              href={externalLink.href}
              // Don't click on anything else, such as the checkbox.
              onClick={(e) => e.stopPropagation()}
              openInNewTab
            >
              <TooltipLikeDisplay
                className="absolute bottom-4 left-4 opacity-0 shadow-dp4 transition-opacity hover:!opacity-90 group-hover:opacity-100"
                icon={<ArrowOutwardRounded className="!h-5 !w-5" />}
                label={t('button.openInDestination', {
                  destination: externalLink.name,
                })}
              />
            </LinkWrapper>
          )}

          {buttonPopup && buttonPopup.sections.length > 0 && (
            <div className="absolute top-2 right-2">
              <ButtonPopup
                ButtonLink={buttonPopup.ButtonLink}
                popupClassName="w-[16rem]"
                position="left"
                sections={buttonPopup.sections}
                trigger={{
                  type: 'icon_button',
                  props: ({ open }) => ({
                    Icon: ExpandCircleDownOutlined,
                    className: clsx(
                      'shadow-dp4 group-hover:opacity-100',
                      !open && 'opacity-0'
                    ),
                    variant: 'primary_inverted',
                  }),
                }}
              />
            </div>
          )}
        </div>

        {checkbox && (
          <Checkbox
            {...checkbox}
            className="absolute top-3 left-3 shadow-dp4"
          />
        )}

        {(!hideCollection || (owner && EntityDisplay) || floorPrice) && (
          <div className="flex flex-col gap-4 border-b border-border-secondary py-4 px-6">
            {/* Collection */}
            {!hideCollection && (
              <div className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="secondary-text">{t('title.collection')}</p>

                  <CopyToClipboardUnderline
                    takeStartEnd={{ start: 7, end: 5 }}
                    value={collection.address}
                  />
                </div>

                {chainImage && (
                  <Image
                    alt=""
                    className="shrink-0"
                    height={20}
                    src={chainImage}
                    width={20}
                  />
                )}
              </div>
            )}

            {/* Owner */}
            {owner && EntityDisplay && (
              <div className="space-y-2">
                <p className="secondary-text">
                  {ownerLabel || t('title.owner')}
                </p>

                <EntityDisplay address={owner} />
              </div>
            )}

            {/* Floor price */}
            {floorPrice && (
              <div className="space-y-2">
                <p className="secondary-text">{t('title.floorPrice')}</p>

                <p className="body-text font-mono">
                  {floorPrice.amount.toLocaleString(undefined, {
                    maximumSignificantDigits: 3,
                  })}{' '}
                  ${floorPrice.denom}
                </p>
              </div>
            )}
          </div>
        )}

        <div
          className="flex min-h-[5.5rem] grow flex-col gap-2 py-4 px-6"
          ref={
            // Decide if description should be collapsible based on if text is
            // being truncated or not.
            (ref) => {
              if (!ref || descriptionCollapsible) {
                return
              }

              const descriptionPTag = ref?.children[1]?.children[0]
              const descriptionOverflowing =
                !!descriptionPTag &&
                descriptionPTag.scrollHeight > descriptionPTag.clientHeight

              setDescriptionCollapsible(descriptionOverflowing)
            }
          }
        >
          <p className="primary-text">
            {getNftName(collection.name, tokenId, name)}
          </p>

          {!!description && (
            <div className="space-y-1">
              <MarkdownRenderer
                className={
                  descriptionCollapsed ? 'break-words line-clamp-3' : undefined
                }
                markdown={description}
              />

              {(descriptionCollapsible || !descriptionCollapsed) && (
                <Button
                  className="text-text-tertiary"
                  onClick={() => setDescriptionCollapsed((c) => !c)}
                  variant="underline"
                >
                  {descriptionCollapsed
                    ? t('button.readMore')
                    : t('button.readLess')}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)
