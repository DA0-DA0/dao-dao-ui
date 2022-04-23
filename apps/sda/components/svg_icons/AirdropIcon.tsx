import { SVGProps } from 'react'

export const AirdropIcon = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={height ?? 10}
    viewBox="0 0 10 10"
    width={width ?? 10}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.53564 1.21142L1.46457 8.28249M8.53564 1.21142L3.00024 1.21143M8.53564 1.21142L8.53564 6.74707"
      stroke={color}
      strokeLinecap="square"
      strokeLinejoin="bevel"
      strokeOpacity="0.9"
      strokeWidth="1.25"
    />
  </svg>
)
