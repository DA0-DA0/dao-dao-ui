import * as React from 'react'
import { SVGProps } from 'react'

const SvgMessage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.66 2.666c0-.733-.593-1.333-1.327-1.333H2.667c-.734 0-1.334.6-1.334 1.333v8c0 .734.6 1.334 1.334 1.334H12l2.667 2.666-.007-12Zm-1.327 0v8.78l-.78-.78H2.667v-8h10.666ZM4 8h8v1.333H4V8Zm0-2h8v1.333H4V6Zm0-2h8v1.333H4V4Z"
      fill="#323232"
    />
  </svg>
)

export default SvgMessage
