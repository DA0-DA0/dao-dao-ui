import { ClockIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { GovInfoListItem } from '@dao-dao/ui'
import { humanReadableDuration } from '@dao-dao/utils'

import { useStakingInfo } from '../hooks'

export const DaoInfoVotingConfiguration = () => {
  const { t } = useTranslation()
  const { unstakingDuration } = useStakingInfo()

  return (
    <GovInfoListItem
      icon={<ClockIcon className="inline w-4" />}
      text={t('title.unstakingPeriod')}
      value={
        unstakingDuration ? humanReadableDuration(unstakingDuration) : 'None'
      }
    />
  )
}
