import { ChartPieIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { useGovernanceTokenInfo, useStakingInfo } from '@dao-dao/state'
import { CopyToClipboardAccent, GovInfoListItem } from '@dao-dao/ui'
import { humanReadableDuration } from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const DaoContractInfoContent = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo(coreAddress)
  const { stakingContractAddress, stakingContractConfig } =
    useStakingInfo(coreAddress)

  if (
    !governanceTokenAddress ||
    !governanceTokenInfo ||
    !stakingContractAddress ||
    !stakingContractConfig
  ) {
    throw new Error(t('errors.loadingData'))
  }

  return (
    <>
      <div className="mb-4 md:mb-0">
        <h2 className="mb-4 md:mb-6 primary-text">
          {t('title.votingConfiguration')}
        </h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2">
          <GovInfoListItem
            icon={<ChartPieIcon className="inline w-4" />}
            text={t('title.unstakingPeriod')}
            value={
              stakingContractConfig.unstaking_duration
                ? humanReadableDuration(
                    stakingContractConfig.unstaking_duration
                  )
                : 'None'
            }
          />
        </ul>
      </div>
      <div>
        <h2 className="mb-4 md:mb-6 primary-text">{t('title.addresses')}</h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2 caption-text">
          <li>
            {t('title.treasury')} <CopyToClipboardAccent value={coreAddress} />
          </li>
          <li>
            {t('title.governanceToken')}{' '}
            <CopyToClipboardAccent value={governanceTokenAddress} />
          </li>
          <li>
            {t('title.staking')}{' '}
            <CopyToClipboardAccent value={stakingContractAddress} />
          </li>
        </ul>
      </div>
    </>
  )
}
