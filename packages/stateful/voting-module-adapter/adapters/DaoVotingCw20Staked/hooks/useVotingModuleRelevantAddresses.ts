import { useTranslation } from 'react-i18next'

import { VotingModuleRelevantAddress } from '@dao-dao/types'

import { useGovernanceTokenInfo } from './useGovernanceTokenInfo'

export const useVotingModuleRelevantAddresses =
  (): VotingModuleRelevantAddress[] => {
    const { t } = useTranslation()

    const { governanceToken, stakingContractAddress } = useGovernanceTokenInfo()

    return [
      {
        label: t('info.govTokenAddress'),
        address: governanceToken.denomOrAddress,
      },
      {
        label: t('info.stakingAddress'),
        address: stakingContractAddress,
      },
    ]
  }
