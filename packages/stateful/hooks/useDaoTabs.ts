import {
  AccountBalanceWalletOutlined,
  AccountBalanceWalletRounded,
  FiberSmartRecordOutlined,
  FiberSmartRecordRounded,
  HomeOutlined,
  HomeRounded,
  HowToVoteOutlined,
  HowToVoteRounded,
  QuestionMark,
  WebOutlined,
  WebRounded,
} from '@mui/icons-material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoTabId,
  DaoTabWithComponent,
  LoadingData,
  ModuleDisplayLocation,
} from '@dao-dao/types'

import {
  AppsTab,
  HomeTab,
  ProposalsTab,
  SubDaosTab,
  TreasuryTab,
} from '../components'
import { useModules } from '../modules'
import { useVotingModuleAdapter } from '../voting-module-adapter'

export const useDaoTabs = (): LoadingData<DaoTabWithComponent[]> => {
  const { t } = useTranslation()

  const {
    components: { extraTabs },
  } = useVotingModuleAdapter()

  // Get module tab components, if exist.
  const loadingModules = useModules({
    // Only load tab modules.
    location: ModuleDisplayLocation.Tab,
  })

  return useMemo(
    () => ({
      // Some tabs are ready right away, so just use the `updating` field to
      // indicate if more tabs are still loading.
      loading: false,
      updating: loadingModules.loading || loadingModules.updating,
      data: [
        {
          id: DaoTabId.Home,
          label: t('title.home'),
          Component: HomeTab,
          Icon: HomeOutlined,
          IconFilled: HomeRounded,
        },
        {
          id: DaoTabId.Proposals,
          label: t('title.proposals'),
          Component: ProposalsTab,
          Icon: HowToVoteOutlined,
          IconFilled: HowToVoteRounded,
        },
        {
          id: DaoTabId.Treasury,
          label: t('title.treasury'),
          Component: TreasuryTab,
          Icon: AccountBalanceWalletOutlined,
          IconFilled: AccountBalanceWalletRounded,
          lazy: true,
        },
        {
          id: DaoTabId.SubDaos,
          label: t('title.subDaos'),
          Component: SubDaosTab,
          Icon: FiberSmartRecordOutlined,
          IconFilled: FiberSmartRecordRounded,
        },
        ...(extraTabs?.map(({ labelI18nKey, ...tab }) => ({
          label: t(labelI18nKey),
          ...tab,
        })) ?? []),
        {
          id: DaoTabId.Apps,
          label: t('title.apps'),
          Component: AppsTab,
          Icon: WebOutlined,
          IconFilled: WebRounded,
        },
        ...(loadingModules.loading
          ? []
          : loadingModules.data.map(
              ({
                module: { id, title, Icon, IconFilled },
                ModuleComponent,
              }): DaoTabWithComponent => ({
                id,
                label: title,
                // Icon should always be defined for tab modules, but just in
                // case...
                Icon: Icon || QuestionMark,
                IconFilled: IconFilled || QuestionMark,
                Component: ModuleComponent,
              })
            )),
      ],
    }),
    [extraTabs, t, loadingModules]
  )
}
