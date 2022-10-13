import { SuspenseLoader } from '@dao-dao/common'

import { VoteHeroContent, VoteHeroContentLoader } from './VoteHeroContent'

export const VoteHero = () => (
  <div className="relative overflow-hidden rounded-lg bg-disabled">
    <div
      className="absolute inset-0 z-[-1] flex flex-col items-center justify-center"
      style={{
        background:
          'radial-gradient(72.67% 293.01% at 0.42% 98.15%, rgba(221, 60, 101, 0.2) 0%, rgba(28, 29, 30, 0.2) 94.25%)',
      }}
    ></div>

    <SuspenseLoader fallback={<VoteHeroContentLoader />}>
      <VoteHeroContent />
    </SuspenseLoader>
  </div>
)
