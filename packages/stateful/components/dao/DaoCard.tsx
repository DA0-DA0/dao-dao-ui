import {
  DaoCard as StatelessDaoCard,
  useCachedLoading,
} from '@dao-dao/stateless'
import { DaoCardInfo } from '@dao-dao/types/components/DaoCard'

import { useFollowingDaos, useWallet } from '../../hooks'
import { daoCardInfoLazyDataSelector } from '../../recoil'
import { LinkWrapper } from '../LinkWrapper'

export const DaoCard = (props: DaoCardInfo) => {
  const { address: walletAddress } = useWallet({ chainId: props.chainId })
  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos(props.chainId)

  const lazyData = useCachedLoading(
    daoCardInfoLazyDataSelector({
      coreAddress: props.coreAddress,
      chainId: props.chainId,
      walletAddress,
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
