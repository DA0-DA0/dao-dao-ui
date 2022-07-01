import { PlusIcon, SparklesIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Button, SuspenseLoader } from '@dao-dao/ui'

import { usePinnedDAOs } from '@/hooks'
import { featuredDaos } from '@/util'

import { FeaturedCard } from '../FeaturedDaos'

export const FeaturedDAOsList: FC = () => {
  const { t } = useTranslation()
  const { pinnedAddresses } = usePinnedDAOs()

  return (
    // Don't render on server since pinnedAddresses come from localStorage,
    // and we don't want a hydration error.
    <SuspenseLoader fallback={null}>
      <div>
        <div className="flex gap-4 justify-between items-center mb-4 primary-text">
          <div className="flex gap-1 items-center">
            <SparklesIcon className="inline w-4 " />
            <p>{t('info.featured')}</p>
          </div>
          {/* Show create button here if no pinned DAOs. */}
          {pinnedAddresses.length === 0 && (
            <Link href="/dao/create" passHref>
              <Button size="sm">
                <PlusIcon className="w-4 h-4" /> {t('button.create')}
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-wrap gap-4 justify-center max-w-6xl md:justify-start">
          {featuredDaos.map((props) => (
            <FeaturedCard {...props} key={props.name} />
          ))}
        </div>
      </div>
    </SuspenseLoader>
  )
}
