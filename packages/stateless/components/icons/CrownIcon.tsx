import { SVGProps } from 'react'

export const CrownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="1em"
    stroke={props.color || 'currentColor'}
    viewBox="0 0 31 31"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.849 25.776c.745-1.887 6.256-9.25 11.262-11.675a.418.418 0 0 0 .13-.66L18.17 1.731a.2.2 0 0 0-.345.132l-.228 8.001a.2.2 0 0 1-.254.187L6.863 7.102a.2.2 0 0 0-.244.256l3.563 10.693c.017.316-.063.203-.255.36L1.531 21.09a.2.2 0 0 0-.047.358L14 29.5"
      strokeLinecap="round"
      strokeWidth={2}
    />
  </svg>
)
