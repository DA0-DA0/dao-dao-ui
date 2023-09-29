import {
  AccountBalanceWalletOutlined,
  FiberSmartRecordOutlined,
  HomeOutlined,
  HowToVoteOutlined,
  WebOutlined,
} from '@mui/icons-material'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/stateless'
import { DaoTabId, DaoTabWithComponent, WidgetLocation } from '@dao-dao/types'

import {
  BrowserTab,
  ProposalsTab,
  SubDaosTab,
  TreasuryAndNftsTab,
} from '../components'
import { useVotingModuleAdapter } from '../voting-module-adapter'
import { useWidgets } from '../widgets'

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
  const { items } = useDaoInfoContext()

  // Get widget tab components, if exist.
  const loadingWidgets = useWidgets({
    // Only load tab widgets.
    location: WidgetLocation.Tab,
  })
  const widgetTabs = loadingWidgets.loading
    ? []
    : loadingWidgets.data.map(
        ({
          title,
          widget: { id, Icon },
          WidgetComponent,
        }): DaoTabWithComponent => ({
          id,
          label: title,
          Icon,
          Component: WidgetComponent,
        })
      )

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
      id: DaoTabId.SubDaos,
      label: t('title.subDaos'),
      Component: SubDaosTab,
      Icon: FiberSmartRecordOutlined,
    },
    // Experimental Browser tab must be enabled through the DAO.
    ...('browserEnabled' in items && items.browserEnabled === 'true'
      ? [
          {
            id: DaoTabId.Browser,
            label: t('title.browser'),
            Component: BrowserTab,
            Icon: WebOutlined,
          },
        ]
      : []),
    ...(extraTabs?.map(({ labelI18nKey, ...tab }) => ({
      label: t(labelI18nKey),
      ...tab,
    })) ?? []),
    ...widgetTabs,
  ]
}
