import * as React from 'react'
import { SVGProps } from 'react'

const SvgMemberCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="1em"
    viewBox="0 0 16 12"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8.667 3.333a2.666 2.666 0 1 0-5.334 0 2.666 2.666 0 1 0 5.334 0Zm-1.334 0c0 .734-.6 1.334-1.333 1.334s-1.333-.6-1.333-1.334C4.667 2.6 5.267 2 6 2s1.333.6 1.333 1.333ZM.667 10v1.333h10.666V10c0-1.773-3.553-2.667-5.333-2.667C4.22 7.333.667 8.227.667 10ZM2 10c.133-.473 2.2-1.333 4-1.333 1.793 0 3.853.853 4 1.333H2Z" />
    <path
      clipRule="evenodd"
      d="m15.5 3.38-3.458 4.046L9.616 5l.884-.884 1.458 1.458L14.54 2.58l.96.8Z"
    />
  </svg>
)

export default SvgMemberCheck
