import clsx from 'clsx'
import Link from 'next/link'

export interface DaoImageProps {
  size: 'sm' | 'lg'
  imageUrl: string
  parentDao?: {
    href: string
    imageUrl: string
  }
  className?: string
}

export const DaoImage = ({
  size,
  imageUrl,
  parentDao,
  className,
}: DaoImageProps) => (
  <div
    className={clsx(
      'inline-block relative p-1 rounded-full border-2 border-border-primary',
      className
    )}
  >
    <div
      className={clsx('bg-center bg-cover', {
        // DaoCard
        'w-[4.5rem] h-[4.5rem]': size === 'sm',
        // DAO home page
        'w-24 h-24': size === 'lg',
      })}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    ></div>

    {parentDao && (
      <Link href={parentDao.href}>
        <a
          className={clsx(
            'absolute right-0 bottom-0 bg-center bg-cover rounded-full drop-shadow',
            {
              'w-8 h-8': size === 'sm',
              'w-10 h-10': size === 'lg',
            }
          )}
          style={{
            backgroundImage: `url(${parentDao.imageUrl})`,
          }}
        ></a>
      </Link>
    )}
  </div>
)
