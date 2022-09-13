// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { SuspenseLoader } from '@dao-dao/common'
import { PinOutline } from '@dao-dao/icons'
import { usePinnedDaos } from '@dao-dao/state'
import { Button, GridCardContainer } from '@dao-dao/ui'

import { PinnedDAOCard } from '../PinnedDAOCard'

export const PinnedDAOsList = () => {
  const { t } = useTranslation()
  const { pinnedAddresses } = usePinnedDaos()

  return pinnedAddresses.length > 0 ? (
    // Don't render on server since pinnedAddresses come from localStorage,
    // and we don't want a hydration error.
    <SuspenseLoader fallback={null}>
      <div className="flex gap-4 justify-between items-center mb-4 primary-text">
        <div className="flex gap-1 items-center">
          <PinOutline className="inline w-4" />
          <p>{t('info.pinned')}</p>
        </div>
        <Link href="/dao/create" passHref>
          <Button size="sm">
            <PlusIcon className="w-4 h-4" /> {t('button.create')}
          </Button>
        </Link>
      </div>

      <GridCardContainer>
        {pinnedAddresses.map((address) => (
          <PinnedDAOCard key={address} address={address} />
        ))}
      </GridCardContainer>
    </SuspenseLoader>
  ) : null
}
