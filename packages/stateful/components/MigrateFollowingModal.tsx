import { useWallet } from '@noahsaso/cosmodal'
import { useEffect, useState } from 'react'

import { MigrateFollowingModal as StatelessMigrateFollowingModal } from '@dao-dao/stateless'
import { CHAIN_ID } from '@dao-dao/utils'

import { useFollowingDaos } from '../hooks'
import { EntityDisplay } from './EntityDisplay'

export const MigrateFollowingModal = () => {
  const { daos, setFollowing, ready, updatingFollowing } = useFollowingDaos()

  const [oldFollowing, setOldFollowing] = useState([] as string[])
  const { address } = useWallet()
  useEffect(() => {
    if (!address) {
      return
    }

    ;(async () => {
      try {
        const { following } = await (
          await fetch(
            `https://following.daodao.zone/following/${CHAIN_ID}/${address}`
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

  return ready &&
    !daos.loading &&
    daos.data.length === 0 &&
    oldFollowing.length > 0 ? (
    <StatelessMigrateFollowingModal
      EntityDisplay={EntityDisplay}
      followedDaos={oldFollowing}
      onMigrate={async () =>
        (await setFollowing(oldFollowing)) && setOldFollowing([])
      }
      syncing={updatingFollowing}
      visible
    />
  ) : null
}
