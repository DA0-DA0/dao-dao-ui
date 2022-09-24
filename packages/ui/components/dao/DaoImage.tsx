import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

import { DaoParentInfo } from '@dao-dao/tstypes/dao'
import { getFallbackImage } from '@dao-dao/utils'

export interface DaoImageProps {
  size: 'sm' | 'lg'
  imageUrl: string | undefined | null
  // Used to get placeholder image if no `imageUrl` present.
  coreAddress?: string
  parentDao?: Pick<DaoParentInfo, 'coreAddress' | 'imageUrl'>
  className?: string
  imageClassName?: string
  children?: ReactNode
  blur?: boolean
}

export const DaoImage = ({
  size,
  imageUrl,
  coreAddress,
  parentDao,
  className,
  imageClassName,
  children,
  blur,
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

  const sizeClassNames = clsx('overflow-hidden rounded-full', {
    // DaoCard
    'w-[4.5rem] h-[4.5rem]': size === 'sm',
    // DAO home page
    'w-24 h-24': size === 'lg',
  })

  return (
    <div
      className={clsx(
        'inline-block relative rounded-full',
        blur
          ? `border border-border-secondary ${sizeClassNames}`
          : 'p-1 border-2 border-border-primary',
        className
      )}
    >
      <div
        className={clsx(
          'overflow-hidden bg-center bg-cover rounded-full',
          blur ? 'w-full h-full blur brightness-50' : sizeClassNames,
          imageClassName
        )}
        style={{
          backgroundImage: `url(${
            imageUrl || getFallbackImage(coreAddress || '')
          })`,
        }}
      ></div>

      {children && (
        <div className="flex absolute top-0 right-0 bottom-0 left-0 justify-center items-center">
          {children}
        </div>
      )}

      {parentDao && (
        <Link href={`/dao/${parentDao.coreAddress}`}>
          <a className={parentDaoClassNames} style={parentDaoStyle}></a>
        </Link>
      )}
    </div>
  )
}
