import { useWallet } from '@noahsaso/cosmodal'

import {
  DaoCard as StatelessDaoCard,
  useCachedLoading,
} from '@dao-dao/stateless'
import { DaoCardInfo } from '@dao-dao/types/stateless/DaoCard'

import { useFollowingDaos } from '../../hooks'
import { daoCardInfoLazyDataSelector } from '../../recoil'
import { IconButtonLink } from '../IconButtonLink'
import { LinkWrapper } from '../LinkWrapper'

export const DaoCard = (props: DaoCardInfo) => {
  const { address: walletAddress } = useWallet(props.chainId)
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
      IconButtonLink={IconButtonLink}
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
