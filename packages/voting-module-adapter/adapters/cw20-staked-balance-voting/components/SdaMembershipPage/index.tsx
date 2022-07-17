import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { Pie } from '@dao-dao/icons'
import { CwCoreV0_1_0Selectors, useGovernanceTokenInfo } from '@dao-dao/state'
import { SuspenseLoader } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../../react/context'
import { BaseSdaMembershipPageProps } from '../../../../types'
import { Membership } from '../Membership'
import { ClaimsPendingList } from './ClaimsPendingList'
import { StakeHeader, StakeHeaderLoader } from './StakeHeader'

export const SdaMembershipPage = ({
  defaultImageUrl,
  Loader,
}: BaseSdaMembershipPageProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)
  const daoConfig = useRecoilValue(
    CwCoreV0_1_0Selectors.configSelector({ contractAddress: coreAddress })
  )

  // Set to default mode to display, and undefined to hide.

  if (!daoConfig || !governanceTokenInfo) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <div className="space-y-8">
      <div className="flex relative flex-col items-center mt-16 rounded-b-lg border-t lg:mt-32 bg-primary border-inactive">
        <SuspenseLoader fallback={<StakeHeaderLoader Loader={Loader} />}>
          <StakeHeader defaultImageUrl={defaultImageUrl} />
        </SuspenseLoader>
      </div>

      <div className="flex flex-row gap-2 items-center text-lg title-text">
        <Pie color="rgb(var(--dark))" height={22} width={22} />
        <p>{t('title.yourTokens')}</p>
      </div>

      <Membership
        ClaimsPendingList={(props) => (
          <ClaimsPendingList
            fallbackImageUrl={daoConfig.image_url ?? defaultImageUrl}
            {...props}
          />
        )}
        sdaMode
      />
    </div>
  )
}
