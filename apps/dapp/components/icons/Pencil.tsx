import * as React from 'react'
import { SVGProps } from 'react'

const SvgPencil = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 9.5V12h2.5l7.373-7.373-2.5-2.5L0 9.5Zm1.947 1.167h-.614v-.614l6.04-6.04.614.614-6.04 6.04Zm9.86-8.914-1.56-1.56A.655.655 0 0 0 9.773 0a.656.656 0 0 0-.466.193l-1.22 1.22 2.5 2.5 1.22-1.22c.26-.26.26-.68 0-.94Z"
      fill="#F3F6F8"
      fillOpacity={0.9}
    />
  </svg>
)

export default SvgPencil
