import { useTranslation } from 'react-i18next'

import { useGovernanceTokenInfo } from '@dao-dao/state'
import { CopyToClipboard } from '@dao-dao/ui'

import { BaseProposalCreateAddressesProps } from '../../../types'

export const ProposalCreateAddresses = ({
  coreAddress,
}: BaseProposalCreateAddressesProps) => {
  const { t } = useTranslation()

  const { stakingContractAddress, governanceTokenAddress } =
    useGovernanceTokenInfo(coreAddress)

  if (!stakingContractAddress || !governanceTokenAddress) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <>
      <p className="font-mono text-sm text-tertiary">
        {t('info.stakingAddress')}
      </p>
      <div className="col-span-2">
        <CopyToClipboard value={stakingContractAddress} />
      </div>

      <p className="font-mono text-sm text-tertiary">
        {t('info.govTokenAddress')}
      </p>
      <div className="col-span-2">
        <CopyToClipboard value={governanceTokenAddress} />
      </div>
    </>
  )
}
