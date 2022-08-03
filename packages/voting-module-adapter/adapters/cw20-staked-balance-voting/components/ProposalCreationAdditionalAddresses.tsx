import { useTranslation } from 'react-i18next'

import { CopyToClipboard } from '@dao-dao/ui'

import { useGovernanceTokenInfo } from '../hooks'

export const ProposalCreationAdditionalAddresses = () => {
  const { t } = useTranslation()

  const { stakingContractAddress, governanceTokenAddress } =
    useGovernanceTokenInfo()

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
