import { ComponentProps, ReactNode } from 'react'

export interface HeroHeaderProps extends ComponentProps<'div'> {
  title?: string
  description?: string
  image: ReactNode
}

export const HeroHeader = ({ title, description, image }: HeroHeaderProps) => (
  <div className="flex flex-col justify-center items-center py-16 px-4 border-b border-inactive">
    <div className="overflow-hidden mb-8 w-24 h-24 rounded-full shadow-sm">
      {image}
    </div>
    <h1 className="mb-1 h-9 font-studiofeixen text-3xl">{title}</h1>
    <p className="h-7 text-lg">{description}</p>
  </div>
)
