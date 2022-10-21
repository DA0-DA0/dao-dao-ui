import { useTranslation } from 'react-i18next'

import { ProfileNewProposalCardAddress } from '@dao-dao/types'

import { useGovernanceTokenInfo } from './useGovernanceTokenInfo'

export const useProfileNewProposalCardAddresses =
  (): ProfileNewProposalCardAddress[] => {
    const { t } = useTranslation()

    const { stakingContractAddress, governanceTokenAddress } =
      useGovernanceTokenInfo()

    return [
      {
        label: t('info.stakingAddress'),
        address: stakingContractAddress,
      },
      {
        label: t('info.govTokenAddress'),
        address: governanceTokenAddress,
      },
    ]
  }
