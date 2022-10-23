import { PeopleAltOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { DaoInfoBarItem } from '@dao-dao/stateless'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useVotingModule } from './useVotingModule'

export const useDaoInfoBarItems = (): DaoInfoBarItem[] => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { members } = useVotingModule(coreAddress, { fetchMembers: true })

  if (!members) {
    throw new Error(t('error.loadingData'))
  }

  return [
    {
      Icon: PeopleAltOutlined,
      label: t('title.members'),
      value: members.length,
    },
  ]
}
