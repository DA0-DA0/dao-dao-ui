import { useRecoilValue } from 'recoil'

import { humanReadableDuration, thresholdString } from '@dao-dao/utils'
import { ClockIcon } from '@heroicons/react/outline'

import { sigSelector } from 'selectors/multisigs'

import { GovInfoListItem } from './ContractView'
import { DaoTreasury } from './DaoTreasury'

export function MultisigContractInfo({ address }: { address: string }) {
  const sigInfo = useRecoilValue(sigSelector(address))

  return (
    <div className="flex flex-row flex-wrap gap-3 pt-[22px] pb-[28px] border-b md:grid md:grid-cols-3 border-inactive">
      <div>
        <h2 className="mb-6 primary-text">Governance Details</h2>
        <ul className="flex flex-col gap-2 mt-3 ml-2 list-none">
          <GovInfoListItem
            icon={<Votes fill="currentColor" width="16px" />}
            text="Passing threshold"
            value={thresholdString(sigInfo.config.threshold, true, 0)}
          />
          <GovInfoListItem
            icon={<ClockIcon className="inline w-4" />}
            text="Proposal duration"
            value={humanReadableDuration(sigInfo.config.max_voting_period)}
          />
        </ul>
      </div>
      <div>
        <h2 className="mb-6 primary-text">Addresses</h2>
        <ul className="flex flex-col gap-2 mt-3 ml-2 list-none caption-text">
          <li>
            Multisig <CopyToClipboardAccent value={address} />
          </li>
          <li>
            cw4-group <CopyToClipboardAccent value={sigInfo.group_address} />
          </li>
        </ul>
      </div>
      <DaoTreasury address={address} />
    </div>
  )
}
