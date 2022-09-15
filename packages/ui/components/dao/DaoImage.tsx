import clsx from 'clsx'
import Link from 'next/link'

import { DaoInfo } from '@dao-dao/tstypes/dao'
import { getFallbackImage } from '@dao-dao/utils'

export interface DaoImageProps {
  size: 'sm' | 'lg'
  imageUrl: string | undefined | null
  // Used to get placeholder image if no `imageUrl` present.
  coreAddress?: string
  parentDao?: Pick<DaoInfo, 'imageUrl' | 'href' | 'coreAddress'>
  className?: string
}

export const DaoImage = ({
  size,
  imageUrl,
  coreAddress,
  parentDao,
  className,
}: DaoImageProps) => {
  const parentDaoClassNames = clsx(
    'absolute right-0 bottom-0 bg-center bg-cover rounded-full drop-shadow',
    {
      'w-8 h-8': size === 'sm',
      'w-10 h-10': size === 'lg',
    }
  )
  const parentDaoStyle = {
    backgroundImage: `url(${
      parentDao?.imageUrl || getFallbackImage(parentDao?.coreAddress)
    })`,
  }

  return (
    <div
      className={clsx(
        'inline-block relative p-1 rounded-full border-2 border-border-primary',
        className
      )}
    >
      <div
        className={clsx('overflow-hidden bg-center bg-cover rounded-full', {
          // DaoCard
          'w-[4.5rem] h-[4.5rem]': size === 'sm',
          // DAO home page
          'w-24 h-24': size === 'lg',
        })}
        style={{
          backgroundImage: `url(${
            imageUrl || getFallbackImage(coreAddress || '')
          })`,
        }}
      ></div>

      {parentDao &&
        (parentDao.href ? (
          <Link href={parentDao.href}>
            <a className={parentDaoClassNames} style={parentDaoStyle}></a>
          </Link>
        ) : (
          <div className={parentDaoClassNames} style={parentDaoStyle}></div>
        ))}
    </div>
  )
}
