import { ArrowDropDown } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { ActiveSurveyStatus, SurveyStatus } from '../../types'
import { ActiveSurveyRow, ActiveSurveyRowProps } from './ActiveSurveyRow'

export type OpenSurveySectionProps = {
  activeSurveys: ActiveSurveyStatus[]
  onClick?: (surveyId: number) => void
  /**
   * Survey ID that is loading.
   */
  loading?: number
} & Pick<ActiveSurveyRowProps, 'connected' | 'isMember'>

export const OpenSurveySection = ({
  activeSurveys,
  onClick,
  loading,
  ...props
}: OpenSurveySectionProps) => {
  const { t } = useTranslation()

  const grouped = activeSurveys.reduce(
    (acc, survey) => {
      let group = acc.find((g) => g.status === survey.survey.status)
      if (!group) {
        group = {
          status: survey.survey.status,
          title: t(
            statusTitles[survey.survey.status] ||
              'info.waitingForRateAndPropose'
          ),
          surveys: [],
        }
        acc.push(group)
      }

      group.surveys.push(survey)

      return acc
    },
    [] as {
      status: string
      title: string
      surveys: ActiveSurveyStatus[]
    }[]
  )

  return (
    <>
      {grouped.map(({ status, title, surveys }) => (
        <div key={status} className="flex flex-col gap-4">
          <div className="link-text ml-2 flex flex-row items-center gap-3">
            <ArrowDropDown className="!h-4 !w-4 text-icon-primary" />

            <p className="text-text-secondary">{title}</p>
          </div>

          <div className="flex flex-col gap-1">
            {surveys.map((activeSurvey) => (
              <ActiveSurveyRow
                {...props}
                key={activeSurvey.survey.surveyId}
                activeSurvey={activeSurvey}
                loading={loading === activeSurvey.survey.surveyId}
                onClick={
                  onClick && (() => onClick?.(activeSurvey.survey.surveyId))
                }
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

const statusTitles: Partial<Record<string, string>> = {
  [SurveyStatus.Inactive]: 'title.upcoming',
  [SurveyStatus.AcceptingContributions]: 'title.acceptingSubmissions',
}
