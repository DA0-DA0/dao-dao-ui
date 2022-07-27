import { useDaoInfoContext } from '@dao-dao/common'
import { useVotingModule } from '@dao-dao/state'
import {
  MobileHeaderLoader,
  MobileHeader as StatelessMobileHeader,
  SuspenseLoader,
} from '@dao-dao/ui'

import { usePinnedDAOs } from '@/hooks'

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

  const { isPinned, setPinned, setUnpinned } = usePinnedDAOs()
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
