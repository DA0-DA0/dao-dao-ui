import { HeroStatProps } from '@dao-dao/tstypes/ui/HeroStat'

export * from '@dao-dao/tstypes/ui/HeroStat'

export const HeroStat = ({ Icon, title, value }: HeroStatProps) => (
  <div className="flex gap-3 items-center">
    <Icon className="h-3 fill-current secondary-text" />
    <div className="flex gap-2 items-center">
      <span className="secondary-text">{title}</span>
      <span className="link-text">{value ?? '...'}</span>
    </div>
  </div>
)

export const HeroStatLink = ({ Icon, title, value }: HeroStatProps) => (
  <div className="flex gap-3 items-center">
    <Icon className="h-3 secondary-text" />
    <a
      className="link-text"
      href={value ?? '#'}
      rel="noopener noreferrer"
      target="_blank"
    >
      {title}
    </a>
  </div>
)
