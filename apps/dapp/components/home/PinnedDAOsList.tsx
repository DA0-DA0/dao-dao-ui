import { BookmarkIcon, PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, SuspenseLoader } from '@dao-dao/ui'

import { usePinnedDAOs } from '@/hooks'

import { PinnedDAOCard } from '../PinnedDAOCard'

export const PinnedDAOsList: FC = () => {
  const { t } = useTranslation()
  const { pinnedAddresses } = usePinnedDAOs()

  return pinnedAddresses.length > 0 ? (
    // Don't render on server since pinnedAddresses come from localStorage,
    // and we don't want a hydration error.
    <SuspenseLoader fallback={null}>
      <div>
        <div className="flex gap-4 justify-between items-center mb-4 primary-text">
          <div className="flex gap-1 items-center">
            <BookmarkIcon className="inline w-4" />
            <p>{t('info.pinned')}</p>
          </div>
          <Link href="/dao/create" passHref>
            <Button size="sm">
              <PlusIcon className="w-4 h-4" /> {t('button.create')}
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 justify-center max-w-6xl md:justify-start">
          {pinnedAddresses.map((address) => (
            <PinnedDAOCard key={address} address={address} />
          ))}
        </div>
      </div>
    </SuspenseLoader>
  ) : null
}
