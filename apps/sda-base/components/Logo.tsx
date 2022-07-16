import { LogoFromImage, LogoProps } from '@dao-dao/ui'

import { DEFAULT_IMAGE_URL } from '@/util'

import { useDAOInfoContext } from '.'

export const Logo = (props: LogoProps) => {
  const { imageUrl } = useDAOInfoContext()

  return <LogoFromImage src={imageUrl ?? DEFAULT_IMAGE_URL} {...props} />
}
