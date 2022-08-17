import { ComponentType, useState } from 'react'

import { Logo as DefaultLogo, LogoProps } from '@dao-dao/ui'

export interface RotatableLogoProps extends LogoProps {
  Logo?: ComponentType<LogoProps>
  initialRotation: number
}

export const RotatableLogo = ({
  Logo = DefaultLogo,
  initialRotation,
  ...props
}: RotatableLogoProps) => {
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
