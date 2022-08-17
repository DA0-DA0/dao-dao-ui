// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Dao } from '@dao-dao/icons'

import { getCardFallbackImage } from '@/util'

interface FeaturedCardProps {
  image: string
  name: string
  TVL: string
  href: string
  description: string
  className?: string
}

export const FeaturedCard = ({
  className,
  image,
  name,
  TVL,
  href,
  description,
}: FeaturedCardProps) => {
  const [cardImage, setCardImage] = useState(image)

  // The wonders of javascript..
  useEffect(() => {
    const canary = document.createElement('img')
    canary.onerror = () => {
      // Don't loop if the fallback also fails to load.
      canary.onerror = null
      setCardImage(getCardFallbackImage(name))
    }
    canary.src = cardImage
  }, [cardImage, setCardImage, name])

  return (
    <a
      className={clsx(
        'flex relative flex-col justify-between items-center p-6 w-full h-[300px] bg-card rounded-lg hover:outline-1 hover:outline-brand hover:outline',
        className
      )}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <div className="absolute top-0 left-0 w-full h-[160px] bg-gradient-to-t from-transparent to-dark rounded-lg opacity-[8%]"></div>
      <div className="flex flex-col items-center self-stretch">
        <div
          className="relative w-[80px] h-[80px] bg-center bg-cover rounded-full"
          style={{
            backgroundImage: `url(${cardImage})`,
          }}
        ></div>
        <h3 className="mt-5 title-text">{name}</h3>
        <p className="mt-2 font-mono text-xs text-center text-secondary break-words line-clamp-3">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-1 mt-5 items-left">
        <p className="text-sm">
          <Dao className="inline mr-2 mb-1 w-4" fill="currentColor" />
          {/* eslint-disable-next-line i18next/no-literal-string */}
          {Number(TVL).toLocaleString()} USDC TVL
        </p>
      </div>
    </a>
  )
}
