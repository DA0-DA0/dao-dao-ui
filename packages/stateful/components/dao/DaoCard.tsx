import {
  DaoCard as StatelessDaoCard,
  useCachedLoading,
} from '@dao-dao/stateless'
import { DaoSource } from '@dao-dao/types'
import { DaoCardInfo, FollowState } from '@dao-dao/types/components/DaoCard'

import { useFollowingDaos, useProfile } from '../../hooks'
import { daoCardInfoLazyDataSelector } from '../../recoil'
import { LinkWrapper } from '../LinkWrapper'

export const DaoCard = (props: DaoCardInfo) => {
  // Don't load chain-specific profile because the wallet may not be connected
  // to that chain and thus the correct profile won't load. Instead, fetch the
  // chains from the currently connected profile and find the correct one.
  const { chains } = useProfile()

  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos()

  const lazyData = useCachedLoading(
    daoCardInfoLazyDataSelector({
      coreAddress: props.coreAddress,
      chainId: props.chainId,
      walletAddress: chains.loading
        ? undefined
        : chains.data.find((chain) => chain.chainId === props.chainId)?.address,
    }),
    {
      isMember: false,
      tokenBalance: NaN,
      proposalCount: NaN,
    }
  )

  const followedDao: DaoSource = {
    chainId: props.chainId,
    coreAddress: props.coreAddress,
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
