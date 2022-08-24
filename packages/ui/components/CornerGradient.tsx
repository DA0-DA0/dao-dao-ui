// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

export interface CornerGradientProps {
  color: string
}

/*
 * A corner gradient for cards. COLOR is a CSS color string. For best results
 * your color should likely have an opacity of about 10%.
 *
 * This component expects that its parent has position relative.
 */
export const CornerGradient = ({ color }: CornerGradientProps) => (
  <div
    className="absolute top-0 left-0 -z-10 w-full h-full rounded-lg"
    style={{
      backgroundImage: `radial-gradient(22.07% 77.03% at 3.52% 7.35%, ${color} 0%, transparent 100%)`,
    }}
  ></div>
)
