import { useTranslation } from 'react-i18next'

import { FormSwitchCard, NumbersEmoji } from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithEnableMultipleChoice,
} from '@dao-dao/types'

const MultipleChoiceInput = ({
  data: { enableMultipleChoice },
  setValue,
}: DaoCreationVotingConfigItemInputProps<DaoCreationVotingConfigWithEnableMultipleChoice>) => (
  <FormSwitchCard
    containerClassName="self-start"
    fieldName="enableMultipleChoice"
    setValue={setValue}
    sizing="sm"
    value={enableMultipleChoice}
  />
)

const MultipleChoiceReview = ({
  data: { enableMultipleChoice },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithEnableMultipleChoice>) => {
  const { t } = useTranslation()
  return <>{enableMultipleChoice ? t('info.enabled') : t('info.disabled')}</>
}

export const makeMultipleChoiceVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithEnableMultipleChoice> => ({
    Icon: NumbersEmoji,
    nameI18nKey: 'form.multipleChoiceTitle',
    descriptionI18nKey: 'form.multipleChoiceDescription',
    Input: MultipleChoiceInput,
    getInputError: ({ enableMultipleChoice } = {}) => enableMultipleChoice,
    Review: MultipleChoiceReview,
    getReviewClassName: ({ enableMultipleChoice }) =>
      enableMultipleChoice
        ? 'bg-component-badge-valid'
        : 'bg-component-badge-error',
  })
