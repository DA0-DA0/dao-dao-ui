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

export interface MobileHeaderProps {
  contractAddress: string
}

const MobileHeaderInternal: FC<MobileHeaderProps> = ({ contractAddress }) => {
  const {
    governanceTokenAddress,
    name: orgName,
    imageUrl,
  } = useOrgInfoContext()
  const { walletStaked } = useStakingInfo(contractAddress, {
    fetchWalletStaked: true,
  })

  const [pinnedAddresses, setPinnedAddresses] =
    useRecoilState(pinnedAddressesAtom)
  const pinned = pinnedAddresses.includes(contractAddress)

  if (walletStaked === undefined) {
    throw new Error('Failed to load data.')
  }

  return (
    <StatelessMobileHeader
      contractAddress={contractAddress}
      imageUrl={imageUrl ?? ''}
      member={walletStaked > 0}
      name={orgName}
      onPin={() => {
        if (pinned) {
          setPinnedAddresses((p) => p.filter((a) => a !== contractAddress))
        } else {
          setPinnedAddresses((p) => p.concat([contractAddress]))
          addToken(governanceTokenAddress)
        }
      }}
      pinned={pinned}
    />
  )
}

export const MobileHeader: FC<MobileHeaderProps> = (props) => (
  <SuspenseLoader fallback={<MobileHeaderLoader {...props} />}>
    <MobileHeaderInternal {...props} />
  </SuspenseLoader>
)
