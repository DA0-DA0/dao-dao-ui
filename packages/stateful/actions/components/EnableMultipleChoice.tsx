import { useTranslation } from 'react-i18next'

import { NumbersEmoji } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'

import { ActionCard } from './ActionCard'

export const EnableMultipleChoiceComponent: ActionComponent = ({
  onRemove,
}) => {
  const { t } = useTranslation()

  return (
    <ActionCard
      Icon={NumbersEmoji}
      onRemove={onRemove}
      title={t('title.enableMultipleChoiceProposals')}
    >
      <p className="body-text max-w-prose">
        {t('info.enableMultipleChoiceProposalsExplanation')}
      </p>
    </ActionCard>
  )
}
