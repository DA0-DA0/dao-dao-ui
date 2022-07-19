import { CashIcon, ChartPieIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Votes } from '@dao-dao/icons'
import { useGovernanceTokenInfo, useStakingInfo } from '@dao-dao/state'
import { CopyToClipboardAccent, GovInfoListItem } from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
} from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { BaseDaoContractInfoContentProps } from '../../../types'

export const DaoContractInfoContent = ({
  threshold,
  quorum,
  depositInfo,
}: BaseDaoContractInfoContentProps) => {
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
          <GovInfoListItem
            icon={<Votes fill="currentColor" width="16px" />}
            text={t('title.passingThreshold')}
            value={threshold}
          />
          {quorum && (
            <GovInfoListItem
              icon={<Votes fill="currentColor" width="16px" />}
              text={t('title.quorum')}
              value={quorum}
            />
          )}
          {depositInfo && (
            <>
              <GovInfoListItem
                icon={<Votes fill="currentColor" width="16px" />}
                text={t('title.proposalDeposit')}
                value={`${convertMicroDenomToDenomWithDecimals(
                  depositInfo.deposit,
                  governanceTokenInfo.decimals
                )} $${governanceTokenInfo.symbol}`}
              />
              <GovInfoListItem
                icon={<CashIcon className="inline w-4" />}
                text={t('title.refundFailedProposals')}
                value={
                  depositInfo.refund_failed_proposals
                    ? t('info.yes')
                    : t('info.no')
                }
              />
            </>
          )}
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
