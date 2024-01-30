import { useTranslation } from 'react-i18next'

import { VotingModuleRelevantAddress } from '@dao-dao/types'

import { useGovernanceTokenInfo } from './useGovernanceTokenInfo'

export const useVotingModuleRelevantAddresses =
  (): VotingModuleRelevantAddress[] => {
    const { t } = useTranslation()

    const { stakingContractAddress, governanceTokenAddress } =
      useGovernanceTokenInfo()

    return [
      {
        label: t('info.govTokenAddress'),
        address: governanceTokenAddress,
      },
      {
        label: t('info.stakingAddress'),
        address: stakingContractAddress,
      },
    ]
  }
