import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { FollowState, LinkWrapperProps } from '@dao-dao/types'

import { FollowingToggle } from '../buttons/FollowingToggle'
import { MarkdownRenderer } from '../MarkdownRenderer'
import { DaoImage, DaoImageProps } from './DaoImage'

export interface DaoHeaderProps {
  coreAddress?: string
  name: string
  description: string
  imageUrl?: string | null
  established?: string
  parentDao: DaoImageProps['parentDao']
  LinkWrapper: ComponentType<LinkWrapperProps>
  follow?: FollowState
}

export const DaoHeader = ({
  coreAddress,
  name,
  description,
  imageUrl,
  established,
  parentDao,
  LinkWrapper,
  follow,
}: DaoHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center gap-4 pt-4 pb-6">
      <DaoImage
        LinkWrapper={LinkWrapper}
        coreAddress={coreAddress}
        daoName={name}
        imageUrl={imageUrl}
        parentDao={parentDao}
        size="lg"
      />

      <div className="flex flex-col items-center gap-1">
        <p className="hero-text text-center">{name}</p>
        {established && (
          <p className="primary-text text-text-tertiary">
            {t('info.establishedAbbr')} {established}
          </p>
        )}
      </div>

      <MarkdownRenderer
        className="body-text whitespace-pre-wrap"
        markdown={description}
      />

      {follow && <FollowingToggle className="mt-2" {...follow} />}
    </div>
  )
}
