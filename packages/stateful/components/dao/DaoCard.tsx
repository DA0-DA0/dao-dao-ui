import { useRecoilValue } from 'recoil'

import { mountedInBrowserAtom } from '@dao-dao/state/recoil'
import {
  DaoCard as StatelessDaoCard,
  useLoadingPromise,
} from '@dao-dao/stateless'
import { DaoSource } from '@dao-dao/types'
import {
  FollowState,
  StatefulDaoCardProps,
} from '@dao-dao/types/components/DaoCard'

import { useDaoClient, useFollowingDaos, useMembership } from '../../hooks'
import { LinkWrapper } from '../LinkWrapper'

export const DaoCard = (props: StatefulDaoCardProps) => {
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)

  const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
    useFollowingDaos()

  const { dao } = useDaoClient({
    dao: props.info,
  })
  const { isMember } = useMembership({
    dao: props.info,
  })
  const lazyData = useLoadingPromise({
    promise: () => dao.getDaoCardLazyData(),
    // Refresh if DAO changes.
    deps: [dao],
  })

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
      isMember={isMember}
      lazyData={lazyData}
      showParentDao={
        /*
         * Hide the parent DAO until the app is mounted in the browser since
         * rendering it on the server causes a hydration error for some horrible
         * reason. I think it has something to do with the fact that you're not
         * supposed to nest an A tag inside of another A tag, and maybe the
         * Next.js server is sanitizing it or something. Anyways, rip.
         */
        mountedInBrowser
      }
    />
  )
}
