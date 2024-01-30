import { useTranslation } from 'react-i18next'

import { VotingModuleRelevantAddress } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useLoadingVotingModule } from './useLoadingVotingModule'

export const useVotingModuleRelevantAddresses =
  (): VotingModuleRelevantAddress[] => {
    const { t } = useTranslation()
    const { coreAddress } = useVotingModuleAdapterOptions()
    const votingModule = useLoadingVotingModule(coreAddress)

    return [
      {
        label: t('info.groupAddress'),
        address: votingModule.loading
          ? '...'
          : votingModule.errored
          ? '<error>'
          : votingModule.data.cw4GroupAddress,
      },
    ]
  }
