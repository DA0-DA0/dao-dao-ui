import { ClockIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { Votes } from '@dao-dao/icons'
import { CopyToClipboardAccent, GovInfoListItem } from '@dao-dao/ui'
import { humanReadableDuration, thresholdString } from '@dao-dao/utils'

import { sigSelector } from 'selectors/multisigs'

import { DaoTreasury } from './DaoTreasury'
import { SuspenseLoader } from './SuspenseLoader'

export interface MultisigContractInfoProps {
  address: string
  hideTreasury?: boolean
}

function MultisigContractInfoInternal({
  address,
  hideTreasury,
}: MultisigContractInfoProps) {
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

const MultisigContractInfoLoading = () => (
  <div className="flex flex-row flex-wrap gap-3 md:grid md:grid-cols-3">
    <div className="mb-4 md:mb-0">
      <h2 className="mb-4 md:mb-6 primary-text">Governance Details</h2>
      <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2">
        <GovInfoListItem
          icon={<Votes fill="currentColor" width="16px" />}
          loading
          text="Passing threshold"
        />
        <GovInfoListItem
          icon={<ClockIcon className="inline w-4" />}
          loading
          text="Proposal duration"
        />
      </ul>
    </div>
    <div>
      <h2 className="mb-4 md:mb-6 primary-text">Addresses</h2>
      <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2 caption-text">
        <li>
          Multisig <CopyToClipboardAccent loading value="juno..." />
        </li>
        <li>
          cw4-group <CopyToClipboardAccent loading value="juno..." />
        </li>
      </ul>
    </div>
  </div>
)

export const MultisigContractInfo: FC<MultisigContractInfoProps> = (props) => (
  <SuspenseLoader fallback={<MultisigContractInfoLoading />}>
    <MultisigContractInfoInternal {...props} />
  </SuspenseLoader>
)
