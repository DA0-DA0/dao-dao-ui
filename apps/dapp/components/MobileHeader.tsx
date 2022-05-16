import { FC } from 'react'
import { useRecoilState } from 'recoil'

import { useStakingInfo } from '@dao-dao/state'
import {
  MobileHeader as StatelessMobileHeader,
  MobileHeaderLoader,
} from '@dao-dao/ui'

import { useOrgInfoContext } from './OrgPageWrapper'
import { SuspenseLoader } from './SuspenseLoader'
import { pinnedAddressesAtom } from '@/atoms/pinned'
import { addToken } from '@/util/addToken'

const MobileHeaderInternal: FC = () => {
  const {
    coreAddress,
    governanceTokenAddress,
    name: orgName,
    imageUrl,
  } = useOrgInfoContext()
  const { walletStaked } = useStakingInfo(coreAddress, {
    fetchWalletStaked: true,
  })

  const [pinnedAddresses, setPinnedAddresses] =
    useRecoilState(pinnedAddressesAtom)
  const pinned = pinnedAddresses.includes(coreAddress)

  if (walletStaked === undefined) {
    throw new Error('Failed to load data.')
  }

  return (
    <StatelessMobileHeader
      contractAddress={coreAddress}
      imageUrl={imageUrl ?? ''}
      member={walletStaked > 0}
      name={orgName}
      onPin={() => {
        if (pinned) {
          setPinnedAddresses((p) => p.filter((a) => a !== coreAddress))
        } else {
          setPinnedAddresses((p) => p.concat([coreAddress]))
          addToken(governanceTokenAddress)
        }
      }}
      pinned={pinned}
    />
  )
}

export const MobileHeader: FC = () => (
  <SuspenseLoader
    fallback={
      <MobileHeaderLoader contractAddress={useOrgInfoContext().coreAddress} />
    }
  >
    <MobileHeaderInternal />
  </SuspenseLoader>
)
