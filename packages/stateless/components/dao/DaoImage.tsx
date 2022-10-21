import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

import { DaoParentInfo } from '@dao-dao/types/dao'
import { getFallbackImage } from '@dao-dao/utils'

export interface DaoImageProps {
  size: 'sm' | 'lg'
  imageUrl: string | undefined | null
  // Used to get placeholder image if no `imageUrl` present.
  coreAddress?: string
  parentDao?: Pick<DaoParentInfo, 'coreAddress' | 'imageUrl'> | null
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
    'absolute right-0 bottom-0 rounded-full bg-cover bg-center drop-shadow',
    {
      'h-8 w-8': size === 'sm',
      'h-10 w-10': size === 'lg',
    }
  )
  const parentDaoStyle = {
    backgroundImage: `url(${
      parentDao?.imageUrl || getFallbackImage(parentDao?.coreAddress)
    })`,
  }

  const sizeClassNames = clsx('overflow-hidden rounded-full', {
    // DaoCard
    'h-[4.5rem] w-[4.5rem]': size === 'sm',
    // DAO home page
    'h-24 w-24': size === 'lg',
  })

  return (
    <div
      className={clsx(
        'relative inline-block rounded-full',
        blur
          ? `border border-border-secondary ${sizeClassNames}`
          : 'border-2 border-border-primary p-1',
        className
      )}
    >
      <div
        className={clsx(
          'overflow-hidden rounded-full bg-cover bg-center',
          blur ? 'h-full w-full blur brightness-50' : sizeClassNames,
          imageClassName
        )}
        style={{
          backgroundImage: `url(${
            imageUrl || getFallbackImage(coreAddress || '')
          })`,
        }}
      ></div>

      {children && (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
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
