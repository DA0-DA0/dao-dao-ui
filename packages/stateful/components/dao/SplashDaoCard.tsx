import { useEffect } from 'react'

import {
  DaoCard as StatelessDaoCard,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { DaoCardInfo } from '@dao-dao/types/stateless/DaoCard'
import { loadableToLoadingData } from '@dao-dao/utils'

import { daoCardInfoLazyDataSelector } from '../../recoil'
import { IconButtonLink } from '../IconButtonLink'
import { LinkWrapper } from '../LinkWrapper'

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
      IconButtonLink={IconButtonLink}
      LinkWrapper={LinkWrapper}
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
