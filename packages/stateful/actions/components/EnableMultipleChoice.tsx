import { useTranslation } from 'react-i18next'

import { ActionComponent } from '@dao-dao/types/actions'

export const EnableMultipleChoiceComponent: ActionComponent = () => {
  const { t } = useTranslation()

  return (
    <p className="body-text max-w-prose">
      {t('info.enableMultipleChoiceProposalsExplanation')}
    </p>
  )
}
