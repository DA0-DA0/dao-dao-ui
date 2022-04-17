import { useRecoilValue } from 'recoil'

import { Votes } from '@dao-dao/icons'
import {
  humanReadableDuration,
  convertMicroDenomToDenomWithDecimals,
  getThresholdAndQuorumDisplay,
} from '@dao-dao/utils'
import { CashIcon, ChartPieIcon } from '@heroicons/react/outline'

import {
  daoSelector,
  tokenConfig,
  unstakingDuration as unstakingDurationSelector,
} from 'selectors/daos'

import { GovInfoListItem } from './ContractView'
import { DaoTreasury } from './DaoTreasury'

export function DaoContractInfo({ address }: { address: string }) {
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
    <div className="flex flex-row flex-wrap gap-3 pt-[22px] pb-[28px] border-b border-inactive md:grid md:grid-cols-3">
      <div>
        <h2 className="mb-6 primary-text">Governance Details</h2>
        <ul className="flex flex-col gap-2 mt-3 ml-2 list-none">
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
        <h2 className="mb-6 primary-text">Addresses</h2>
        <ul className="flex flex-col gap-2 mt-3 ml-2 list-none caption-text">
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
      <DaoTreasury address={address} />
    </div>
  )
}
