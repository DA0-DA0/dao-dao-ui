import {
  ChainProvider,
  DaoCreatedModalProps,
  DaoCreatedModal as StatelessDaoCreatedModal,
} from '@dao-dao/stateless'

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
    useFollowingDaos(itemProps.chainId)

  return (
    <ChainProvider chainId={itemProps.chainId}>
      <StatelessDaoCreatedModal
        {...props}
        itemProps={{
          ...itemProps,

          follow: {
            following: isFollowing(itemProps.coreAddress),
            updatingFollowing,
            onFollow: () =>
              isFollowing(itemProps.coreAddress)
                ? setUnfollowing(itemProps.coreAddress)
                : setFollowing(itemProps.coreAddress),
          },

          LinkWrapper,
        }}
      />
    </ChainProvider>
  )
}
