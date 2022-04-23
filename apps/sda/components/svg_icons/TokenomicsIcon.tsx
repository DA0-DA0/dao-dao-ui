import { SVGProps } from 'react'

export const TokenomicsIcon = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={height ?? 15}
    viewBox="0 0 14 15"
    width={width ?? 14}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M7 7.74707V0.24707C9.07107 0.24707 10.9461 1.08654 12.3033 2.44377L7 7.74707ZM12.375 7.74707C12.375 6.55389 11.9862 5.45152 11.3284 4.55972L12.2314 3.68177C13.1048 4.80408 13.625 6.21483 13.625 7.74707C13.625 11.406 10.6589 14.3721 7 14.3721C3.34111 14.3721 0.375 11.406 0.375 7.74707C0.375 4.34176 2.94423 1.53653 6.25 1.16405V2.42398C3.6365 2.78886 1.625 5.03306 1.625 7.74707C1.625 10.7156 4.03147 13.1221 7 13.1221C9.96853 13.1221 12.375 10.7156 12.375 7.74707Z"
      fill={color}
      fillOpacity="0.95"
      fillRule="evenodd"
    />
  </svg>
)
