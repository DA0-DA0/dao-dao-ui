import clsx from 'clsx'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Dao, Votes } from '@dao-dao/icons'

interface FeaturedCardProps {
  image: string
  name: string
  members: string
  TVL: string
  href: string
  description: string
  className?: string
}

export const FeaturedCard: FC<FeaturedCardProps> = ({
  className,
  image,
  name,
  members,
  TVL,
  href,
  description,
}) => {
  const { t } = useTranslation()

  return (
    <a
      className={clsx(
        'relative flex h-[320px] w-[260px] flex-col items-center rounded-lg bg-card p-6 hover:outline hover:outline-1 hover:outline-brand',
        className
      )}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <div className="absolute top-0 left-0 h-[160px] w-full rounded-lg bg-gradient-to-t from-transparent to-dark opacity-[8%] "></div>
      <div
        className="relative h-[80px] w-[80px] rounded-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <h3 className="title-text mt-5">{name}</h3>
      <p className="mt-2 break-words text-center font-mono text-xs text-secondary line-clamp-3">
        {description}
      </p>
      <div className="items-left mt-5 flex flex-col gap-1">
        <p className="text-sm">
          <Dao className="mr-2 mb-1 inline w-4" fill="currentColor" />${TVL} TVL
        </p>
        <p className="text-success text-sm text-valid">
          <Votes className="mr-2 mb-1 inline h-5" fill="currentColor" />
          {members} {t('info.members')}
        </p>
      </div>
    </a>
  )
}
