import { FunctionComponent, SVGProps, useMemo } from 'react'

// Ensure radialGradient ID is unique on the page or else only one icon
// will render.
let id = 0

export const WalletAvatarIcon: FunctionComponent<SVGProps<SVGSVGElement>> = (
  props
) => {
  const currId = useMemo(() => ++id, [])

  return (
    <svg
      fill="none"
      height="1em"
      viewBox="0 0 40 40"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20Z"
        fill={`url(#WalletAvatar_svg__${currId})`}
      />
      <path
        clipRule="evenodd"
        d="M13.375 16.5c0-1.174.951-2.125 2.125-2.125h9c1.174 0 2.125.951 2.125 2.125v5.375h-.005v1.875a2 2 0 0 1-2 2h-9.25a2 2 0 0 1-2-2V21h.005v-4.5Zm1.25 2.75V21H17.5l1.75 2h1.5l1.75-2h2.875v-1.75a.875.875 0 0 0-.875-.875h-9a.875.875 0 0 0-.875.875Zm10.75-1.937a2.118 2.118 0 0 0-.875-.188h-9c-.312 0-.608.067-.875.188V16.5c0-.483.392-.875.875-.875h9c.483 0 .875.392.875.875v.813Z"
        fill="#F3F6F8"
        fillOpacity={0.9}
        fillRule="evenodd"
      />
      <defs>
        <radialGradient
          cx={0}
          cy={0}
          gradientTransform="rotate(169.842 32.078 7.639) scale(121.911 195.048)"
          gradientUnits="userSpaceOnUse"
          id={`WalletAvatar_svg__${currId}`}
          r={1}
        >
          <stop offset={0.165} stopColor="#F99974" />
          <stop offset={0.337} stopColor="#FE4366" />
          <stop offset={0.45} stopColor="#F43D88" />
          <stop offset={0.545} stopColor="#D72DE5" />
          <stop offset={0.733} stopColor="#3B7BEA" />
          <stop offset={0.828} stopColor="#30B1CD" />
          <stop offset={0.927} stopColor="#40CAD7" />
          <stop offset={1} stopColor="#09ACA2" />
        </radialGradient>
      </defs>
    </svg>
  )
}
