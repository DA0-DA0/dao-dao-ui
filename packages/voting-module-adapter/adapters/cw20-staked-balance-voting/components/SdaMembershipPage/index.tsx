import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/common'
import { Pie } from '@dao-dao/icons'
import { SuspenseLoader } from '@dao-dao/ui'

import { BaseSdaMembershipPageProps } from '../../../../types'
import { useGovernanceTokenInfo } from '../../hooks'
import { ClaimsPendingList } from '../ClaimsPendingList'
import { Membership } from '../Membership'
import { StakeHeader, StakeHeaderLoader } from './StakeHeader'

export const SdaMembershipPage = ({
  defaultImageUrl,
  Loader,
}: BaseSdaMembershipPageProps) => {
  const { t } = useTranslation()
  const { governanceTokenInfo } = useGovernanceTokenInfo()
  const { imageUrl } = useDaoInfoContext()

  // Set to default mode to display, and undefined to hide.

  if (!governanceTokenInfo) {
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
            fallbackImageUrl={imageUrl ?? defaultImageUrl}
            {...props}
          />
        )}
        sdaMode
      />
    </div>
  )
}
