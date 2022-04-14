import * as React from 'react'
import { SVGProps } from 'react'

const SvgDiscord = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="1em"
    viewBox="0 0 20 20"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Zm2.145-15.7c1.072.186 2.097.51 3.053.948.008.003.015.01.02.018 1.694 2.491 2.53 5.302 2.217 8.537a.048.048 0 0 1-.02.035 12.399 12.399 0 0 1-3.75 1.893.048.048 0 0 1-.053-.018 9.973 9.973 0 0 1-.766-1.245.048.048 0 0 1 .026-.067 7.691 7.691 0 0 0 1.17-.557.048.048 0 0 0 .004-.08 5.976 5.976 0 0 1-.233-.182.046.046 0 0 0-.049-.007c-2.425 1.121-5.083 1.121-7.538 0a.046.046 0 0 0-.049.007 6.387 6.387 0 0 1-.232.182.048.048 0 0 0 .005.08c.373.214.762.403 1.17.558.027.01.039.04.026.066a8.89 8.89 0 0 1-.766 1.246.049.049 0 0 1-.053.017 12.44 12.44 0 0 1-3.745-1.893.051.051 0 0 1-.02-.035c-.261-2.799.271-5.633 2.216-8.538a.044.044 0 0 1 .02-.017c.957-.44 1.982-.763 3.053-.947a.048.048 0 0 1 .05.023c.132.235.283.535.385.781a11.42 11.42 0 0 1 3.43 0 8.61 8.61 0 0 1 .38-.78.046.046 0 0 1 .049-.024Zm-5.98 6.287c0 .833.608 1.512 1.348 1.512.75 0 1.348-.679 1.348-1.512.011-.827-.592-1.512-1.348-1.512-.751 0-1.349.679-1.349 1.512Zm4.984 0c0 .833.609 1.512 1.348 1.512.757 0 1.348-.679 1.348-1.512.012-.827-.591-1.512-1.348-1.512-.751 0-1.348.679-1.348 1.512Z"
      fill={props.color}
      fillRule="evenodd"
    />
  </svg>
)

export default SvgDiscord
