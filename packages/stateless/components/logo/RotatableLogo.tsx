import { useState } from 'react'

import { LogoProps } from '@dao-dao/types/stateless/Logo'

import { Logo } from './Logo'

export interface RotatableLogoProps extends LogoProps {
  initialRotation: number
}

export const RotatableLogo = ({
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
