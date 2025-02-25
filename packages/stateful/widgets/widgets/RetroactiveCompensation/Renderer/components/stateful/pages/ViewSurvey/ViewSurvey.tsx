import { DeleteRounded } from '@mui/icons-material'
import { useQueryClient } from '@tanstack/react-query'
import { ComponentType, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ErrorPage,
  IconButton,
  Loader,
  Tooltip,
  useDao,
  useDaoNavHelpers,
  useUpdatingRef,
} from '@dao-dao/stateless'
import { ImmutableRef, WidgetId } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import {
  useMembership,
  useQueryLoadingDataWithError,
  useWallet,
} from '../../../../../../../../hooks'
import { usePostRequest } from '../../../../hooks/usePostRequest'
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
  const { t } = useTranslation()
  const dao = useDao()
  const { getDaoPath, router } = useDaoNavHelpers()
  const { isWalletConnected, hexPublicKey } = useWallet({
    loadAccount: true,
  })
  const queryClient = useQueryClient()

  // Voting power at time of survey creation, which determines what access level
  // this wallet has.
  const { loadingIsMember } = useMembership({
    blockHeight: status.survey.createdAtBlockHeight,
  })

  const [deleting, setDeleting] = useState(false)
  const postRequest = usePostRequest()
  const onDelete = async () => {
    setDeleting(true)
    try {
      await postRequest(
        `/${dao.coreAddress}/${status.survey.uuid}`,
        undefined,
        undefined,
        undefined,
        'DELETE'
      )

      toast.success(t('success.compensationCycleDeleted'))

      // Reload survey list.
      await queryClient.refetchQueries({
        queryKey: retroactiveCompensationQueries.listSurveys(queryClient, {
          daoAddress: dao.coreAddress,
        }).queryKey,
      })

      router.replace(
        getDaoPath(dao.coreAddress, WidgetId.RetroactiveCompensation),
        undefined,
        {
          shallow: true,
        }
      )
    } catch (err) {
      console.error(err)
      toast.error(
        processError(err, {
          forceCapture: true,
        })
      )
    } finally {
      setDeleting(false)
    }
  }

  const Page: ComponentType<ViewSurveyPageProps> =
    viewSurveyPageMap[status.survey.status] || Info

  return (
    <>
      {!hexPublicKey.loading &&
        hexPublicKey.data === status.survey.creatorPublicKey && (
          <Tooltip title={deleting ? t('info.deleting') : t('button.delete')}>
            <IconButton
              Icon={DeleteRounded}
              className="absolute top-0 right-0"
              confirm
              loading={deleting}
              onClick={onDelete}
              variant="secondary"
            />
          </Tooltip>
        )}

      <div className="pb-10">
        <Page
          connected={isWalletConnected}
          isMember={loadingIsMember}
          refreshRef={refreshRef}
          status={status}
        />
      </div>
    </>
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
