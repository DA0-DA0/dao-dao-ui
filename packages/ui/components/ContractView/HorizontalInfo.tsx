import { Children, FC, ReactNode } from 'react'

export interface HorizontalInfoProps {
  children: ReactNode
}

export const HorizontalInfoSection: FC<HorizontalInfoProps> = ({
  children,
}) => (
  <div className="flex flex-row gap-1 items-center caption-text">
    {children}
  </div>
)

export const HorizontalInfo: FC<HorizontalInfoProps> = ({ children }) => {
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
