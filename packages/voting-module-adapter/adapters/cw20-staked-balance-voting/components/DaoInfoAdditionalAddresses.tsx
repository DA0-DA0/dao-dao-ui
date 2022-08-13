import { useTranslation } from 'react-i18next'

import { CopyToClipboard } from '@dao-dao/ui'

import { useGovernanceTokenInfo, useStakingInfo } from '../hooks'

export const DaoInfoAdditionalAddresses = () => {
  const { t } = useTranslation()
  const { governanceTokenAddress } = useGovernanceTokenInfo()
  const { stakingContractAddress } = useStakingInfo()

  if (!governanceTokenAddress || !stakingContractAddress) {
    throw new Error(t('errors.loadingData'))
  }

  return (
    <>
      <p>{t('title.governanceToken')}</p>
      <CopyToClipboard value={governanceTokenAddress} />

      <p>{t('title.staking')}</p>
      <CopyToClipboard value={stakingContractAddress} />
    </>
  )
}
