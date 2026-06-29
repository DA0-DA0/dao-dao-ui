import { useTranslation } from 'react-i18next'

import { VotingModuleRelevantAddress } from '@dao-dao/types'

import { useDaoGovernanceToken } from '../../../../hooks'

export const useVotingModuleRelevantAddresses =
  (): VotingModuleRelevantAddress[] => {
    const { t } = useTranslation()
    const token = useDaoGovernanceToken()

    return token
      ? [
          {
            label: t('title.nftCollection'),
            address: token.denomOrAddress,
          },
        ]
      : []
  }
