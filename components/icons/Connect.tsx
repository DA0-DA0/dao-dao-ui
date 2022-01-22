import * as React from 'react'
import { SVGProps } from 'react'

const SvgConnect = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.16 7A3.429 3.429 0 1 0 9 11.84M11.84 9A3.429 3.429 0 1 0 7 4.16M7 9l2-2"
      stroke={props.color}
      strokeOpacity={0.7}
      strokeWidth={1.25}
      strokeLinecap="square"
      strokeLinejoin="bevel"
    />
  </svg>
)

export default SvgConnect
