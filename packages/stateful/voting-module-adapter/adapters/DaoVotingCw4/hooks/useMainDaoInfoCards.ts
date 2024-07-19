import { useTranslation } from 'react-i18next'

import { DaoInfoCard } from '@dao-dao/types'
import { isSecretNetwork } from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useLoadingVotingModule } from './useLoadingVotingModule'

export const useMainDaoInfoCards = (): DaoInfoCard[] => {
  const { t } = useTranslation()
  const { chainId, coreAddress } = useVotingModuleAdapterOptions()
  const votingModule = useLoadingVotingModule(coreAddress, {
    fetchMembers: true,
  })

  // Can't view members on Secret Network.
  return isSecretNetwork(chainId)
    ? []
    : [
        {
          label: t('title.members'),
          tooltip: t('info.membersTooltip'),
          loading: votingModule.loading,
          value: votingModule.loading
            ? undefined
            : votingModule.errored
            ? '<error>'
            : votingModule.data.members?.length ?? '<error>',
        },
      ]
}
