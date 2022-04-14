import * as React from 'react'
import { SVGProps } from 'react'

const SvgRejected = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8 2.625a5.375 5.375 0 1 0 0 10.75 5.375 5.375 0 0 0 0-10.75ZM1.375 8a6.625 6.625 0 1 1 13.25 0 6.625 6.625 0 0 1-13.25 0Zm9.509-2-.442.442L8.884 8l1.558 1.558.442.442-.884.884-.442-.442L8 8.884l-1.558 1.558-.442.442L5.116 10l.442-.442L7.116 8 5.558 6.442 5.116 6 6 5.116l.442.442L8 7.116l1.558-1.558.442-.442.884.884Z"
      fill={props.color}
      fillOpacity={0.9}
      fillRule="evenodd"
    />
  </svg>
)

export default SvgRejected
