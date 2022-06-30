import { PlusIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'

export const EmptyContractCard = ({
  title,
  description,
  backgroundUrl,
  href,
  fullWidth,
}: {
  title: string
  description: string
  backgroundUrl: string
  href: string
  fullWidth?: boolean
}) => {
  return (
    <Link href={href} passHref>
      <a
        className={clsx(
          'overflow-hidden rounded-md border border-default transition hover:border-brand',
          {
            'w-full': fullWidth,
            'max-w-[400px] md:w-max': !fullWidth,
          }
        )}
      >
        <div
          className={'h-72 bg-cover bg-no-repeat opacity-75'}
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
        <div className="py-4 px-6">
          <div className="primary-text mb-2 flex items-center gap-2">
            <PlusIcon className="w-4" />
            {title}
          </div>
          <div className="body-text">{description}</div>
        </div>
      </a>
    </Link>
  )
}
