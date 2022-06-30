import { ReactNode } from 'react'

import { HeroHeader } from './Header'
import { HeroOverlay } from './Overlay'
import { HeroStats } from './Stats'

export interface HeroProps {
  children: ReactNode
}

export const VoteHero = ({ children }: HeroProps) => (
  <div className="relative overflow-hidden rounded-lg bg-disabled">
    <HeroOverlay />
    {children}
  </div>
)

VoteHero.Header = HeroHeader
VoteHero.Stats = HeroStats
