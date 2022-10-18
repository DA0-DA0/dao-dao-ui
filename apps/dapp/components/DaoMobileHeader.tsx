// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { SuspenseLoader } from '@dao-dao/common'
import { usePinnedDaos, useVotingModule } from '@dao-dao/state'
import {
  MobileHeaderLoader,
  MobileHeader as StatelessMobileHeader,
  useDaoInfoContext,
} from '@dao-dao/ui'

export const DaoMobileHeader = () => (
  <SuspenseLoader
    fallback={
      <MobileHeaderLoader contractAddress={useDaoInfoContext().coreAddress} />
    }
  >
    <DaoMobileHeaderInternal />
  </SuspenseLoader>
)

const DaoMobileHeaderInternal = () => {
  const { coreAddress, name, imageUrl } = useDaoInfoContext()
  const { isMember } = useVotingModule(coreAddress, { fetchMembership: true })

  const { isPinned, setPinned, setUnpinned } = usePinnedDaos()
  const pinned = isPinned(coreAddress)

  return (
    <StatelessMobileHeader
      contractAddress={coreAddress}
      imageUrl={imageUrl ?? ''}
      member={isMember ?? false}
      name={name}
      onPin={() => {
        if (pinned) {
          setUnpinned(coreAddress)
        } else {
          setPinned(coreAddress)
        }
      }}
      pinned={pinned}
    />
  )
}
