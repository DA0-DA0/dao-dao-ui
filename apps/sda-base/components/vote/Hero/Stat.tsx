import { ComponentProps } from 'react'

export interface IconStatsProps {
  Icon: (props: ComponentProps<any>) => JSX.Element
  title: string
  value: string
}

export const HeroStat = ({ Icon, value, title }: IconStatsProps) => (
  <div className="flex gap-3 items-center">
    <Icon className="h-3 fill-current secondary-text" />
    <div className="flex gap-2 items-center">
      <span className="secondary-text">{title}</span>
      <span className="link-text">{value ? value : '..'}</span>
    </div>
  </div>
)

export const HeroStatLink = ({ value, Icon, title }: IconStatsProps) => (
  <div className="flex gap-3 items-center">
    <Icon className="h-3 secondary-text" />
    <a
      className="link-text"
      href={value}
      rel="noopener noreferrer"
      target="_blank"
    >
      {title}
    </a>
  </div>
)
