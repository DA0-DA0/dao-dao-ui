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
        'flex relative flex-col items-center p-6 w-[260px] h-[320px] bg-card rounded-lg hover:outline-1 hover:outline-brand hover:outline',
        className
      )}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <div className="absolute top-0 left-0 w-full h-[160px] bg-gradient-to-t from-transparent to-dark rounded-lg opacity-[8%] "></div>
      <div
        className="flex relative justify-center items-center bg-center bg-cover rounded-full"
        style={{
          backgroundImage: `url(${image})`,
          width: '80px',
          height: '80px',
        }}
      >
        <div
          className="absolute -right-[10px] -bottom-1 bg-center rounded-full border border-light"
          style={{
            width: '32px',
            height: '32px',
            backgroundImage: 'url(/daotoken.jpg)',
          }}
        ></div>
      </div>
      <h3 className="mt-5 title-text">{name}</h3>
      <p className="mt-2 font-mono text-xs text-center text-secondary break-words line-clamp-3">
        {description}
      </p>
      <div className="flex flex-col gap-1 mt-5 items-left">
        <p className="text-sm">
          <Dao className="inline mr-2 mb-1 w-4" fill="currentColor" />${TVL} TVL
        </p>
        <p className="text-sm text-valid text-success">
          <Votes className="inline mr-2 mb-1 h-5" fill="currentColor" />
          {members} {t('members', { count: 100 })}
        </p>
      </div>
    </a>
  )
}
