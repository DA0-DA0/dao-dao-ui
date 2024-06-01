import {
  AccountBalanceWalletOutlined,
  AccountBalanceWalletRounded,
  FiberSmartRecordOutlined,
  FiberSmartRecordRounded,
  HowToVoteOutlined,
  HowToVoteRounded,
} from '@mui/icons-material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useChain } from '@dao-dao/stateless'
import { DaoTabId, DaoTabWithComponent, LoadingData } from '@dao-dao/types'
import { getSupportedChainConfig } from '@dao-dao/utils'

import {
  GovCommunityPoolTab,
  GovProposalsTab,
  GovSubDaosTab,
} from '../components/gov'

export const useGovDaoTabs = (): LoadingData<DaoTabWithComponent[]> => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()

  return useMemo(
    () => ({
      loading: false,
      updating: false,
      data: [
        {
          id: DaoTabId.Proposals,
          label: t('title.proposals'),
          Component: GovProposalsTab,
          Icon: HowToVoteOutlined,
          IconFilled: HowToVoteRounded,
        },
        {
          id: DaoTabId.Treasury,
          label: t('title.communityPool'),
          Component: GovCommunityPoolTab,
          Icon: AccountBalanceWalletOutlined,
          IconFilled: AccountBalanceWalletRounded,
          lazy: true,
        },
        // If SubDAOs exist, show them.
        ...(getSupportedChainConfig(chainId)?.subDaos?.length
          ? [
              {
                id: DaoTabId.SubDaos,
                label: t('title.subDaos'),
                Component: GovSubDaosTab,
                Icon: FiberSmartRecordOutlined,
                IconFilled: FiberSmartRecordRounded,
              },
            ]
          : []),
      ],
    }),
    [chainId, t]
  )
}
