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
  WidgetLocation,
} from '@dao-dao/types'

import {
  AppsTab,
  HomeTab,
  ProposalsTab,
  SubDaosTab,
  TreasuryTab,
} from '../components'
import { useVotingModuleAdapter } from '../voting-module-adapter'
import { useWidgets } from '../widgets'

export const useDaoTabs = (): LoadingData<DaoTabWithComponent[]> => {
  const { t } = useTranslation()

  const {
    components: { extraTabs },
  } = useVotingModuleAdapter()

  // Get widget tab components, if exist.
  const loadingWidgets = useWidgets({
    // Only load tab widgets.
    location: WidgetLocation.Tab,
  })

  return useMemo(
    () => ({
      // Some tabs are ready right away, so just use the `updating` field to
      // indicate if more tabs are still loading.
      loading: false,
      updating: loadingWidgets.loading || loadingWidgets.updating,
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
        ...(loadingWidgets.loading
          ? []
          : loadingWidgets.data.map(
              ({
                title,
                widget: { id, Icon, IconFilled },
                WidgetComponent,
              }): DaoTabWithComponent => ({
                id,
                label: title,
                // Icon should always be defined for tab widgets, but just in case...
                Icon: Icon || QuestionMark,
                IconFilled: IconFilled || QuestionMark,
                Component: WidgetComponent,
              })
            )),
      ],
    }),
    [extraTabs, t, loadingWidgets]
  )
}
