import { ClockIcon } from '@heroicons/react/outline'
import { useRecoilValue } from 'recoil'

import { Votes } from '@dao-dao/icons'
import { CopyToClipboardAccent, GovInfoListItem } from '@dao-dao/ui'
import { humanReadableDuration, thresholdString } from '@dao-dao/utils'

import { sigSelector } from 'selectors/multisigs'

import { DaoTreasury } from './DaoTreasury'

export function MultisigContractInfo({
  address,
  hideTreasury,
}: {
  address: string
  hideTreasury?: boolean
}) {
  const sigInfo = useRecoilValue(sigSelector(address))

  return (
    <div className="flex flex-row flex-wrap gap-6 md:grid md:grid-cols-3">
      <div className="mb-4 md:mb-0">
        <h2 className="mb-4 md:mb-6 primary-text">Governance Details</h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2">
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
        <h2 className="mb-4 md:mb-6 primary-text">Addresses</h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2 caption-text">
          <li>
            Multisig <CopyToClipboardAccent value={address} />
          </li>
          <li>
            cw4-group <CopyToClipboardAccent value={sigInfo.group_address} />
          </li>
        </ul>
      </div>
      {!hideTreasury && <DaoTreasury address={address} />}
    </div>
  )
}
