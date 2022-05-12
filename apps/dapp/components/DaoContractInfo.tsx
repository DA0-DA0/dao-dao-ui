import { CashIcon, ChartPieIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { Votes } from '@dao-dao/icons'
import { CopyToClipboardAccent, GovInfoListItem } from '@dao-dao/ui'
import {
  humanReadableDuration,
  convertMicroDenomToDenomWithDecimals,
  getThresholdAndQuorumDisplay,
} from '@dao-dao/utils'

import {
  daoSelector,
  tokenConfig,
  unstakingDuration as unstakingDurationSelector,
} from 'selectors/daos'

import { DaoTreasury } from './DaoTreasury'
import { SuspenseLoader } from './SuspenseLoader'

export interface DaoContractInfoProps {
  address: string
  hideTreasury?: boolean
}

function DaoContractInfoInternal({
  address,
  hideTreasury,
}: DaoContractInfoProps) {
  const daoInfo = useRecoilValue(daoSelector(address))
  const govTokenInfo = useRecoilValue(tokenConfig(daoInfo.gov_token))

  const [threshold, quorum] = getThresholdAndQuorumDisplay(
    daoInfo.config.threshold,
    false,
    govTokenInfo.decimals
  )

  const unstakingDuration = useRecoilValue(
    unstakingDurationSelector(daoInfo.staking_contract)
  )

  return (
    <div className="flex flex-row flex-wrap gap-3 md:grid md:grid-cols-3">
      <div className="mb-4 md:mb-0">
        <h2 className="mb-4 md:mb-6 primary-text">Governance Details</h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2">
          <GovInfoListItem
            icon={<ChartPieIcon className="inline w-4" />}
            text="Unstaking period"
            value={humanReadableDuration(unstakingDuration)}
          />
          <GovInfoListItem
            icon={<Votes fill="currentColor" width="16px" />}
            text="Passing threshold"
            value={threshold}
          />
          {quorum && (
            <GovInfoListItem
              icon={<Votes fill="currentColor" width="16px" />}
              text="Quorum"
              value={quorum}
            />
          )}
          <GovInfoListItem
            icon={<CashIcon className="inline w-4" />}
            text="Proposal deposit refund"
            value={daoInfo.config.refund_failed_proposals ? 'ON' : 'OFF'}
          />
          <li className="flex flex-row items-center caption-text">
            <span className="flex gap-1 items-center">
              <Votes fill="currentColor" width="16px" />{' '}
              {convertMicroDenomToDenomWithDecimals(
                daoInfo.config.proposal_deposit,
                govTokenInfo.decimals
              )}{' '}
              ${govTokenInfo.symbol} proposal deposit
            </span>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="mb-4 md:mb-6 primary-text">Addresses</h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2 caption-text">
          <li>
            DAO <CopyToClipboardAccent value={address} />
          </li>
          <li>
            Gov token <CopyToClipboardAccent value={daoInfo.gov_token} />
          </li>
          <li>
            Staking <CopyToClipboardAccent value={daoInfo.staking_contract} />
          </li>
        </ul>
      </div>
      {!hideTreasury && <DaoTreasury address={address} />}
    </div>
  )
}

const DaoContractInfoLoading = () => (
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
  </div>
)

export const DaoContractInfo: FC<DaoContractInfoProps> = (props) => (
  <SuspenseLoader fallback={<DaoContractInfoLoading />}>
    <DaoContractInfoInternal {...props} />
  </SuspenseLoader>
)
