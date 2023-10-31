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

import { useAppContext } from '@dao-dao/stateless'
import {
  DaoPageMode,
  DaoTabId,
  DaoTabWithComponent,
  LoadingData,
  WidgetLocation,
} from '@dao-dao/types'

import {
  AppsTab,
  DaoWidgets,
  ProposalsTab,
  SdaDaoHome,
  SubDaosTab,
  TreasuryAndNftsTab,
} from '../components'
import { useVotingModuleAdapter } from '../voting-module-adapter'
import { useWidgets } from '../widgets'

export type UseDaoTabsOptions = {
  // If defined, will override the default suspendWhileLoading behavior of the
  // DAO home widgets.
  suspendWhileLoadingOverride?: boolean
}

export const useDaoTabs = ({
  suspendWhileLoadingOverride,
}: UseDaoTabsOptions = {}): LoadingData<DaoTabWithComponent[]> => {
  const { t } = useTranslation()

  const { mode } = useAppContext()
  const {
    components: { extraTabs },
  } = useVotingModuleAdapter()

  // Get widget tab components, if exist.
  const loadingWidgets = useWidgets({
    // Only load tab widgets.
    location: WidgetLocation.Tab,
  })

  // Add home tab with widgets if any widgets exist.
  const loadingDaoHomeWidgets = useWidgets({
    // In dApp, load widgets before rendering to decide if home with widgets is
    // shown so that we know to select home by default when present. In SDA, no
    // need to load widgets before rendering since the home is always shown.
    suspendWhileLoading:
      suspendWhileLoadingOverride ?? mode === DaoPageMode.Dapp,
    // Only load home widgets.
    location: WidgetLocation.Home,
  })
  const hasHomeWidgets =
    !loadingDaoHomeWidgets.loading && loadingDaoHomeWidgets.data.length > 0

  const HomeTab =
    mode === DaoPageMode.Sda
      ? SdaDaoHome
      : mode === DaoPageMode.Dapp && hasHomeWidgets
      ? DaoWidgets
      : undefined

  const tabs = useMemo(
    () => [
      ...(HomeTab
        ? [
            {
              id: DaoTabId.Home,
              label: t('title.home'),
              Component: HomeTab,
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
    [HomeTab, extraTabs, t, loadingWidgets]
  )

  const updating =
    loadingWidgets.loading ||
    loadingWidgets.updating ||
    loadingDaoHomeWidgets.loading ||
    loadingDaoHomeWidgets.updating

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
