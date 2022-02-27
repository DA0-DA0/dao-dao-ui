import { ReactNode } from 'react'

import { useRecoilValue, waitForAll } from 'recoil'

import { CashIcon, ChartPieIcon } from '@heroicons/react/outline'

import {
  daoSelector,
  tokenConfig,
  unstakingDuration as unstakingDurationSelector,
} from 'selectors/daos'
import { cw20Balances, cw20TokenInfo, nativeBalance } from 'selectors/treasury'
import { NATIVE_DECIMALS } from 'util/constants'
import {
  thresholdString,
  humanReadableDuration,
  convertMicroDenomToDenomWithDecimals,
  convertDenomToHumanReadableDenom,
} from 'util/conversion'

import { AddressAccent, AddressSmall } from './Address'
import { GovInfoListItem, TreasuryBalances } from './ContractView'
import SvgVotes from './icons/Votes'

export function DaoContractInfo({ address }: { address: string }) {
  const daoInfo = useRecoilValue(daoSelector(address))
  const govTokenInfo = useRecoilValue(tokenConfig(daoInfo.gov_token))

  // Balances for the DAO

  const unstakingDuration = useRecoilValue(
    unstakingDurationSelector(daoInfo.staking_contract)
  )

  return (
    <div className="flex flex-row flex-wrap gap-3 md:grid md:grid-cols-3 border-b border-neutral py-6">
      <div>
        <h2 className="font-medium text-lg mb-6">Governance Details</h2>
        <ul className="list-none ml-2 mt-3 flex flex-col gap-2">
          <GovInfoListItem
            icon={<ChartPieIcon className="w-4 inline" />}
            text="Unstaking period"
            value={humanReadableDuration(unstakingDuration)}
          />
          <GovInfoListItem
            icon={<SvgVotes fill="currentColor" width="16px" />}
            text="Passing threshold"
            value={thresholdString(
              daoInfo.config.threshold,
              false,
              govTokenInfo.decimals
            )}
          />
          <GovInfoListItem
            icon={<CashIcon className="w-4 inline" />}
            text="Proposal deposit refund"
            value={daoInfo.config.refund_failed_proposals ? 'ON' : 'OFF'}
          />
          <li className="flex flex-row items-center text-sm">
            <span className="text-secondary flex items-center gap-1">
              <SvgVotes fill="currentColor" width="16px" />{' '}
              {daoInfo.config.proposal_deposit} ${govTokenInfo.symbol} proposal
              deposit
            </span>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-medium text-lg mb-6">Addresses</h2>
        <ul className="list-none ml-2 mt-3 flex flex-col gap-2 text-secondary text-sm">
          <li>
            DAO <AddressAccent address={address} />
          </li>
          <li>
            Gov token <AddressAccent address={daoInfo.gov_token} />
          </li>
          <li>
            Staking <AddressAccent address={daoInfo.staking_contract} />
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-medium text-lg">DAO Treasury</h2>
        <TreasuryBalances address={address} />
      </div>
    </div>
  )
}
