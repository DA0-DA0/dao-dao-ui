import { LibraryIcon, UsersIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { Pencil } from '@dao-dao/icons'
import {
  useGovernanceTokenInfo,
  useProposalModule,
  useStakingInfo,
} from '@dao-dao/state'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { HorizontalInfo, HorizontalInfoSection } from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { SuspenseLoader } from './SuspenseLoader'

export interface DaoHorizontalInfoDisplayProps {
  contractAddress: string
}

const DaoHorizontalInfoDisplayInternal: FC<DaoHorizontalInfoDisplayProps> = ({
  contractAddress,
}) => {
  const config = useRecoilValue(configSelector({ contractAddress }))
  const { governanceTokenInfo } = useGovernanceTokenInfo(contractAddress)
  const { totalStaked } = useStakingInfo(contractAddress, {
    fetchTotalStaked: true,
  })
  const { proposalCount } = useProposalModule(contractAddress, {
    fetchProposalCount: true,
  })

  if (
    !config ||
    !governanceTokenInfo ||
    totalStaked === undefined ||
    proposalCount === undefined
  ) {
    throw new Error('Failed to load data.')
  }

  const stakedPercent = (
    (100 * totalStaked) /
    Number(governanceTokenInfo.total_supply)
  ).toLocaleString(undefined, { maximumSignificantDigits: 3 })

  return (
    <HorizontalInfo>
      <HorizontalInfoSection>
        <UsersIcon className="inline w-4" />
        {convertMicroDenomToDenomWithDecimals(
          governanceTokenInfo.total_supply,
          governanceTokenInfo.decimals
        ).toLocaleString()}{' '}
        ${governanceTokenInfo.symbol} total supply
      </HorizontalInfoSection>
      <HorizontalInfoSection>
        <LibraryIcon className="inline w-4" />
        {stakedPercent}% ${governanceTokenInfo.symbol} staked
      </HorizontalInfoSection>
      <HorizontalInfoSection>
        <Pencil className="inline" fill="currentColor" />
        {proposalCount} proposals created
      </HorizontalInfoSection>
    </HorizontalInfo>
  )
}

export const HorizontalInfoDisplayLoader: FC<{}> = () => (
  <HorizontalInfo>
    <HorizontalInfoSection>{undefined}</HorizontalInfoSection>
  </HorizontalInfo>
)

export const DaoHorizontalInfoDisplay: FC<DaoHorizontalInfoDisplayProps> = (
  props
) => (
  <SuspenseLoader fallback={<HorizontalInfoDisplayLoader />}>
    <DaoHorizontalInfoDisplayInternal {...props} />
  </SuspenseLoader>
)
