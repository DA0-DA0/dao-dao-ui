// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useEffect } from 'react'

import { daoCardInfoLazyDataSelector } from '@dao-dao/common'
import { useCachedLoadable } from '@dao-dao/state'
import { DaoCardInfo } from '@dao-dao/types/ui/DaoCard'
import { DaoCard as StatelessDaoCard } from '@dao-dao/ui'
import { loadableToLoadingData } from '@dao-dao/utils'

// Doesn't load any wallet information or allow pinning.
export const SplashDaoCard = (props: DaoCardInfo) => {
  const lazyDataLoadable = useCachedLoadable(
    daoCardInfoLazyDataSelector({
      coreAddress: props.coreAddress,
      chainId: props.chainId,
    })
  )

  //! Loadable errors.
  useEffect(() => {
    if (lazyDataLoadable.state === 'hasError') {
      console.error(lazyDataLoadable.contents)
    }
  }, [lazyDataLoadable.contents, lazyDataLoadable.state])

  return (
    <StatelessDaoCard
      {...props}
      hidePin
      lazyData={loadableToLoadingData(lazyDataLoadable, {
        isMember: false,
        tokenBalance: NaN,
        proposalCount: NaN,
      })}
      onPin={() => {}}
      pinned={false}
    />
  )
}
