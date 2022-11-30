import { Add, Ballot, Remove } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Loader,
  MarkdownPreview,
  NoContent,
  Tooltip,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'
import { IconButtonLinkProps } from '@dao-dao/types/stateless/IconButtonLink'
import { formatDateTimeTz } from '@dao-dao/utils'

import { CompletedSurveyListing, Status, SurveyStatus } from '../../types'
import { CompletedSurveyRow } from './CompletedSurveyRow'

export interface PayrollTabProps {
  loadingStatus: LoadingData<Status | undefined>
  loadingCompletedSurveys: LoadingData<CompletedSurveyListing[]>
  isMember: boolean
  NewSurveyForm: ComponentType
  ContributionForm: ComponentType
  RatingForm: ComponentType
  ProposalCreationForm: ComponentType
  downloadCompletedSurvey: (pastSurvey: CompletedSurveyListing) => void
  loadingCompletedSurveyId: number | undefined
  IconButtonLink: ComponentType<IconButtonLinkProps>
}

export const PayrollTab = ({
  loadingStatus,
  loadingCompletedSurveys,
  isMember,
  NewSurveyForm,
  ContributionForm,
  ProposalCreationForm,
  RatingForm,
  downloadCompletedSurvey,
  loadingCompletedSurveyId,
  IconButtonLink,
}: PayrollTabProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()

  const [showCreate, setShowCreate] = useState(false)
  // Can create survey if member of DAO and there does not exist a current
  // survey.
  const canCreateSurvey =
    isMember && !loadingStatus.loading && !loadingStatus.data

  // Subtitle status.
  const subtitleStatus =
    !loadingStatus.loading && !loadingStatus.data
      ? t('info.noActiveSurvey')
      : null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between gap-8 border-b border-border-secondary pb-6">
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
          <p className="title-text text-text-body">
            {t('title.retroactiveCompensation')}
          </p>

          {subtitleStatus && <p className="secondary-text">{subtitleStatus}</p>}
        </div>

        <Tooltip
          title={
            !isMember
              ? t('error.mustBeMemberToCreateSurvey')
              : !loadingStatus.loading && loadingStatus.data
              ? t('error.cannotCreateSurveyAlreadyActive')
              : undefined
          }
        >
          <Button
            className="shrink-0"
            disabled={!canCreateSurvey}
            onClick={() => setShowCreate((c) => !c)}
          >
            {canCreateSurvey && showCreate ? (
              <>
                <Remove className="!h-4 !w-4" />
                {t('button.cancelNewSurvey')}
              </>
            ) : (
              <>
                <Add className="!h-4 !w-4" />
                {t('button.newSurvey')}
              </>
            )}
          </Button>
        </Tooltip>
      </div>

      {loadingStatus.loading ? (
        <Loader fill={false} />
      ) : // If no active survey, text is shown at the top. No need to render anything here.
      !loadingStatus.data ? null : loadingStatus.data.survey.status ===
          SurveyStatus.Inactive ||
        loadingStatus.data.survey.status ===
          SurveyStatus.AcceptingContributions ? (
        <div className="border-b border-border-primary pb-6">
          <ContributionForm />
        </div>
      ) : loadingStatus.data.survey.status === SurveyStatus.AcceptingRatings ? (
        <div
          className={clsx(
            'border-b border-border-primary',
            isMember ? 'pb-6' : 'pb-40'
          )}
        >
          {isMember ? (
            <RatingForm />
          ) : (
            <>
              <p className="hero-text mb-4 max-w-prose break-words">
                {loadingStatus.data.survey.name}
              </p>

              <MarkdownPreview
                markdown={t('info.contributionsBeingRated', {
                  date: formatDateTimeTz(
                    new Date(loadingStatus.data.survey.ratingsCloseAt)
                  ),
                })}
              />
            </>
          )}
        </div>
      ) : loadingStatus.data.survey.status ===
        SurveyStatus.AwaitingCompletion ? (
        <div
          className={clsx(
            'border-b border-border-primary',
            isMember ? 'pb-6' : 'pb-40'
          )}
        >
          {isMember ? (
            <ProposalCreationForm />
          ) : (
            <>
              <p className="hero-text mb-4 max-w-prose break-words">
                {loadingStatus.data.survey.name}
              </p>

              <MarkdownPreview markdown={t('info.surveyPendingCompletion')} />
            </>
          )}
        </div>
      ) : null}

      {canCreateSurvey && showCreate ? (
        <NewSurveyForm />
      ) : (
        <>
          <div className="space-y-1">
            <p className="title-text text-text-body">
              {t('title.completedSurveys')}
            </p>

            <p className="secondary-text max-w-prose italic">
              {isMember
                ? t('info.selectingSurveyDownloadsCsv')
                : t('info.selectingSurveyOpensProposal')}
            </p>
          </div>

          {loadingCompletedSurveys.loading ? (
            <Loader fill={false} />
          ) : loadingCompletedSurveys.data.length > 0 ? (
            <div className="flex flex-col gap-1">
              {loadingCompletedSurveys.data.map((survey) => (
                <CompletedSurveyRow
                  key={survey.id}
                  IconButtonLink={IconButtonLink}
                  className={clsx(
                    // If survey is loading, animate pulse.
                    loadingCompletedSurveyId === survey.id && 'animate-pulse',
                    // If not a member and no proposal, disable pointer events
                    // since we can't go anywhere.
                    !isMember && !survey.proposalId && 'pointer-events-none'
                  )}
                  onClick={() =>
                    isMember
                      ? // If member, prompt for authentication before downloading CSV.
                        downloadCompletedSurvey(survey)
                      : // If not a member but proposal exists, open survey in new tab on select.
                        survey.proposalId &&
                        window.open(
                          `/dao/${coreAddress}/proposals/${survey.proposalId}`
                        )
                  }
                  survey={survey}
                />
              ))}
            </div>
          ) : (
            <NoContent
              Icon={Ballot}
              actionNudge={t('info.createFirstOneQuestion')}
              body={t('info.noCompletedSurveysYet')}
              buttonLabel={t('button.newSurvey')}
              onClick={
                canCreateSurvey && !showCreate
                  ? () => setShowCreate(true)
                  : undefined
              }
            />
          )}
        </>
      )}
    </div>
  )
}
