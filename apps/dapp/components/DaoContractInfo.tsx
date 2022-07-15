import { CashIcon, ChartPieIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Votes } from '@dao-dao/icons'
import {
  useGovernanceTokenInfo,
  useProposalModule,
  useStakingInfo,
} from '@dao-dao/state'
import {
  CopyToClipboardAccent,
  GovInfoListItem,
  SuspenseLoader,
} from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
  useProcessThresholdData,
} from '@dao-dao/utils'

import { useDAOInfoContext } from './DAOPageWrapper'
import { DaoTreasury } from './DaoTreasury'
import { Loader } from './Loader'

interface DaoContractInfoProps {
  hideTreasury?: boolean
}

const DaoContractInfoInternal = ({ hideTreasury }: DaoContractInfoProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDAOInfoContext()
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo(coreAddress)
  const { proposalModuleConfig } = useProposalModule(coreAddress)
  const { stakingContractAddress, stakingContractConfig } =
    useStakingInfo(coreAddress)

  if (!proposalModuleConfig) {
    throw new Error(t('errors.loadingData'))
  }

  const { threshold, quorum } = useProcessThresholdData()(
    proposalModuleConfig.threshold
  )

  return (
    <div className="flex flex-row flex-wrap gap-3 md:grid md:grid-cols-3">
      <div className="mb-4 md:mb-0">
        <h2 className="mb-4 md:mb-6 primary-text">
          {t('title.votingConfiguration')}
        </h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2">
          {stakingContractConfig && (
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
          )}
          <GovInfoListItem
            icon={<Votes fill="currentColor" width="16px" />}
            text={t('title.passingThreshold')}
            value={threshold.display}
          />
          {quorum && (
            <GovInfoListItem
              icon={<Votes fill="currentColor" width="16px" />}
              text={t('title.quorum')}
              value={quorum.display}
            />
          )}
          {proposalModuleConfig.deposit_info && governanceTokenInfo && (
            <>
              <GovInfoListItem
                icon={<Votes fill="currentColor" width="16px" />}
                text={t('title.proposalDeposit')}
                value={`${convertMicroDenomToDenomWithDecimals(
                  proposalModuleConfig.deposit_info.deposit,
                  governanceTokenInfo.decimals
                )} $${governanceTokenInfo.symbol}`}
              />
              <GovInfoListItem
                icon={<CashIcon className="inline w-4" />}
                text={t('title.refundFailedProposals')}
                value={
                  proposalModuleConfig.deposit_info.refund_failed_proposals
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
          {governanceTokenAddress && (
            <li>
              {t('title.governanceToken')}{' '}
              <CopyToClipboardAccent value={governanceTokenAddress} />
            </li>
          )}
          {stakingContractAddress && (
            <li>
              {t('title.staking')}{' '}
              <CopyToClipboardAccent value={stakingContractAddress} />
            </li>
          )}
        </ul>
      </div>
      {!hideTreasury && (
        <SuspenseLoader fallback={<Loader />}>
          <DaoTreasury />
        </SuspenseLoader>
      )}
    </div>
  )
}

const DaoContractInfoLoading: FC<DaoContractInfoProps> = ({ hideTreasury }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row flex-wrap gap-3 md:grid md:grid-cols-3">
      <div className="mb-4 md:mb-0">
        <h2 className="mb-4 md:mb-6 primary-text">
          {t('title.votingConfiguration')}
        </h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2">
          <GovInfoListItem
            icon={<ChartPieIcon className="inline w-4" />}
            loading
            text={t('title.unstakingPeriod')}
          />
          <GovInfoListItem
            icon={<Votes fill="currentColor" width="16px" />}
            loading
            text={t('title.passingThreshold')}
          />
          <GovInfoListItem
            icon={<CashIcon className="inline w-4" />}
            loading
            text={t('title.refundFailedProposals')}
          />
          <li className="flex flex-row items-center caption-text">
            <span className="flex gap-1 items-center">
              <Votes fill="currentColor" width="16px" />
              {t('info.amountProposalDeposit', {
                amount: '0000',
                tokenSymbol: 'ABC',
              })}
            </span>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="mb-4 md:mb-6 primary-text">{t('title.addresses')}</h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2 caption-text">
          <li>
            {t('title.treasury')}{' '}
            <CopyToClipboardAccent loading value="juno..." />
          </li>
          <li>
            {t('title.governanceToken')}{' '}
            <CopyToClipboardAccent loading value="juno..." />
          </li>
          <li>
            {t('title.staking')}{' '}
            <CopyToClipboardAccent loading value="juno..." />
          </li>
        </ul>
      </div>
      {!hideTreasury && (
        <div>
          <div className="flex gap-1 justify-between">
            <h2 className="primary-text">{t('title.treasury')}</h2>
          </div>
        </div>
      )}
    </div>
  )
}

export const DaoContractInfo: FC<DaoContractInfoProps> = (props) => (
  <SuspenseLoader fallback={<DaoContractInfoLoading {...props} />}>
    <DaoContractInfoInternal {...props} />
  </SuspenseLoader>
)
