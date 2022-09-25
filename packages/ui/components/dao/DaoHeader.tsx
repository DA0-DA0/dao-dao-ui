import { useTranslation } from 'react-i18next'

import { MarkdownPreview } from '../MarkdownPreview'
import { DaoImage, DaoImageProps } from './DaoImage'

export interface DaoHeaderProps {
  coreAddress?: string
  name: string
  description: string
  imageUrl?: string | null
  established?: string
  parentDao: DaoImageProps['parentDao']
}

export const DaoHeader = ({
  coreAddress,
  name,
  description,
  imageUrl,
  established,
  parentDao,
}: DaoHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center py-10">
      <DaoImage
        coreAddress={coreAddress}
        imageUrl={imageUrl}
        parentDao={parentDao}
        size="lg"
      />

      <p className="mt-6 text-center hero-text">{name}</p>
      {established && (
        <p className="mt-2 text-text-tertiary primary-text">
          {t('info.establishedAbbr')} {established}
        </p>
      )}

      <MarkdownPreview
        className="mt-3 whitespace-pre-wrap body-text"
        markdown={description}
      />
    </div>
  )
}
