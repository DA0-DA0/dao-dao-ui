import { useTranslation } from 'react-i18next'

import { useCw4VotingModule } from '@dao-dao/state'
import { CopyToClipboard } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const ProposalCreateAddresses = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()

  const { cw4GroupAddress } = useCw4VotingModule(coreAddress)
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
