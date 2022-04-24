import { ReactNode } from 'react'

import { HeroHeader } from './HeroHeader'
import { HeroOverlay } from './HeroOverlay'
import { HeroStat } from './HeroStat'
import { HeroStats } from './HeroStats'

export interface HeroProps {
  children: ReactNode
}

export const Hero = ({ children }: HeroProps) => (
  <div className="overflow-hidden relative bg-disabled rounded-lg">
    {children}
  </div>
)

Hero.Header = HeroHeader
Hero.Overlay = HeroOverlay
Hero.Stat = HeroStat
Hero.Stats = HeroStats
