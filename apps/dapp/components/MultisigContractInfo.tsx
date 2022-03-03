import { useRecoilValue } from 'recoil'

import { ClockIcon } from '@heroicons/react/outline'

import { sigSelector } from 'selectors/multisigs'
import { humanReadableDuration, thresholdString } from 'util/conversion'

import { AddressAccent } from './Address'
import { GovInfoListItem, TreasuryBalances } from './ContractView'
import SvgVotes from './icons/Votes'

export function MultisigContractInfo({ address }: { address: string }) {
  const sigInfo = useRecoilValue(sigSelector(address))

  return (
    <div className="flex flex-row flex-wrap gap-3 md:grid md:grid-cols-3 border-b border-neutral py-6">
      <div>
        <h2 className="font-medium text-lg mb-6">Governance Details</h2>
        <ul className="list-none ml-2 mt-3 flex flex-col gap-2">
          <GovInfoListItem
            icon={<SvgVotes fill="currentColor" width="16px" />}
            text="Passing threshold"
            value={thresholdString(sigInfo.config.threshold, true, 0)}
          />
          <GovInfoListItem
            icon={<ClockIcon className="w-4 inline" />}
            text="Proposal duration"
            value={humanReadableDuration(sigInfo.config.max_voting_period)}
          />
        </ul>
      </div>
      <div>
        <h2 className="font-medium text-lg mb-6">Addresses</h2>
        <ul className="list-none mt-3 flex flex-col gap-2 text-secondary text-sm">
          <li>
            Multisig address <AddressAccent address={address} />
          </li>
          <li>
            cw4-group address <AddressAccent address={sigInfo.group_address} />
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
