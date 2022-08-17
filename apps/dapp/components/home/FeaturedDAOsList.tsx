// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { PlusIcon, SparklesIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { Button, SuspenseLoader } from '@dao-dao/ui'

import { usePinnedDAOs } from '@/hooks'

import { FeaturedCard } from '../FeaturedCard'
import { FeaturedDao } from '../splash'
import { DaoCardContainer } from './DaoCardContainer'

export interface FeaturedDAOsListProps {
  featuredDaos: FeaturedDao[]
}

export const FeaturedDAOsList = ({ featuredDaos }: FeaturedDAOsListProps) => {
  const { t } = useTranslation()
  const { pinnedAddresses } = usePinnedDAOs()

  return (
    // Don't render on server since pinnedAddresses come from localStorage,
    // and we don't want a hydration error.
    <SuspenseLoader fallback={null}>
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

      <DaoCardContainer>
        {featuredDaos.map((props) => (
          <FeaturedCard {...props} key={props.name} />
        ))}
      </DaoCardContainer>
    </SuspenseLoader>
  )
}
