import { HeroStatProps } from '@dao-dao/tstypes/ui/HeroStat'

export * from '@dao-dao/tstypes/ui/HeroStat'

export const HeroStat = ({ Icon, title, value }: HeroStatProps) => (
  <div className="flex items-center gap-3">
    <Icon className="secondary-text h-3 fill-current" />
    <div className="flex items-center gap-2">
      <span className="secondary-text">{title}</span>
      <span className="link-text">{value ?? '...'}</span>
    </div>
  </div>
)

export const HeroStatLink = ({ Icon, title, value }: HeroStatProps) => (
  <div className="flex items-center gap-3">
    <Icon className="secondary-text h-3" />
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
