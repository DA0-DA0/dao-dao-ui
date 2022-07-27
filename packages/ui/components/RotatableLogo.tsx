import { FC, useState } from 'react'

import { Logo } from '@dao-dao/ui'

export interface RotatableLogoProps {
  width?: number
  height?: number
  initialRotation: number
  altText?: string
  invert?: boolean
  className?: string
}

export const RotatableLogo: FC<RotatableLogoProps> = (props) => {
  const [rotation, setRotation] = useState(props.initialRotation)

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
