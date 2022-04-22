/* eslint-disable @next/next/no-img-element */

export interface HeroOverlayProps {
  imageUrl: string
}

export function HeroOverlay({ imageUrl }: HeroOverlayProps) {
  return (
    <div className="flex absolute inset-0 z-[-1] flex-col justify-center items-center">
      <img alt="blur" className="w-full opacity-20 blur-2xl" src={imageUrl} />
    </div>
  )
}
