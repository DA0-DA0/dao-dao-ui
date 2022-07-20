import { useDaoInfoContext } from '@dao-dao/common'
import { LogoFromImage, LogoProps } from '@dao-dao/ui'

import { DEFAULT_IMAGE_URL } from '@/util'

export const Logo = (props: LogoProps) => {
  const { imageUrl } = useDaoInfoContext()

  return (
    <LogoFromImage rounded src={imageUrl ?? DEFAULT_IMAGE_URL} {...props} />
  )
}
