import { ComponentProps, ReactNode } from 'react'

export interface HeroHeaderProps extends ComponentProps<'div'> {
  title?: string
  description?: string
  image: ReactNode
}

export const HeroHeader = ({ title, description, image }: HeroHeaderProps) => (
  <div className="flex flex-col justify-center items-center py-16 px-4 border-b border-inactive">
    <div className="overflow-hidden mb-8 w-24 h-24 rounded-full">{image}</div>
    <h1 className="mb-1 h-9 text-[26px] hero-text">{title}</h1>
    <p className="primary-text">{description}</p>
  </div>
)
