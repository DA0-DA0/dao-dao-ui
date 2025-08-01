import uniq from 'lodash.uniq'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState, waitForAll } from 'recoil'

import {
  followingDaosSelector,
  refreshFollowingDaosAtom,
  temporaryFollowingDaosAtom,
} from '@dao-dao/state'
import { useCachedLoadingWithError, useUpdatingRef } from '@dao-dao/stateless'
import { DaoSource } from '@dao-dao/types'
import {
  FOLLOWING_DAOS_PREFIX,
  daoSourcesEqual,
  processError,
  serializeDaoSource,
} from '@dao-dao/utils'

import { useManageProfile } from './useManageProfile'
import { useKvpkClient } from './usePfpkClient'
import { useProfile } from './useProfile'

export type UseFollowingDaosReturn = {
  isFollowing: (dao: DaoSource) => boolean
  setFollowing: (dao: DaoSource) => Promise<boolean>
  setUnfollowing: (dao: DaoSource) => Promise<boolean>
  updatingFollowing: boolean
}

export const useFollowingDaos = (): UseFollowingDaosReturn => {
  const { t } = useTranslation()

  const { connected, connecting, uniquePublicKeys } = useProfile()
  const { profile, addChains } = useManageProfile()

  // Following API doesn't update right away, so this serves to keep track of
  // all successful updates for the current session. This will be reset on page
  // refresh.
  const setTemporary = useSetRecoilState(temporaryFollowingDaosAtom)

  const followingDaosLoading = useCachedLoadingWithError(
    uniquePublicKeys.loading
      ? undefined
      : waitForAll(
          uniquePublicKeys.data.map(({ publicKey }) =>
            followingDaosSelector({
              walletPublicKey: publicKey,
            })
          )
        )
  )

  const setRefreshFollowingDaos = useSetRecoilState(refreshFollowingDaosAtom)
  const refreshFollowing = useCallback(
    () => setRefreshFollowingDaos((id) => id + 1),
    [setRefreshFollowingDaos]
  )

  const isFollowing = useMemo(() => {
    // Construct set of following DAOs so we can check existence quickly.
    const followingDaosSet = new Set(
      followingDaosLoading.loading || followingDaosLoading.errored
        ? []
        : followingDaosLoading.data.flat().map(serializeDaoSource)
    )

    return (dao: DaoSource) => followingDaosSet.has(serializeDaoSource(dao))
  }, [followingDaosLoading])

  const [updating, setUpdating] = useState(false)
  const { isWalletConnected, kvpkClient } = useKvpkClient({
    defaultSignatureType: 'Update Following',
    keyPrefix: FOLLOWING_DAOS_PREFIX,
  })

  // Turn this into a reference so we can use it in `setFollowing` without
  // memoizing.
  const addChainsRef = useUpdatingRef(addChains)

  const setFollowing = useCallback(
    async (dao: DaoSource) => {
      const addChains = addChainsRef.current

      if (!isWalletConnected || profile.loading || !addChains.ready) {
        toast.error(t('error.logInToFollow'))
        return false
      }
      if (updating || addChains.status !== 'idle') {
        return false
      }

      setUpdating(true)
      try {
        // If DAO's chain not added to profile, add it so that we know to load
        // followed DAOs from the public key on this chain later.
        if (!profile.data.chains[dao.chainId]) {
          await addChains.go([dao.chainId])
        }

        const serializedDaoSource = serializeDaoSource(dao)

        await kvpkClient.set({
          key: serializedDaoSource,
          value: 1,
          // Use DAO chain ID for following state to ensure we use the same
          // chain ID when following and unfollowing the DAO.
          chainId: dao.chainId,
        })

        setTemporary((prev) => ({
          // Add to the tmp list of followed DAOs.
          following: uniq([...prev.following, serializedDaoSource]),
          // Remove from the tmp list of unfollowed DAOs.
          unfollowing: prev.unfollowing.filter(
            (unfollowed) => unfollowed !== serializedDaoSource
          ),
        }))

        refreshFollowing()

        return true
      } catch (err) {
        console.error(err)
        toast.error(processError(err))

        return false
      } finally {
        setUpdating(false)
      }
    },
    [
      addChainsRef,
      isWalletConnected,
      kvpkClient,
      profile,
      refreshFollowing,
      setTemporary,
      t,
      updating,
    ]
  )

  const setUnfollowing = useCallback(
    async (dao: DaoSource) => {
      if (!isWalletConnected) {
        toast.error(t('error.logInToFollow'))
        return false
      }
      if (updating) {
        return false
      }

      setUpdating(true)

      try {
        // Try to find which public key is following this DAO and use a chain ID
        // for unfollowing with that same public key. By default we follow from
        // the chain the DAO is on, so this is for backwards compatibilty in
        // case some follows are stuck on another public key. We have to
        // unfollow using the same public key that followed since keys are
        // stored under the signing public key.
        const followingPublicKeyIndex =
          followingDaosLoading.loading || followingDaosLoading.errored
            ? undefined
            : followingDaosLoading.data.findIndex((follows) =>
                follows.some((f) => daoSourcesEqual(f, dao))
              )
        const unfollowChainId =
          (uniquePublicKeys.loading ||
          followingPublicKeyIndex === undefined ||
          followingPublicKeyIndex === -1
            ? undefined
            : uniquePublicKeys.data[followingPublicKeyIndex]?.chains[0]
                ?.chainId) ||
          // Fallback to DAO chain ID since this will most likely be the right
          // chain.
          dao.chainId

        const serializedDaoSource = serializeDaoSource(dao)

        await kvpkClient.delete({
          key: serializedDaoSource,
          chainId: unfollowChainId,
        })

        setTemporary((prev) => ({
          // Remove from the tmp list of followed DAOs.
          following: prev.following.filter(
            (followed) => followed !== serializedDaoSource
          ),
          // Add to the tmp list of unfollowed DAOs.
          unfollowing: uniq([...prev.unfollowing, serializedDaoSource]),
        }))

        refreshFollowing()

        return true
      } catch (err) {
        console.error(err)
        toast.error(processError(err))

        return false
      } finally {
        setUpdating(false)
      }
    },
    [
      followingDaosLoading,
      isWalletConnected,
      kvpkClient,
      refreshFollowing,
      setTemporary,
      t,
      uniquePublicKeys,
      updating,
    ]
  )

  return {
    isFollowing,
    setFollowing,
    setUnfollowing,
    updatingFollowing:
      // If wallet connecting, following is not yet loaded.
      connecting ||
      // Updating if wallet connected and following is loading or update is in
      // progress.
      (connected && (followingDaosLoading.loading || updating)),
  }
}
