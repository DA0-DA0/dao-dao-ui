import { ComponentType, FC, useState } from 'react'

import { Logo as DefaultLogo, LogoProps } from '@dao-dao/ui'

export interface RotatableLogoProps extends LogoProps {
  Logo?: ComponentType<LogoProps>
  initialRotation: number
}

export const RotatableLogo: FC<RotatableLogoProps> = ({
  Logo = DefaultLogo,
  initialRotation,
  ...props
}) => {
  const [rotation, setRotation] = useState(initialRotation)

  return (
    <button
      className="transition"
      onClick={() => setRotation((rotation + 90) % 360)}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      type="button"
    >
      <Logo {...props} />
    </button>
  )
}
