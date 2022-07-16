import { Children, ReactNode } from 'react'

export interface HorizontalInfoProps {
  children?: ReactNode
}

export const HorizontalInfoSection = ({ children }: HorizontalInfoProps) => (
  <div className="flex flex-row gap-1 items-center caption-text">
    {children}
  </div>
)

export const HorizontalInfo = ({ children }: HorizontalInfoProps) => {
  const childList = Children.toArray(children)
  return (
    <div className="py-[20px] w-full border-y border-inactive">
      <ul className="flex flex-wrap gap-2 justify-around text-sm list-none">
        {Children.map(childList, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </div>
  )
}
