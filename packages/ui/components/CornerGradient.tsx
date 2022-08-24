// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import clsx from 'clsx'

export interface CornerGradientProps {
  color: string
  gradientShape?: string
  className?: string
}

/*
 * A corner gradient for cards. COLOR is a CSS color string. For best results
 * your color should likely have an opacity of about 10%.
 *
 * This component expects that its parent has position relative.
 */
export const CornerGradient = ({
  color,
  gradientShape = '22.07% 77.03% at 3.52% 7.35%',
  className,
}: CornerGradientProps) => (
  <div
    className={clsx(
      'absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none',
      className
    )}
    style={{
      backgroundImage: `radial-gradient(${gradientShape}, ${color} 0%, #00000000 100%)`,
    }}
  ></div>
)
