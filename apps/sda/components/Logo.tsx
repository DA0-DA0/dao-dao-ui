import { useDAOInfoContext } from '.'
import { DEFAULT_IMAGE_URL } from '@/util'

export const Logo = ({
  size = 28,
  className,
}: {
  size?: number | string
  className?: string
}) => {
  const { imageUrl } = useDAOInfoContext()

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="logo"
      className={className}
      height={size}
      src={imageUrl ?? DEFAULT_IMAGE_URL}
      width={size}
    />
  )
}
