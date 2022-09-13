// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { PlusIcon, SparklesIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { SuspenseLoader } from '@dao-dao/common'
import { usePinnedDaos } from '@dao-dao/state'
import { Button, DaoCard, DaoCardInfo, GridCardContainer } from '@dao-dao/ui'

export interface FeaturedDAOsListProps {
  featuredDaos: DaoCardInfo[]
}

export const FeaturedDAOsList = ({ featuredDaos }: FeaturedDAOsListProps) => {
  const { t } = useTranslation()
  const { pinnedAddresses, isPinned, setPinned, setUnpinned } = usePinnedDaos()

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

      <GridCardContainer>
        {featuredDaos.map((props) => (
          <DaoCard
            key={props.coreAddress}
            isMember={false}
            onPin={() =>
              isPinned(props.coreAddress)
                ? setUnpinned(props.coreAddress)
                : setPinned(props.coreAddress)
            }
            pinned={isPinned(props.coreAddress)}
            {...props}
          />
        ))}
      </GridCardContainer>
    </SuspenseLoader>
  )
}
