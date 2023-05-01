import { QuestionMark } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { LinkWrapperProps } from '@dao-dao/types'
import { DaoParentInfo } from '@dao-dao/types/dao'
import { getFallbackImage, toAccessibleImageUrl } from '@dao-dao/utils'

import { useDaoNavHelpers } from '../../hooks'
import { Tooltip } from '../tooltip'

export interface DaoImageProps {
  daoName: string
  size: 'sm' | 'md' | 'lg'
  imageUrl: string | undefined | null
  // Used to get placeholder image if no `imageUrl` present.
  coreAddress?: string
  parentDao?: Pick<
    DaoParentInfo,
    'name' | 'coreAddress' | 'imageUrl' | 'registeredSubDao'
  > | null
  className?: string
  imageClassName?: string
  children?: ReactNode
  blur?: boolean
  hideRing?: boolean
  LinkWrapper: ComponentType<LinkWrapperProps>
}

export const DaoImage = ({
  daoName,
  size,
  imageUrl,
  coreAddress,
  parentDao,
  className,
  imageClassName,
  children,
  blur,
  hideRing = false,
  LinkWrapper,
}: DaoImageProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()

  const sizeClassNames = clsx('overflow-hidden rounded-full', {
    // DaoCard
    'h-[4.5rem] w-[4.5rem]': size === 'sm',
    // SDA header
    'h-8 w-8': size === 'md',
    // DAO home page
    'h-24 w-24': size === 'lg',
  })

  return (
    <div
      className={clsx(
        'relative inline-block rounded-full',
        blur
          ? `border border-border-secondary ${sizeClassNames}`
          : !hideRing && 'border-2 border-border-primary p-1',
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
              ? toAccessibleImageUrl(imageUrl)
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
        <Tooltip
          title={t(
            parentDao.registeredSubDao
              ? 'info.subDaoRegistered'
              : 'info.subDaoNeedsAdding',
            {
              parent: parentDao.name,
              child: daoName,
            }
          )}
        >
          <LinkWrapper
            className="block h-full w-full"
            containerClassName={clsx(
              'absolute right-0 bottom-0 rounded-full bg-cover bg-center shadow-dp4',
              {
                'h-8 w-8': size === 'sm',
                'h-10 w-10': size === 'lg',
              }
            )}
            href={getDaoPath(parentDao.coreAddress)}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${
                parentDao.imageUrl
                  ? toAccessibleImageUrl(parentDao.imageUrl)
                  : getFallbackImage(parentDao.coreAddress)
              })`,
            }}
          >
            {/* Show gray overlay with question mark if parent has not registered this SubDAO. */}
            {!parentDao.registeredSubDao && (
              <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center rounded-full bg-background-overlay">
                <QuestionMark
                  className={clsx('text-text-secondary', {
                    '!h-5 !w-5': size === 'sm',
                    '!h-6 !w-6': size === 'lg',
                  })}
                />
              </div>
            )}
          </LinkWrapper>
        </Tooltip>
      )}
    </div>
  )
}
