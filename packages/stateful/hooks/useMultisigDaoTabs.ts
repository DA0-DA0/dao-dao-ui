import {
  AccountBalanceWalletOutlined,
  AccountBalanceWalletRounded,
} from '@mui/icons-material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoTabId, DaoTabWithComponent, LoadingData } from '@dao-dao/types'

import { MultisigTreasuryTab } from '../components'

export const useMultisigDaoTabs = (): LoadingData<DaoTabWithComponent[]> => {
  const { t } = useTranslation()

  return useMemo(
    () => ({
      loading: false,
      updating: false,
      data: [
        // {
        //   id: DaoTabId.Proposals,
        //   label: t('title.proposals'),
        //   Component: GovProposalsTab,
        //   Icon: HowToVoteOutlined,
        //   IconFilled: HowToVoteRounded,
        // },
        {
          id: DaoTabId.Treasury,
          label: t('title.treasury'),
          Component: MultisigTreasuryTab,
          Icon: AccountBalanceWalletOutlined,
          IconFilled: AccountBalanceWalletRounded,
          lazy: true,
        },
        // {
        //   id: DaoTabId.Members,
        //   label: t('title.members'),
        //   Component: MultisigTreasuryTab,
        //   Icon: AccountBalanceWalletOutlined,
        //   IconFilled: AccountBalanceWalletRounded,
        //   lazy: true,
        // },
      ],
    }),
    [t]
  )
}
