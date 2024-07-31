import { ArrowDropDown } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import {
  StatefulSurveyRowProps,
  SurveyStatus,
  SurveyWithMetadata,
} from '../../types'

export type SurveyListProps = {
  surveys: SurveyWithMetadata[]
  SurveyRow: ComponentType<StatefulSurveyRowProps>
}

export const SurveyList = ({ surveys, SurveyRow }: SurveyListProps) => {
  const { t } = useTranslation()

  const grouped = surveys.reduce(
    (acc, survey) => {
      let group = acc.find((g) => g.status === survey.survey.status)
      if (!group) {
        group = {
          status: survey.survey.status,
          title: t(
            survey.survey.status in statusTitles
              ? statusTitles[survey.survey.status as keyof typeof statusTitles]
              : '<unknown>'
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
      surveys: SurveyWithMetadata[]
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
            {surveys.map((survey) => (
              <SurveyRow key={survey.survey.surveyId} survey={survey} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

const statusTitles: Record<SurveyStatus, string> = {
  [SurveyStatus.Inactive]: 'title.upcoming',
  [SurveyStatus.AcceptingContributions]: 'title.acceptingSubmissions',
  [SurveyStatus.AcceptingRatings]: 'info.waitingForRateAndPropose',
  [SurveyStatus.AwaitingCompletion]: 'info.waitingForRateAndPropose',
  [SurveyStatus.Complete]: 'title.history',
}
