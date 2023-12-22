import { useTranslation } from 'react-i18next'

import { FormSwitchCard, NumbersEmoji } from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithApprover,
  DaoCreationVotingConfigWithEnableMultipleChoice,
} from '@dao-dao/types'

const MultipleChoiceInput = ({
  data: { enableMultipleChoice, approver },
  setValue,
}: DaoCreationVotingConfigItemInputProps<
  DaoCreationVotingConfigWithEnableMultipleChoice &
    DaoCreationVotingConfigWithApprover
>) => {
  const { t } = useTranslation()

  return (
    <FormSwitchCard
      containerClassName="self-start"
      fieldName="enableMultipleChoice"
      readOnly={
        // Multiple choice does not work with an approver right now.
        approver.enabled
      }
      setValue={setValue}
      sizing="sm"
      tooltip={
        // Multiple choice does not work with an approver right now.
        approver.enabled ? t('info.approverEnabledNoMultipleChoice') : undefined
      }
      value={enableMultipleChoice}
    />
  )
}

const MultipleChoiceReview = ({
  data: { enableMultipleChoice },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithEnableMultipleChoice>) => {
  const { t } = useTranslation()
  return <>{enableMultipleChoice ? t('info.enabled') : t('info.disabled')}</>
}

export const makeMultipleChoiceVotingConfigItem =
  (): DaoCreationVotingConfigItem<
    DaoCreationVotingConfigWithEnableMultipleChoice &
      DaoCreationVotingConfigWithApprover
  > => ({
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
