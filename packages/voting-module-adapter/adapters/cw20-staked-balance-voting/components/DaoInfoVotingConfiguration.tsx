import { ChartPieIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { GovInfoListItem } from '@dao-dao/ui'
import { humanReadableDuration } from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useStakingInfo } from '../hooks'

export const DaoInfoVotingConfiguration = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { stakingContractConfig } = useStakingInfo(coreAddress)

  if (!stakingContractConfig) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <GovInfoListItem
      icon={<ChartPieIcon className="inline w-4" />}
      text={t('title.unstakingPeriod')}
      value={
        stakingContractConfig.unstaking_duration
          ? humanReadableDuration(stakingContractConfig.unstaking_duration)
          : 'None'
      }
    />
  )
}
