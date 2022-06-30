/* eslint-disable @next/next/no-img-element */

export interface HeroOverlayProps {}

export const HeroOverlay = ({}: HeroOverlayProps) => (
  <div
    className="absolute inset-0 z-[-1] flex flex-col items-center justify-center"
    style={{
      background:
        'radial-gradient(72.67% 293.01% at 0.42% 98.15%, rgba(221, 60, 101, 0.2) 0%, rgba(28, 29, 30, 0.2) 94.25%)',
    }}
  ></div>
)
