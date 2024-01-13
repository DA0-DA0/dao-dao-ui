import { PeopleAltOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { DaoInfoBarItem } from '@dao-dao/stateless'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useLoadingVotingModule } from './useLoadingVotingModule'

export const useDaoInfoBarItems = (): DaoInfoBarItem[] => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const votingModule = useLoadingVotingModule(coreAddress, {
    fetchMembers: true,
  })

  return [
    {
      Icon: PeopleAltOutlined,
      label: t('title.members'),
      loading: votingModule.loading,
      value: votingModule.loading
        ? undefined
        : votingModule.errored
        ? '<error>'
        : votingModule.data.members?.length ?? '<error>',
    },
  ]
}
