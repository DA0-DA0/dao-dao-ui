import { useTranslation } from 'react-i18next'

import { SuspenseLoader } from '@dao-dao/common'
import { Pie } from '@dao-dao/icons'
import { useDaoInfoContext } from '@dao-dao/ui'

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
      <div className="bg-primary border-inactive relative mt-16 flex flex-col items-center rounded-b-lg border-t lg:mt-32">
        <SuspenseLoader fallback={<StakeHeaderLoader Loader={Loader} />}>
          <StakeHeader defaultImageUrl={defaultImageUrl} />
        </SuspenseLoader>
      </div>

      <div className="title-text flex flex-row items-center gap-2 text-lg">
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
