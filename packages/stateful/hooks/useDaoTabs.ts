import {
  AccountBalanceWalletOutlined,
  FiberSmartRecordOutlined,
  HomeOutlined,
  HowToVoteOutlined,
  QuestionMark,
  WebOutlined,
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
  TreasuryAndNftsTab,
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

  const tabs = useMemo(
    () => [
      {
        id: DaoTabId.Home,
        label: t('title.home'),
        Component: HomeTab,
        Icon: HomeOutlined,
      },
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
        id: DaoTabId.SubDaos,
        label: t('title.subDaos'),
        Component: SubDaosTab,
        Icon: FiberSmartRecordOutlined,
      },
      {
        id: DaoTabId.Apps,
        label: t('title.apps'),
        Component: AppsTab,
        Icon: WebOutlined,
      },
      ...(extraTabs?.map(({ labelI18nKey, ...tab }) => ({
        label: t(labelI18nKey),
        ...tab,
      })) ?? []),
      ...(loadingWidgets.loading
        ? []
        : loadingWidgets.data.map(
            ({
              title,
              widget: { id, Icon },
              WidgetComponent,
            }): DaoTabWithComponent => ({
              id,
              label: title,
              // Icon should always be defined for tab widgets, but just in case...
              Icon: Icon || QuestionMark,
              Component: WidgetComponent,
            })
          )),
    ],
    [extraTabs, t, loadingWidgets]
  )

  const updating = loadingWidgets.loading || loadingWidgets.updating

  return useMemo(
    () => ({
      // Some tabs are ready right away, so just use the `updating` field to
      // indicate if more tabs are still loading.
      loading: false,
      updating,
      data: tabs,
    }),
    [updating, tabs]
  )
}
