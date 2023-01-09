import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { LinkWrapperProps } from '@dao-dao/types'

import { MarkdownPreview } from '../MarkdownPreview'
import { DaoImage, DaoImageProps } from './DaoImage'

export interface DaoHeaderProps {
  coreAddress?: string
  name: string
  description: string
  imageUrl?: string | null
  established?: string
  parentDao: DaoImageProps['parentDao']
  LinkWrapper: ComponentType<LinkWrapperProps>
}

export const DaoHeader = ({
  coreAddress,
  name,
  description,
  imageUrl,
  established,
  parentDao,
  LinkWrapper,
}: DaoHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center py-10">
      <DaoImage
        LinkWrapper={LinkWrapper}
        coreAddress={coreAddress}
        imageUrl={imageUrl}
        parentDao={parentDao}
        size="lg"
      />

      <p className="hero-text mt-6 text-center">{name}</p>
      {established && (
        <p className="primary-text mt-2 text-text-tertiary">
          {t('info.establishedAbbr')} {established}
        </p>
      )}

      <MarkdownPreview
        className="body-text mt-3 whitespace-pre-wrap"
        markdown={description}
      />
    </div>
  )
}
