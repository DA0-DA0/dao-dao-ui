import {
  ChainProvider,
  DaoCreatedModalProps,
  DaoCreatedModal as StatelessDaoCreatedModal,
} from '@dao-dao/stateless'
import { DaoSource, FollowState } from '@dao-dao/types'

import { useFollowingDaos } from '../hooks'
import { LinkWrapper } from './LinkWrapper'

export type StatefulDaoCreatedModalProps = Omit<
  DaoCreatedModalProps,
  'itemProps'
> & {
  itemProps: Omit<DaoCreatedModalProps['itemProps'], 'follow' | 'LinkWrapper'>
}

export const DaoCreatedModal = ({
  itemProps,
  ...props
}: StatefulDaoCreatedModalProps) => {
  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos()

  const followedDao: DaoSource = {
    chainId: itemProps.chainId,
    coreAddress: itemProps.coreAddress,
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
    <ChainProvider chainId={itemProps.chainId}>
      <StatelessDaoCreatedModal
        {...props}
        itemProps={{
          ...itemProps,

          follow,

          LinkWrapper,
        }}
      />
    </ChainProvider>
  )
}
