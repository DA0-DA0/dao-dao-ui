import {
  AccountBalanceWalletOutlined,
  FiberSmartRecordOutlined,
  HomeOutlined,
  HowToVoteOutlined,
  PaidOutlined,
} from '@mui/icons-material'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoTabId, DaoTabWithComponent } from '@dao-dao/types'

import { ProposalsTab, SubDaosTab, TreasuryAndNftsTab } from '../components'
import { usePayrollAdapter } from '../payroll'
import { useVotingModuleAdapter } from '../voting-module-adapter'

export type UseDaoTabsOptions = {
  includeHome?: ComponentType
}

export const useDaoTabs = ({
  includeHome,
}: UseDaoTabsOptions = {}): DaoTabWithComponent[] => {
  const { t } = useTranslation()

  const {
    components: { extraTabs },
  } = useVotingModuleAdapter()

  // Get payroll tab component, if exists.
  const PayrollTab = usePayrollAdapter()?.PayrollTab

  return [
    ...(includeHome
      ? [
          {
            id: DaoTabId.Home,
            label: t('title.home'),
            Component: includeHome,
            Icon: HomeOutlined,
          },
        ]
      : []),
    {
      id: DaoTabId.Proposals,
      label: t('title.proposals'),
      Component: ProposalsTab,
      Icon: HowToVoteOutlined,
    },
    {
      id: DaoTabId.Treasury,
      label: t('title.treasuryAndNfts'),
      Component: TreasuryAndNftsTab,
      Icon: AccountBalanceWalletOutlined,
    },
    {
      id: DaoTabId.Subdaos,
      label: t('title.subDaos'),
      Component: SubDaosTab,
      Icon: FiberSmartRecordOutlined,
    },
    ...(extraTabs?.map(({ labelI18nKey, ...tab }) => ({
      label: t(labelI18nKey),
      ...tab,
    })) ?? []),
    ...(PayrollTab
      ? [
          {
            id: DaoTabId.Payroll,
            label: t('title.payroll'),
            Component: PayrollTab,
            Icon: PaidOutlined,
          },
        ]
      : []),
  ]
}
