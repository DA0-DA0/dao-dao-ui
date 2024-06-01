import {
  DaoCard as StatelessDaoCard,
  useCachedLoading,
} from '@dao-dao/stateless'
import { DaoSource } from '@dao-dao/types'
import {
  FollowState,
  StatefulDaoCardProps,
} from '@dao-dao/types/components/DaoCard'

import { useFollowingDaos, useProfile } from '../../hooks'
import { daoCardLazyDataSelector } from '../../recoil'
import { LinkWrapper } from '../LinkWrapper'

export const DaoCard = (props: StatefulDaoCardProps) => {
  // Don't load chain-specific profile because the wallet may not be connected
  // to that chain and thus the correct profile won't load. Instead, fetch the
  // chains from the currently connected profile and find the correct one.
  const { chains } = useProfile()

  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos()

  const lazyData = useCachedLoading(
    daoCardLazyDataSelector({
      coreAddress: props.info.coreAddress,
      chainId: props.info.chainId,
      walletAddress: chains.loading
        ? undefined
        : chains.data.find((chain) => chain.chainId === props.info.chainId)
            ?.address,
    }),
    {
      isMember: false,
      proposalCount: NaN,
    }
  )

  const followedDao: DaoSource = {
    chainId: props.info.chainId,
    coreAddress: props.info.coreAddress,
  }
  const follow: FollowState = {
    following: isFollowing(followedDao),
    updatingFollowing,
    onFollow: () =>
      isFollowing(followedDao)
        ? setUnfollowing(followedDao)
        : setFollowing(followedDao),
  }

  return (
    <StatelessDaoCard
      {...props}
      LinkWrapper={LinkWrapper}
      follow={follow}
      lazyData={lazyData}
    />
  )
}
