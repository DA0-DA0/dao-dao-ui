import { useWallet } from '@noahsaso/cosmodal'
import { useEffect } from 'react'

import {
  DaoCard as StatelessDaoCard,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { DaoCardInfo } from '@dao-dao/types/stateless/DaoCard'
import { CHAIN_ID, loadableToLoadingData } from '@dao-dao/utils'

import { useFollowingDaos } from '../../hooks'
import { daoCardInfoLazyDataSelector } from '../../recoil'
import { IconButtonLink } from '../IconButtonLink'
import { LinkWrapper } from '../LinkWrapper'

export const DaoCard = (props: DaoCardInfo) => {
  const { address: walletAddress } = useWallet()
  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos()

  const lazyDataLoadable = useCachedLoadable(
    daoCardInfoLazyDataSelector({
      coreAddress: props.coreAddress,
      chainId: props.chainId,
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
      IconButtonLink={IconButtonLink}
      LinkWrapper={LinkWrapper}
      follow={
        // Only allow following on same chain. This prevents following featured
        // mainnet DAOs on testnet.
        props.chainId === CHAIN_ID
          ? {
              following: isFollowing(props.coreAddress),
              updatingFollowing,
              onFollow: () =>
                isFollowing(props.coreAddress)
                  ? setUnfollowing(props.coreAddress)
                  : setFollowing(props.coreAddress),
            }
          : {
              hide: true,
            }
      }
      lazyData={loadableToLoadingData(lazyDataLoadable, {
        isMember: false,
        tokenBalance: NaN,
        proposalCount: NaN,
      })}
    />
  )
}
