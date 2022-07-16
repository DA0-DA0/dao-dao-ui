import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import { Cw4VotingSelectors, useVotingModule } from '@dao-dao/state'
import { CopyToClipboard } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const ProposalCreateAddresses = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()

  const { votingModuleAddress } = useVotingModule(coreAddress)
  const cw4GroupAddress = useRecoilValue(
    votingModuleAddress
      ? Cw4VotingSelectors.groupContractSelector({
          contractAddress: votingModuleAddress,
          params: [],
        })
      : constSelector(undefined)
  )

  if (!cw4GroupAddress) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <>
      <p className="font-mono text-sm text-tertiary">
        {t('info.groupAddress')}
      </p>
      <div className="col-span-2">
        <CopyToClipboard value={cw4GroupAddress} />
      </div>
    </>
  )
}
