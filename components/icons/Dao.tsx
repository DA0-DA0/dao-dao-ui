import * as React from 'react'
import { SVGProps } from 'react'

const SvgDao = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 13 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.333 6.667H2v4.666h1.333V6.666Zm4 0H6v4.666h1.333V6.666Zm5.667 6H.333V14H13v-1.334Zm-1.667-6H10v4.666h1.333V6.666ZM6.667 2.173 10.14 4H3.193l3.474-1.827Zm0-1.506L.333 4v1.333H13V4L6.667.667Z"
      fill="#F3F6F8"
      fillOpacity={0.9}
    />
  </svg>
)

export default SvgDao
