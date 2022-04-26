import { ReactNode } from 'react'

import { HeroHeader } from './Header'
import { HeroOverlay } from './Overlay'
import { HeroStats } from './Stats'

export interface HeroProps {
  children: ReactNode
}

export const Hero = ({ children }: HeroProps) => (
  <div className="overflow-hidden relative bg-disabled rounded-lg">
    <HeroOverlay />
    {children}
  </div>
)

Hero.Header = HeroHeader
Hero.Stats = HeroStats
