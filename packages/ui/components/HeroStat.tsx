import { ComponentProps } from 'react'

export interface HeroStatProps {
  Icon: (props: ComponentProps<any>) => JSX.Element
  title: string
  value: string | undefined
}

export const HeroStat = ({ Icon, title, value }: HeroStatProps) => (
  <div className="flex gap-3 items-center">
    <Icon className="h-3 fill-current secondary-text" />
    <div className="flex gap-2 items-center">
      <span className="secondary-text">{title}</span>
      <span className="link-text">{value ?? '...'}</span>
    </div>
  </div>
)
