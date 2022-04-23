import { ReactNode } from 'react'

import { HeroHeader } from './HeroHeader'
import { HeroOverlay } from './HeroOverlay'
import { HeroStat } from './HeroStat'
import { HeroStats } from './HeroStats'

export interface HeroProps {
  children: ReactNode
}

export function Hero({ children }: HeroProps) {
  return (
    <div className="overflow-hidden relative bg-gray-500/10 rounded-lg border border-gray-500/20">
      {children}
    </div>
  )
}

Hero.Header = HeroHeader
Hero.Overlay = HeroOverlay
Hero.Stat = HeroStat
Hero.Stats = HeroStats
