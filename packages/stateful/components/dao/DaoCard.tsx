import { useWallet } from '@noahsaso/cosmodal'

import {
  DaoCard as StatelessDaoCard,
  useCachedLoading,
} from '@dao-dao/stateless'
import { DaoCardInfo } from '@dao-dao/types/stateless/DaoCard'
import { CHAIN_ID } from '@dao-dao/utils'

import { useFollowingDaos } from '../../hooks'
import { daoCardInfoLazyDataSelector } from '../../recoil'
import { IconButtonLink } from '../IconButtonLink'
import { LinkWrapper } from '../LinkWrapper'

export const DaoCard = (props: DaoCardInfo) => {
  const { address: walletAddress } = useWallet()
  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos()

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
      lazyData={lazyData}
    />
  )
}
