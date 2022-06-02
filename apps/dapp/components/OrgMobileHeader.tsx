import { FC } from 'react'
import { useRecoilState } from 'recoil'

import { useVotingModule } from '@dao-dao/state'
import {
  MobileHeader as StatelessMobileHeader,
  MobileHeaderLoader,
} from '@dao-dao/ui'

import { useOrgInfoContext } from './OrgPageWrapper'
import { SuspenseLoader } from './SuspenseLoader'
import { pinnedAddressesAtom } from '@/atoms/pinned'
import { addToken } from '@/util/addToken'

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
