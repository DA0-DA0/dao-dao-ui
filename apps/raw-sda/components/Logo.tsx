import { useTranslation } from 'next-i18next'

import { DEFAULT_IMAGE_URL } from '@/util'

import { useDAOInfoContext } from '.'

export const Logo = ({
  size = 28,
  className,
}: {
  size?: number | string
  className?: string
}) => {
  const { t } = useTranslation()
  const { imageUrl } = useDAOInfoContext()

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={t('info.logo')}
      className={className}
      height={size}
      src={imageUrl ?? DEFAULT_IMAGE_URL}
      width={size}
    />
  )
}
