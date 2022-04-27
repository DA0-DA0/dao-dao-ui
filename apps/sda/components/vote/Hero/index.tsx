import { ReactNode } from 'react'

import { HeroHeader } from './Header'
import { HeroOverlay } from './Overlay'
import { HeroStats } from './Stats'

export interface HeroProps {
  children: ReactNode
}

export const VoteHero = ({ children }: HeroProps) => (
  <div className="overflow-hidden relative bg-disabled rounded-lg">
    <HeroOverlay />
    {children}
  </div>
)

VoteHero.Header = HeroHeader
VoteHero.Stats = HeroStats
