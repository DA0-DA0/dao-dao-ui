import {
  DaoCard as StatelessDaoCard,
  useCachedLoading,
} from '@dao-dao/stateless'
import { DaoCardInfo } from '@dao-dao/types/components/DaoCard'

import { useFollowingDaos, useProfile } from '../../hooks'
import { daoCardInfoLazyDataSelector } from '../../recoil'
import { LinkWrapper } from '../LinkWrapper'

export const DaoCard = (props: DaoCardInfo) => {
  // Don't load chain-specific profile because the wallet may not be connected
  // to that chain and thus the correct profile won't load. Instead, fetch the
  // chains from the currently connected profile and find the correct one.
  const { chains } = useProfile()

  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos(props.chainId)

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

  return (
    <StatelessDaoCard
      {...props}
      LinkWrapper={LinkWrapper}
      follow={{
        following: isFollowing(props.coreAddress),
        updatingFollowing,
        onFollow: () =>
          isFollowing(props.coreAddress)
            ? setUnfollowing(props.coreAddress)
            : setFollowing(props.coreAddress),
      }}
      lazyData={lazyData}
    />
  )
}
