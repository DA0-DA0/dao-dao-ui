import * as React from 'react'
import { SVGProps } from 'react'

const SvgAirplane = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="1em"
    viewBox="0 0 12 12"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.536 1.464 5.5 6.5m5.036-5.036L7.5 11.5l-2-5m5.036-5.036L.5 4.5l5 2"
      stroke={props.color}
      strokeLinecap="square"
      strokeLinejoin="bevel"
      strokeOpacity={0.9}
      strokeWidth={1.25}
    />
  </svg>
)

export default SvgAirplane
