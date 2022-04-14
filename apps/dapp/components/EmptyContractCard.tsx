import Link from 'next/link'

import { PlusIcon } from '@heroicons/react/outline'

export const EmptyContractCard = ({
  title,
  description,
  backgroundUrl,
  href,
}: {
  title: string
  description: string
  backgroundUrl: string
  href: string
}) => {
  return (
    <Link href={href} passHref>
      <a className="border border-inactive transition hover:border-brand rounded-md w-max overflow-hidden max-w-[400px]">
        <div
          className={'h-72 bg-cover bg-no-repeat opacity-75'}
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
        <div className="px-6 py-4">
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
