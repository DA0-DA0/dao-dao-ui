import { useTranslation } from 'react-i18next'

import { FormSwitchCard, NumbersEmoji } from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithEnableMultipleChoice,
} from '@dao-dao/types'

const EnableMultipleChoiceInput = ({
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

const EnableMultipleChoiceReview = ({
  data: { enableMultipleChoice },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithEnableMultipleChoice>) => {
  const { t } = useTranslation()
  return <>{enableMultipleChoice ? t('info.enabled') : t('info.disabled')}</>
}

export const makeEnableMultipleChoiceVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithEnableMultipleChoice> => ({
    Icon: NumbersEmoji,
    nameI18nKey: 'form.enableMultipleChoiceTitle',
    descriptionI18nKey: 'form.enableMultipleChoiceDescription',
    Input: EnableMultipleChoiceInput,
    getInputError: ({ enableMultipleChoice } = {}) => enableMultipleChoice,
    Review: EnableMultipleChoiceReview,
    getReviewClassName: ({ enableMultipleChoice }) =>
      enableMultipleChoice
        ? 'bg-component-badge-valid'
        : 'bg-component-badge-error',
  })
