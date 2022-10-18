import { useTranslation } from 'react-i18next'

import { ProfileNewProposalCardAddress } from '@dao-dao/tstypes'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useVotingModule } from './useVotingModule'

export const useProfileNewProposalCardAddresses =
  (): ProfileNewProposalCardAddress[] => {
    const { t } = useTranslation()
    const { coreAddress } = useVotingModuleAdapterOptions()
    const { cw4GroupAddress } = useVotingModule(coreAddress)

    return [
      {
        label: t('info.groupAddress'),
        address: cw4GroupAddress,
      },
    ]
  }
