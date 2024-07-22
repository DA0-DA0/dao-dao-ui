import { ArrowDropDown, Ballot } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import {
  LineLoader,
  LineLoaders,
  NoContent,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { LoadingData, LoadingDataWithError, WidgetId } from '@dao-dao/types'
import { IconButtonLinkProps } from '@dao-dao/types/components/IconButtonLink'

import {
  ActiveSurveyProps,
  ActiveSurveyStatus,
  CompletedSurveyStatus,
  PagePath,
} from '../../../types'
import { CompletedSurveyRow } from '../CompletedSurveyRow'

export type HomeProps = {
  loadingActiveSurveys: LoadingData<ActiveSurveyStatus[]>
  loadingCompletedSurveys: LoadingData<CompletedSurveyStatus[]>
  isMember: boolean
  ActiveSurvey: ComponentType<ActiveSurveyProps>
  downloadCompletedSurvey: (pastSurvey: CompletedSurveyStatus) => void
  loadingCompletedSurveyId: number | undefined
  loadingMembershipDuringCompletedSurveys: LoadingDataWithError<string[]>
  IconButtonLink: ComponentType<IconButtonLinkProps>
}

export const Home = ({
  loadingActiveSurveys,
  loadingCompletedSurveys,
  isMember,
  ActiveSurvey,
  downloadCompletedSurvey,
  loadingCompletedSurveyId,
  loadingMembershipDuringCompletedSurveys,
  IconButtonLink,
}: HomeProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoPath, getDaoProposalPath } = useDaoNavHelpers()

  return (
    <div className="flex flex-col gap-6">
      {loadingActiveSurveys.loading ? (
        <LineLoader type="retroactive" />
      ) : // If no active surveys, text is shown at the top. No need to render anything here.
      !loadingActiveSurveys.data.length ? null : (
        <ActiveSurvey activeSurveys={loadingActiveSurveys.data} />
      )}

      <div className="link-text ml-2 flex flex-row items-center gap-3">
        <ArrowDropDown className="!h-4 !w-4 text-icon-primary" />
        <p className="text-text-secondary">{t('title.history')}</p>
      </div>

      {loadingCompletedSurveys.loading ? (
        <LineLoaders lines={20} type="retroactive" />
      ) : loadingCompletedSurveys.data.length > 0 ? (
        <div className="flex flex-col gap-1">
          {loadingCompletedSurveys.data.map((survey, index) => {
            const wasMemberDuringSurvey =
              !loadingMembershipDuringCompletedSurveys.loading &&
              !loadingMembershipDuringCompletedSurveys.errored &&
              Number(loadingMembershipDuringCompletedSurveys.data[index]) > 0

            return (
              <CompletedSurveyRow
                key={survey.id}
                IconButtonLink={IconButtonLink}
                className={clsx(
                  // If survey is loading, animate pulse.
                  loadingCompletedSurveyId === survey.id && 'animate-pulse',
                  // If was not a member and no proposal, disable pointer
                  // events since we can't do anything.
                  !wasMemberDuringSurvey &&
                    !survey.proposalId &&
                    'pointer-events-none'
                )}
                onClick={() =>
                  wasMemberDuringSurvey
                    ? // If was a member, prompt for authentication before downloading CSV.
                      downloadCompletedSurvey(survey)
                    : // If was not a member but proposal exists, open survey in new tab on select.
                      survey.proposalId &&
                      window.open(
                        getDaoProposalPath(coreAddress, survey.proposalId),
                        '_blank'
                      )
                }
                survey={survey}
                tooltip={
                  wasMemberDuringSurvey
                    ? t('button.downloadSurveyCsv')
                    : t('button.goToProposal')
                }
              />
            )
          })}
        </div>
      ) : (
        <NoContent
          Icon={Ballot}
          actionNudge={t('info.createFirstOneQuestion')}
          body={t('info.noCompletedCyclesYet')}
          buttonLabel={t('button.newCompensationCycle')}
          href={
            isMember
              ? getDaoPath(
                  coreAddress,
                  WidgetId.RetroactiveCompensation + '/' + PagePath.Create
                )
              : undefined
          }
        />
      )}
    </div>
  )
}
