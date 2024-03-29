import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FollowState, LinkWrapperProps } from '@dao-dao/types'

import { Button, FollowingToggle } from '../buttons'
import { MarkdownRenderer } from '../MarkdownRenderer'
import { Modal } from '../modals'
import { DaoImage, DaoImageProps } from './DaoImage'

export interface DaoHeaderProps {
  coreAddress?: string
  name: string
  description: string
  imageUrl?: string | null
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
  parentDao,
  LinkWrapper,
  follow,
  className,
}: DaoHeaderProps) => {
  const { t } = useTranslation()
  const [descriptionCollapsed, setDescriptionCollapsed] = useState(false)
  const [descriptionVisible, setDescriptionVisible] = useState(false)

  return (
    <>
      <div className={clsx('flex flex-row items-start gap-2', className)}>
        <DaoImage
          LinkWrapper={LinkWrapper}
          coreAddress={coreAddress}
          daoName={name}
          imageUrl={imageUrl}
          parentDao={parentDao}
          size="lg"
        />

        <div className="flex grow flex-col gap-2 pl-2 pt-2">
          <div className="flex flex-row flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <p className="hero-text text-3xl xs:text-4xl">{name}</p>
            {follow && (
              // Only show following toggle on desktop. Mobile shows in header.
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
