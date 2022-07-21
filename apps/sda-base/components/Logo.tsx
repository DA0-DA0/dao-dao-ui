import { useDaoInfoContext } from '@dao-dao/common'
import { LogoFromImage, LogoProps } from '@dao-dao/ui'

import { DEFAULT_IMAGE_URL } from '@/util'

export const Logo = (props: LogoProps) => {
  // If on error page, this hook will throw an error. Ignore it since
  // Header is rendered on error pages.
  let imageUrl = DEFAULT_IMAGE_URL
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { imageUrl: daoImageUrl } = useDaoInfoContext()
    imageUrl = daoImageUrl ?? DEFAULT_IMAGE_URL
  } catch {}

  return <LogoFromImage rounded src={imageUrl} {...props} />
}
