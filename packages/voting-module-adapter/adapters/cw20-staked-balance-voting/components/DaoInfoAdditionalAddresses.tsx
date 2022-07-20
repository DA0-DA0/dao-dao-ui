import { useTranslation } from 'react-i18next'

import { useGovernanceTokenInfo, useStakingInfo } from '@dao-dao/state'
import { CopyToClipboard } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const DaoInfoAdditionalAddresses = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { governanceTokenAddress } = useGovernanceTokenInfo(coreAddress)
  const { stakingContractAddress } = useStakingInfo(coreAddress)

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
