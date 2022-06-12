import { FC } from 'react'
import { useRecoilState } from 'recoil'

import { useVotingModule } from '@dao-dao/state'
import {
  MobileHeaderLoader,
  MobileHeader as StatelessMobileHeader,
  SuspenseLoader,
} from '@dao-dao/ui'

import { pinnedAddressesAtom } from '@/atoms'
import { useOrgInfoContext } from '@/components'
import { addToken } from '@/util'

const OrgMobileHeaderInternal: FC = () => {
  const {
    coreAddress,
    governanceTokenAddress,
    name: orgName,
    imageUrl,
  } = useOrgInfoContext()
  const { isMember } = useVotingModule(coreAddress)

  const [pinnedAddresses, setPinnedAddresses] =
    useRecoilState(pinnedAddressesAtom)
  const pinned = pinnedAddresses.includes(coreAddress)

  return (
    <StatelessMobileHeader
      contractAddress={coreAddress}
      imageUrl={imageUrl ?? ''}
      member={isMember ?? false}
      name={orgName}
      onPin={() => {
        if (pinned) {
          setPinnedAddresses((p) => p.filter((a) => a !== coreAddress))
        } else {
          setPinnedAddresses((p) => p.concat([coreAddress]))
          governanceTokenAddress && addToken(governanceTokenAddress)
        }
      }}
      pinned={pinned}
    />
  )
}

export const OrgMobileHeader: FC = () => (
  <SuspenseLoader
    fallback={
      <MobileHeaderLoader contractAddress={useOrgInfoContext().coreAddress} />
    }
  >
    <OrgMobileHeaderInternal />
  </SuspenseLoader>
)
