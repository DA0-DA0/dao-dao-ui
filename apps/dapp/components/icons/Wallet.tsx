import * as React from 'react'
import { SVGProps } from 'react'

const SvgWallet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="1em"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M1.375 4.5c0-1.174.952-2.125 2.125-2.125h9c1.174 0 2.125.951 2.125 2.125v5.375h-.005v1.875a2 2 0 0 1-2 2H3.37a2 2 0 0 1-2-2V9h.005V4.5Zm1.25 2.75V9H5.5l1.75 2h1.5l1.75-2h2.875V7.25a.875.875 0 0 0-.875-.875h-9a.875.875 0 0 0-.875.875Zm10.75-1.937a2.117 2.117 0 0 0-.875-.188h-9c-.312 0-.608.067-.875.188V4.5c0-.483.392-.875.875-.875h9c.483 0 .875.392.875.875v.813Z"
      fill={props.color}
      fillOpacity={0.9}
      fillRule="evenodd"
    />
  </svg>
)

export default SvgWallet
