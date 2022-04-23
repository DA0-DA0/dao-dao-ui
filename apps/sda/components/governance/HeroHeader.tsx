/* eslint-disable @next/next/no-img-element */

import { ComponentProps } from 'react'

export interface HeroHeaderProps extends ComponentProps<'div'> {
  title: string
  description: string
  imageUrl: string
}

export function HeroHeader({ title, description, imageUrl }: HeroHeaderProps) {
  return (
    <div className="flex flex-col justify-center items-center py-16 px-4 border-b border-gray-500/20">
      <img
        alt={title}
        className="mb-8 w-24 h-24 bg-black rounded-full shadow-sm"
        src={imageUrl}
      />
      <h1 className="mb-1 text-3xl font-bold">{title}</h1>
      <p className="text-lg">{description}</p>
    </div>
  )
}
