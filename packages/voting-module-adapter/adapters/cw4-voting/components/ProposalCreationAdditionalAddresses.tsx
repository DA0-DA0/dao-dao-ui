import { useTranslation } from 'react-i18next'

import { CopyToClipboard } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useVotingModule } from '../hooks/useVotingModule'

export const ProposalCreationAdditionalAddresses = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()

  const { cw4GroupAddress } = useVotingModule(coreAddress)

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
