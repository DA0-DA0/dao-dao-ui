import { FC } from 'react'

export interface CornerGradientProps {
  color: string
}

/*
 * A corner gradient for cards. COLOR is a CSS color string. For best
 * results your color should likey have an opacity of about 10%.
 *
 * This component expects that its parent has position relative.
 */
export const CornerGradient: FC<CornerGradientProps> = ({ color }) => (
  <div
    className="absolute top-0 left-0 -z-10 h-full w-full rounded-lg"
    style={{
      backgroundImage: `radial-gradient(22.07% 77.03% at 3.52% 7.35%, ${color} 0%, rgba(var(--light), 0) 100%)`,
    }}
  ></div>
)
