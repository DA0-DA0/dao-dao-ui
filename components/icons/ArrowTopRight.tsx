import * as React from 'react'
import { SVGProps } from 'react'

const SvgArrowTopRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.536 1.464 1.465 8.536m7.07-7.072H3m5.536 0V7"
      stroke="#F3F6F8"
      strokeOpacity={0.9}
      strokeWidth={1.25}
      strokeLinecap="square"
      strokeLinejoin="bevel"
    />
  </svg>
)

export default SvgArrowTopRight
