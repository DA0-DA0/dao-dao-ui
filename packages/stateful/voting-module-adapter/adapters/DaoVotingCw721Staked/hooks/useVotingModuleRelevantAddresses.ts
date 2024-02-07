import { useTranslation } from 'react-i18next'

import { VotingModuleRelevantAddress } from '@dao-dao/types'

import { useGovernanceCollectionInfo } from './useGovernanceCollectionInfo'

export const useVotingModuleRelevantAddresses =
  (): VotingModuleRelevantAddress[] => {
    const { t } = useTranslation()

    const {
      stakingContractAddress,
      collectionAddress: governanceTokenAddress,
    } = useGovernanceCollectionInfo()

    return [
      {
        label: t('info.govNftCollection'),
        address: governanceTokenAddress,
      },
      {
        label: t('info.stakingAddress'),
        address: stakingContractAddress,
      },
    ]
  }
