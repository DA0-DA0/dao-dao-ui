import * as React from 'react'
import { SVGProps } from 'react'

const SvgExecuted = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.625 8a5.375 5.375 0 1 1 10.75 0 5.375 5.375 0 0 1-10.75 0ZM8 1.375a6.625 6.625 0 1 0 0 13.25 6.625 6.625 0 0 0 0-13.25Zm2.993 5.009.384-.494-.987-.767-.383.493L6.94 9.557l-1.5-1.499L5 7.616l-.884.884.442.442 2 2 .935-.058 3.5-4.5Z"
      fill={props.color}
      fillOpacity={0.9}
      fillRule="evenodd"
    />
  </svg>
)

export default SvgExecuted
