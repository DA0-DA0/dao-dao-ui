import { useTranslation } from '@dao-dao/i18n'

import { useDAOInfoContext } from '.'
import { DEFAULT_IMAGE_URL } from '@/util'

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
