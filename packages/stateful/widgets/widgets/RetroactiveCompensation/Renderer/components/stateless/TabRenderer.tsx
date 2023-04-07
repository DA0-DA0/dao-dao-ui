import { Add, ArrowDropDown, Ballot, Remove } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Loader,
  NoContent,
  Tooltip,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'
import { VotingPowerAtHeightResponse } from '@dao-dao/types/contracts/DaoCore.v2'
import { IconButtonLinkProps } from '@dao-dao/types/stateless/IconButtonLink'

import {
  CompletedSurveyListing,
  StatefulOpenSurveySectionProps,
  Status,
} from '../../types'
import { CompletedSurveyRow } from './CompletedSurveyRow'

export interface TabRendererProps {
  loadingStatus: LoadingData<Status | undefined>
  loadingCompletedSurveys: LoadingData<CompletedSurveyListing[]>
  isMember: boolean
  NewSurveyForm: ComponentType
  OpenSurveySection: ComponentType<
    Pick<StatefulOpenSurveySectionProps, 'status'>
  >
  downloadCompletedSurvey: (pastSurvey: CompletedSurveyListing) => void
  loadingCompletedSurveyId: number | undefined
  loadingMembershipDuringCompletedSurveys: LoadingData<
    VotingPowerAtHeightResponse[]
  >
  IconButtonLink: ComponentType<IconButtonLinkProps>
}

export const TabRenderer = ({
  loadingStatus,
  loadingCompletedSurveys,
  isMember,
  NewSurveyForm,
  OpenSurveySection,
  downloadCompletedSurvey,
  loadingCompletedSurveyId,
  loadingMembershipDuringCompletedSurveys,
  IconButtonLink,
}: TabRendererProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useNavHelpers()

  const [showCreate, setShowCreate] = useState(false)
  // Can create survey if member of DAO and there does not exist a current
  // survey.
  const canCreateSurvey =
    isMember && !loadingStatus.loading && !loadingStatus.data

  // Subtitle status.
  const subtitleStatus =
    !loadingStatus.loading && !loadingStatus.data
      ? t('info.noActiveCompensationCycle')
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
              ? t('error.mustBeMemberToCreateCompensationCycle')
              : !loadingStatus.loading && loadingStatus.data
              ? t('error.cannotCreateCompensationCycleAlreadyActive')
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
                {t('button.cancel')}
              </>
            ) : (
              <>
                <Add className="!h-4 !w-4" />
                {t('button.newCompensationCycle')}
              </>
            )}
          </Button>
        </Tooltip>
      </div>

      {loadingStatus.loading ? (
        <Loader fill={false} />
      ) : // If no active survey, text is shown at the top. No need to render anything here.
      !loadingStatus.data ? null : (
        <OpenSurveySection status={loadingStatus.data} />
      )}

      {canCreateSurvey && showCreate ? (
        <NewSurveyForm />
      ) : (
        <>
          <div className="link-text ml-2 flex flex-row items-center gap-3">
            <ArrowDropDown className="!h-4 !w-4 text-icon-primary" />
            <p className="text-text-secondary">{t('title.history')}</p>
          </div>

          {loadingCompletedSurveys.loading ? (
            <Loader fill={false} />
          ) : loadingCompletedSurveys.data.length > 0 ? (
            <div className="flex flex-col gap-1">
              {loadingCompletedSurveys.data.map((survey, index) => {
                const wasMemberDuringSurvey =
                  !loadingMembershipDuringCompletedSurveys.loading &&
                  Number(
                    loadingMembershipDuringCompletedSurveys.data[index].power
                  ) > 0

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
