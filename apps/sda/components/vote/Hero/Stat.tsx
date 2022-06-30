import { ComponentProps } from 'react'

export interface IconStatsProps {
  Icon: (props: ComponentProps<any>) => JSX.Element
  title: string
  value: string
}

export const HeroStat = ({ Icon, value, title }: IconStatsProps) => (
  <div className="flex items-center gap-3">
    <Icon className="secondary-text h-3 fill-current" />
    <div className="flex items-center gap-2">
      <span className="secondary-text">{title}</span>
      <span className="link-text">{value ? value : '..'}</span>
    </div>
  </div>
)

export const HeroStatLink = ({ value, Icon, title }: IconStatsProps) => (
  <div className="flex items-center gap-3">
    <Icon className="secondary-text h-3" />
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
