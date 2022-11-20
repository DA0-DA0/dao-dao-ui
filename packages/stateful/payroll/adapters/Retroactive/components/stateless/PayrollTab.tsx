import { useTranslation } from 'react-i18next'

import { NewSurvey, Status } from '../../types'
import { NewSurveyForm } from './NewSurveyForm'

export interface PayrollTabProps {
  status: Status | undefined
  isMember: boolean
  onCreate: (newSurvey: NewSurvey) => Promise<void>
  createLoading: boolean
}

export const PayrollTab = ({
  status,
  isMember,
  onCreate,
  createLoading,
}: PayrollTabProps) => {
  const { t } = useTranslation()

  return (
    <div>
      {status ? (
        <>
          <pre>{JSON.stringify(status, undefined, 2)}</pre>
        </>
      ) : (
        <>
          <p>{t('info.noActiveSurvey')}</p>

          {isMember && (
            <div className="mt-6">
              <NewSurveyForm loading={createLoading} onCreate={onCreate} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
