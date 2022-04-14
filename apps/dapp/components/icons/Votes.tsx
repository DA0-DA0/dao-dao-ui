import * as React from 'react'
import { SVGProps } from 'react'

const SvgVotes = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="1em"
    viewBox="0 0 12 14"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M10 7.667h-.453L8.213 9h1.274l1.18 1.333H1.333L2.52 9h1.367L2.553 7.667H2l-2 2v2.666c0 .734.593 1.334 1.327 1.334h9.34c.733 0 1.333-.594 1.333-1.334V9.667l-2-2ZM9.333 4.3l-3.3 3.3-2.36-2.36 3.3-3.3 2.36 2.36ZM6.507.527 2.26 4.773c-.26.26-.26.68 0 .94l3.3 3.3c.26.26.68.26.94 0l4.24-4.24c.26-.26.26-.68 0-.94l-3.3-3.3a.65.65 0 0 0-.933-.006Z" />
  </svg>
)

export default SvgVotes
