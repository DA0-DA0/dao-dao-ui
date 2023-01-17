import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useSetRecoilState } from 'recoil'

import { refreshFollowingDaosAtom } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'
import {
  CHAIN_ID,
  FOLLOWING_DAOS_API_BASE,
  loadableToLoadingData,
  processError,
} from '@dao-dao/utils'

import { followingDaosSelector } from '../recoil/selectors/dao/following'
import { useCfWorkerAuthPostRequest } from './useCfWorkerAuthPostRequest'

export type UseFollowingDaosReturn = {
  daos: LoadingData<{
    following: string[]
    pending: string[]
  }>
  refreshFollowing: () => void
  isFollowing: (coreAddress: string) => any
  setFollowing: (coreAddress: string) => Promise<void>
  setUnfollowing: (coreAddress: string) => Promise<void>
  updatingFollowing: boolean
}

export const useFollowingDaos = (): UseFollowingDaosReturn => {
  const followingDaosLoadable = loadableToLoadingData(
    useCachedLoadable(followingDaosSelector({})),
    { following: [], pending: [] }
  )

  const setRefreshFollowingDaos = useSetRecoilState(refreshFollowingDaosAtom)
  const refreshFollowing = useCallback(
    () => setRefreshFollowingDaos((id) => id + 1),
    [setRefreshFollowingDaos]
  )

  const isFollowing = useCallback(
    (coreAddress: string) =>
      !followingDaosLoadable.loading &&
      followingDaosLoadable.data.following.includes(coreAddress),
    [followingDaosLoadable]
  )

  const [updating, setUpdating] = useState(false)
  const { ready, postRequest } = useCfWorkerAuthPostRequest(
    FOLLOWING_DAOS_API_BASE,
    'Update Following'
  )

  const setFollowing = useCallback(
    async (coreAddress: string) => {
      if (!ready || updating) {
        return
      }

      setUpdating(true)

      try {
        await postRequest(`/follow/${CHAIN_ID}/${coreAddress}`)
        refreshFollowing()
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        setUpdating(false)
      }
    },
    [postRequest, ready, refreshFollowing, updating]
  )

  const setUnfollowing = useCallback(
    async (coreAddress: string) => {
      if (!ready || updating) {
        return
      }

      setUpdating(true)

      try {
        await postRequest(`/unfollow/${CHAIN_ID}/${coreAddress}`)
        refreshFollowing()
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        setUpdating(false)
      }
    },
    [postRequest, ready, refreshFollowing, updating]
  )

  return {
    daos: followingDaosLoadable,
    refreshFollowing,
    isFollowing,
    setFollowing,
    setUnfollowing,
    updatingFollowing: updating,
  }
}
