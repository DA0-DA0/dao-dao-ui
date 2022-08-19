import { useTranslation } from 'react-i18next'

import { SuspenseLoader, useDaoInfoContext } from '@dao-dao/common'
import { Pie } from '@dao-dao/icons'

import { BaseSdaMembershipPageProps } from '../../../../types'
import { ClaimsPendingList } from '../ClaimsPendingList'
import { Membership } from '../Membership'
import { StakeHeader, StakeHeaderLoader } from './StakeHeader'

export const SdaMembershipPage = ({
  defaultImageUrl,
  Loader,
  proposalModuleDepositInfos,
}: BaseSdaMembershipPageProps) => {
  const { t } = useTranslation()
  const { imageUrl } = useDaoInfoContext()

  return (
    <div className="space-y-8">
      <div className="flex relative flex-col items-center mt-16 rounded-b-lg border-t lg:mt-32 bg-primary border-inactive">
        <SuspenseLoader fallback={<StakeHeaderLoader Loader={Loader} />}>
          <StakeHeader defaultImageUrl={defaultImageUrl} />
        </SuspenseLoader>
      </div>

      <div className="flex flex-row gap-2 items-center text-lg title-text">
        <Pie height={22} width={22} />
        <p>{t('title.yourTokens')}</p>
      </div>

      <Membership
        ClaimsPendingList={(props) => (
          <ClaimsPendingList
            fallbackImageUrl={imageUrl ?? defaultImageUrl}
            {...props}
          />
        )}
        proposalModuleDepositInfos={proposalModuleDepositInfos}
        sdaMode
      />
    </div>
  )
}
