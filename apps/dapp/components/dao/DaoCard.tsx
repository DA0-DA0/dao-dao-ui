// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { useEffect } from 'react'

import {
  daoCardInfoLazyDataSelector,
  useCachedLoadable,
  usePinnedDaos,
} from '@dao-dao/state'
import { DaoCardInfo } from '@dao-dao/tstypes/ui/DaoCard'
import { DaoCard as StatelessDaoCard } from '@dao-dao/ui'
import { loadableToLoadingData } from '@dao-dao/utils'

export const DaoCard = (props: DaoCardInfo) => {
  const { address: walletAddress } = useWallet()
  const { isPinned: isDaoPinned, setPinned, setUnpinned } = usePinnedDaos()

  const lazyDataLoadable = useCachedLoadable(
    daoCardInfoLazyDataSelector({
      coreAddress: props.coreAddress,
      walletAddress,
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
      lazyData={loadableToLoadingData(lazyDataLoadable, {
        isMember: false,
        tokenBalance: NaN,
        proposalCount: NaN,
      })}
      onPin={() =>
        isDaoPinned(props.coreAddress)
          ? setUnpinned(props.coreAddress)
          : setPinned(props.coreAddress)
      }
      pinned={isDaoPinned(props.coreAddress)}
    />
  )
}
