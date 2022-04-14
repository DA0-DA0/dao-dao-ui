import * as React from 'react'
import { SVGProps } from 'react'

const SvgOpen = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.625 8a5.375 5.375 0 1 1 10.75 0 5.375 5.375 0 0 1-10.75 0ZM8 1.375a6.625 6.625 0 1 0 0 13.25 6.625 6.625 0 0 0 0-13.25ZM8 4.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5ZM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
      fill={props.color}
      fillOpacity={0.9}
      fillRule="evenodd"
    />
  </svg>
)

export default SvgOpen
