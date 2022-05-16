import { CashIcon, ChartPieIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { Votes } from '@dao-dao/icons'
import {
  useGovernanceTokenInfo,
  useProposalModule,
  useStakingInfo,
} from '@dao-dao/state'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { CopyToClipboardAccent, GovInfoListItem } from '@dao-dao/ui'
import {
  humanReadableDuration,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'
import { processThresholdData } from '@dao-dao/utils/v1'

import { DaoTreasury } from './DaoTreasury'
import { Loader } from './Loader'
import { useOrgInfoContext } from './OrgPageWrapper'
import { SuspenseLoader } from './SuspenseLoader'

interface DaoContractInfoProps {
  hideTreasury?: boolean
}

const DaoContractInfoInternal = ({ hideTreasury }: DaoContractInfoProps) => {
  const { coreAddress } = useOrgInfoContext()
  const config = useRecoilValue(
    configSelector({ contractAddress: coreAddress })
  )
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo(coreAddress)
  const { proposalModuleConfig } = useProposalModule(coreAddress)
  const { stakingContractAddress, stakingContractConfig } =
    useStakingInfo(coreAddress)

  if (
    !config ||
    !governanceTokenAddress ||
    !governanceTokenInfo ||
    !proposalModuleConfig ||
    !stakingContractAddress ||
    !stakingContractConfig
  ) {
    throw new Error('Failed to load data.')
  }

  const { threshold, quorum } = processThresholdData(
    proposalModuleConfig.threshold
  )

  return (
    <div className="flex flex-row flex-wrap gap-3 md:grid md:grid-cols-3">
      <div className="mb-4 md:mb-0">
        <h2 className="mb-4 md:mb-6 primary-text">Governance Details</h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2">
          <GovInfoListItem
            icon={<ChartPieIcon className="inline w-4" />}
            text="Unstaking period"
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
            text="Passing threshold"
            value={threshold.display}
          />
          {quorum && (
            <GovInfoListItem
              icon={<Votes fill="currentColor" width="16px" />}
              text="Quorum"
              value={quorum.display}
            />
          )}
          {proposalModuleConfig.deposit_info && (
            <>
              <GovInfoListItem
                icon={<CashIcon className="inline w-4" />}
                text="Proposal deposit refund"
                value={
                  proposalModuleConfig.deposit_info.refund_failed_proposals
                    ? 'ON'
                    : 'OFF'
                }
              />
              <li className="flex flex-row items-center caption-text">
                <span className="flex gap-1 items-center">
                  <Votes fill="currentColor" width="16px" />{' '}
                  {convertMicroDenomToDenomWithDecimals(
                    proposalModuleConfig.deposit_info.deposit,
                    governanceTokenInfo.decimals
                  )}{' '}
                  ${governanceTokenInfo.symbol} proposal deposit
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <h2 className="mb-4 md:mb-6 primary-text">Addresses</h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2 caption-text">
          <li>
            DAO <CopyToClipboardAccent value={coreAddress} />
          </li>
          <li>
            Gov token <CopyToClipboardAccent value={governanceTokenAddress} />
          </li>
          <li>
            Staking <CopyToClipboardAccent value={stakingContractAddress} />
          </li>
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

const DaoContractInfoLoading: FC<DaoContractInfoProps> = ({ hideTreasury }) => (
  <div className="flex flex-row flex-wrap gap-3 md:grid md:grid-cols-3">
    <div className="mb-4 md:mb-0">
      <h2 className="mb-4 md:mb-6 primary-text">Governance Details</h2>
      <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2">
        <GovInfoListItem
          icon={<ChartPieIcon className="inline w-4" />}
          loading
          text="Unstaking period"
        />
        <GovInfoListItem
          icon={<Votes fill="currentColor" width="16px" />}
          loading
          text="Passing threshold"
        />
        <GovInfoListItem
          icon={<CashIcon className="inline w-4" />}
          loading
          text="Proposal deposit refund"
        />
        <li className="flex flex-row items-center caption-text">
          <span className="flex gap-1 items-center">
            <Votes fill="currentColor" width="16px" />{' '}
            <span className="inline bg-dark rounded-sm animate-pulse">
              0000 000
            </span>{' '}
            proposal deposit
          </span>
        </li>
      </ul>
    </div>
    <div>
      <h2 className="mb-4 md:mb-6 primary-text">Addresses</h2>
      <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2 caption-text">
        <li>
          DAO <CopyToClipboardAccent loading value="juno..." />
        </li>
        <li>
          Gov token <CopyToClipboardAccent loading value="juno..." />
        </li>
        <li>
          Staking <CopyToClipboardAccent loading value="juno..." />
        </li>
      </ul>
    </div>
    {!hideTreasury && (
      <div>
        <div className="flex gap-1 justify-between">
          <h2 className="primary-text">Treasury</h2>
        </div>
      </div>
    )}{' '}
  </div>
)

export const DaoContractInfo: FC<DaoContractInfoProps> = (props) => (
  <SuspenseLoader fallback={<DaoContractInfoLoading {...props} />}>
    <DaoContractInfoInternal {...props} />
  </SuspenseLoader>
)
