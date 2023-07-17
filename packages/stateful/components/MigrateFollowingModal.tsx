import { useWallet } from '@noahsaso/cosmodal'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { MigrateFollowingModal as StatelessMigrateFollowingModal } from '@dao-dao/stateless'
import { ChainId } from '@dao-dao/types'
import { MAINNET, processError } from '@dao-dao/utils'

import { useCfWorkerAuthPostRequest, useFollowingDaos } from '../hooks'
import { EntityDisplay } from './EntityDisplay'

const junoChainId = MAINNET ? ChainId.JunoMainnet : ChainId.JunoTestnet

// Migrate followed Juno DAOs.
export const MigrateFollowingModal = () => {
  const { daos, setFollowing, ready, updatingFollowing } =
    useFollowingDaos(junoChainId)

  const [oldFollowing, setOldFollowing] = useState([] as string[])
  const [loading, setLoading] = useState(false)
  const { address } = useWallet()
  useEffect(() => {
    if (!address) {
      return
    }

    ;(async () => {
      try {
        const { following } = await (
          await fetch(
            `https://following.daodao.zone/following/${junoChainId}/${address}`
          )
        ).json()

        if (following && Array.isArray(following) && following.length > 0) {
          setOldFollowing(following)
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [address])

  const { ready: postRequestReady, postRequest } = useCfWorkerAuthPostRequest(
    'https://following.daodao.zone',
    'Migrate Following'
  )

  return postRequestReady &&
    ready &&
    !daos.loading &&
    daos.data.length === 0 &&
    oldFollowing.length > 0 ? (
    <StatelessMigrateFollowingModal
      EntityDisplay={EntityDisplay}
      followedDaos={oldFollowing}
      migrating={updatingFollowing || loading}
      onMigrate={async () => {
        setLoading(true)
        try {
          await setFollowing(oldFollowing)
          await postRequest('/unfollow-all')
          setOldFollowing([])
        } catch (err) {
          console.error(err)
          toast.error(processError(err))
        } finally {
          setLoading(false)
        }
      }}
      visible
    />
  ) : null
}
