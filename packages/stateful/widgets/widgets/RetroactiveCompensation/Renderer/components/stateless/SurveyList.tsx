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
      const titleI18nKey =
        survey.survey.status in statusTitles
          ? statusTitles[survey.survey.status]
          : '<unknown>'

      let group = acc.find((g) => g.titleI18nKey === titleI18nKey)
      if (!group) {
        group = {
          status: survey.survey.status,
          titleI18nKey,
          surveys: [],
        }
        acc.push(group)
      }

      group.surveys.push(survey)

      return acc
    },
    [] as {
      status: SurveyStatus
      titleI18nKey: string
      surveys: SurveyWithMetadata[]
    }[]
  )

  grouped.sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  )

  return (
    <>
      {grouped.map(({ titleI18nKey, surveys }) => (
        <div key={titleI18nKey} className="flex flex-col gap-4">
          <div className="link-text ml-2 flex flex-row items-center gap-3">
            <ArrowDropDown className="!h-4 !w-4 text-icon-primary" />

            <p className="text-text-secondary">{t(titleI18nKey)}</p>
          </div>

          <div className="flex flex-col gap-1">
            {surveys.map((survey) => (
              <SurveyRow key={survey.survey.uuid} survey={survey} />
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

const statusOrder: SurveyStatus[] = [
  SurveyStatus.Inactive,
  SurveyStatus.AcceptingContributions,
  SurveyStatus.AcceptingRatings,
  SurveyStatus.AwaitingCompletion,
  SurveyStatus.Complete,
]
