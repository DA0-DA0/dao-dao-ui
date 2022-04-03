import * as React from 'react'
import { SVGProps } from 'react'

const SvgArrowUpRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.536 1.464 1.465 8.535m7.07-7.07H3m5.536 0V7"
      stroke={props.color}
      strokeOpacity={0.9}
      strokeWidth={1.25}
      strokeLinecap="square"
      strokeLinejoin="bevel"
    />
  </svg>
)

export default SvgArrowUpRight
