import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'

import { LinkWrapperProps } from '@dao-dao/types'
import { DaoParentInfo } from '@dao-dao/types/dao'
import { getFallbackImage, normalizeImageUrl } from '@dao-dao/utils'

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
  LinkWrapper: ComponentType<LinkWrapperProps>
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
  LinkWrapper,
}: DaoImageProps) => {
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
            imageUrl
              ? normalizeImageUrl(imageUrl)
              : getFallbackImage(coreAddress || '')
          })`,
        }}
      ></div>

      {children && (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
          {children}
        </div>
      )}

      {/* Link to parent DAO in a circle in the bottom right. */}
      {parentDao && (
        <LinkWrapper
          className="block h-full w-full"
          containerClassName={clsx(
            'absolute right-0 bottom-0 rounded-full bg-cover bg-center shadow-dp4',
            {
              'h-8 w-8': size === 'sm',
              'h-10 w-10': size === 'lg',
            }
          )}
          href={`/dao/${parentDao.coreAddress}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundImage: `url(${
              parentDao.imageUrl
                ? normalizeImageUrl(parentDao.imageUrl)
                : getFallbackImage(parentDao.coreAddress)
            })`,
          }}
        />
      )}
    </div>
  )
}
