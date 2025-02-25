import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FollowState, LinkWrapperProps } from '@dao-dao/types'
import {
  UNDO_PAGE_PADDING_HORIZONTAL_CLASSES,
  UNDO_PAGE_PADDING_TOP_CLASSES,
  toAccessibleImageUrl,
} from '@dao-dao/utils'

import { Button, FollowingToggle } from '../buttons'
import { MarkdownRenderer } from '../MarkdownRenderer'
import { Modal } from '../modals'
import { DaoImage, DaoImageProps } from './DaoImage'

export type DaoHeaderProps = {
  coreAddress?: string
  name: string
  description: string
  imageUrl?: string | null
  bannerImageUrl?: string | null
  parentDao: DaoImageProps['parentDao']
  LinkWrapper: ComponentType<LinkWrapperProps>
  follow?: FollowState
  className?: string
}

export const DaoHeader = ({
  coreAddress,
  name,
  description,
  imageUrl,
  bannerImageUrl,
  parentDao,
  LinkWrapper,
  follow,
  className,
}: DaoHeaderProps) => {
  const { t } = useTranslation()
  const [descriptionCollapsed, setDescriptionCollapsed] = useState(false)
  const [descriptionVisible, setDescriptionVisible] = useState(false)

  const image = (
    <DaoImage
      LinkWrapper={LinkWrapper}
      className={
        bannerImageUrl
          ? 'bg-background-base ml-4 -mb-6 sm:-mb-8 md:-mb-10'
          : undefined
      }
      coreAddress={coreAddress}
      daoName={name}
      imageUrl={imageUrl}
      parentDao={parentDao}
      size={bannerImageUrl ? 'xl' : 'lg'}
    />
  )

  return (
    <>
      <div
        className={clsx(
          'flex gap-2',
          bannerImageUrl ? 'flex-col' : 'flex-row items-start',
          className
        )}
      >
        {bannerImageUrl ? (
          <div
            className={clsx(
              'flex flex-col justify-end items-start bg-no-repeat bg-center bg-cover mb-4 sm:mb-6 md:mb-8 h-32 xs:h-36 sm:h-40 md:h-48',
              UNDO_PAGE_PADDING_HORIZONTAL_CLASSES,
              UNDO_PAGE_PADDING_TOP_CLASSES
            )}
            style={{
              backgroundImage: `url(${toAccessibleImageUrl(bannerImageUrl)})`,
            }}
          >
            {image}
          </div>
        ) : (
          image
        )}

        <div className="flex grow flex-col gap-1 pl-2 pt-2">
          <div className="flex flex-row flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <p className="hero-text text-2xl xs:text-3xl md:text-4xl">{name}</p>
            {follow && (
              // Following toggle next to name on desktop.
              <FollowingToggle {...follow} className="hidden md:block" />
            )}
          </div>

          {!!description && (
            <div
              className={clsx(
                'max-w-prose space-y-1',
                descriptionCollapsed && 'cursor-pointer'
              )}
              onClick={() => setDescriptionVisible(true)}
            >
              <MarkdownRenderer
                className="body-text line-clamp-3 !overflow-hidden"
                markdown={description}
                ref={
                  // Decide if description should be collapsible based on if
                  // text is being truncated or not.
                  (ref) => {
                    if (!ref || descriptionCollapsed) {
                      return
                    }

                    setDescriptionCollapsed(ref.scrollHeight > ref.clientHeight)
                  }
                }
              />

              {descriptionCollapsed && (
                <Button
                  className="text-text-tertiary"
                  onClick={() => setDescriptionVisible(true)}
                  variant="none"
                >
                  {t('button.readMore')}
                </Button>
              )}
            </div>
          )}

          {follow && (
            // Following toggle below description on mobile.
            <FollowingToggle
              {...follow}
              className="mt-2 self-start block md:hidden"
            />
          )}
        </div>
      </div>

      {descriptionCollapsed && (
        <Modal
          header={{
            title: name,
          }}
          onClose={() => setDescriptionVisible(false)}
          visible={descriptionVisible}
        >
          <MarkdownRenderer
            className="body-text max-w-prose"
            markdown={description}
          />
        </Modal>
      )}
    </>
  )
}
