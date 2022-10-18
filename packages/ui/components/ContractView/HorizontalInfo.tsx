import { Children, ReactNode } from 'react'

export interface HorizontalInfoProps {
  children?: ReactNode
}

export const HorizontalInfoSection = ({ children }: HorizontalInfoProps) => (
  <div className="caption-text flex flex-row items-center gap-1">
    {children}
  </div>
)

export const HorizontalInfo = ({ children }: HorizontalInfoProps) => {
  const childList = Children.toArray(children)
  return (
    <div className="w-full border-y border-inactive py-[20px]">
      <ul className="flex list-none flex-wrap justify-around gap-2 text-sm">
        {Children.map(childList, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </div>
  )
}
