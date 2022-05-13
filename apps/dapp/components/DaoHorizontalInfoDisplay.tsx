import { LibraryIcon, UsersIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { Pencil } from '@dao-dao/icons'
import { HorizontalInfo, HorizontalInfoSection } from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { SuspenseLoader } from './SuspenseLoader'
import {
  daoSelector,
  proposalCount,
  tokenConfig,
  totalStaked,
} from '@/selectors/daos'

export interface DaoHorizontalInfoDisplayProps {
  contractAddress: string
}

const DaoHorizontalInfoDisplayInternal: FC<DaoHorizontalInfoDisplayProps> = ({
  contractAddress,
}) => {
  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const tokenInfo = useRecoilValue(tokenConfig(daoInfo?.gov_token))
  const stakedTotal = useRecoilValue(totalStaked(daoInfo?.staking_contract))
  const proposalsTotal = useRecoilValue(proposalCount(contractAddress))

  const stakedPercent = (
    (100 * stakedTotal) /
    Number(tokenInfo?.total_supply)
  ).toLocaleString(undefined, { maximumSignificantDigits: 3 })

  return (
    <HorizontalInfo>
      <HorizontalInfoSection>
        <UsersIcon className="inline w-4" />
        {convertMicroDenomToDenomWithDecimals(
          tokenInfo.total_supply,
          tokenInfo.decimals
        ).toLocaleString()}{' '}
        ${tokenInfo?.symbol} total supply
      </HorizontalInfoSection>
      <HorizontalInfoSection>
        <LibraryIcon className="inline w-4" />
        {stakedPercent}% ${tokenInfo?.symbol} staked
      </HorizontalInfoSection>
      <HorizontalInfoSection>
        <Pencil className="inline" fill="currentColor" />
        {proposalsTotal} proposals created
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
