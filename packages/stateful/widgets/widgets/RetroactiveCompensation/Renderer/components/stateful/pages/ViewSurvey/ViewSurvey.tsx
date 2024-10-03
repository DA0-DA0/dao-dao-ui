import { useQueryClient } from '@tanstack/react-query'
import { ComponentType } from 'react'

import {
  ErrorPage,
  Loader,
  useDao,
  useDaoNavHelpers,
  useUpdatingRef,
} from '@dao-dao/stateless'
import { ImmutableRef } from '@dao-dao/types'

import {
  useMembership,
  useQueryLoadingDataWithError,
  useWallet,
} from '../../../../../../../../hooks'
import { retroactiveCompensationQueries } from '../../../../queries'
import { SurveyStatus, SurveyWithMetadata } from '../../../../types'
import { Complete } from './Complete'
import { Info } from './Info'
import { Rate } from './Rate'
import { Submit } from './Submit'
import { ViewSurveyPageProps } from './types'

export const ViewSurvey = () => {
  const dao = useDao()
  const { daoSubpathComponents } = useDaoNavHelpers()

  const { hexPublicKey } = useWallet({
    loadAccount: true,
  })

  const uuid = daoSubpathComponents[2]

  const queryClient = useQueryClient()
  const loadingSurvey = useQueryLoadingDataWithError(
    retroactiveCompensationQueries.survey({
      daoAddress: dao.coreAddress,
      walletPublicKey: !hexPublicKey.loading ? hexPublicKey.data : '_',
      uuid,
    })
  )

  // Memoize callback.
  const refreshRef = useUpdatingRef(() =>
    queryClient.refetchQueries({
      queryKey: retroactiveCompensationQueries.survey({
        daoAddress: dao.coreAddress,
        uuid,
      }).queryKey,
    })
  )

  return (
    <>
      {loadingSurvey.loading ? (
        <Loader />
      ) : loadingSurvey.errored ? (
        <ErrorPage error={loadingSurvey.error} />
      ) : (
        <InnerViewSurvey refreshRef={refreshRef} status={loadingSurvey.data} />
      )}
    </>
  )
}

export const InnerViewSurvey = ({
  status,
  refreshRef,
}: {
  status: SurveyWithMetadata
  refreshRef: ImmutableRef<() => Promise<void>>
}) => {
  const { isWalletConnected } = useWallet()

  // Voting power at time of survey creation, which determines what access level
  // this wallet has.
  const { loadingIsMember } = useMembership({
    blockHeight: status.survey.createdAtBlockHeight,
  })

  const Page: ComponentType<ViewSurveyPageProps> =
    viewSurveyPageMap[status.survey.status] || Info

  return (
    <div className="pb-10">
      <Page
        connected={isWalletConnected}
        isMember={loadingIsMember}
        refreshRef={refreshRef}
        status={status}
      />
    </div>
  )
}

export const viewSurveyPageMap: Record<
  SurveyStatus,
  ComponentType<ViewSurveyPageProps>
> = {
  [SurveyStatus.Inactive]: Submit,
  [SurveyStatus.AcceptingContributions]: Submit,
  [SurveyStatus.AcceptingRatings]: Rate,
  [SurveyStatus.AwaitingCompletion]: Complete,
  [SurveyStatus.Complete]: Info,
}
