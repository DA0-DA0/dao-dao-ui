import { useTranslation } from 'react-i18next'

import { FormSwitchCard, RecycleEmoji } from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithAllowRevoting,
} from '@dao-dao/types'

const AllowRevotingInput = ({
  data: { allowRevoting },
  setValue,
}: DaoCreationVotingConfigItemInputProps<DaoCreationVotingConfigWithAllowRevoting>) => {
  const { t } = useTranslation()

  return (
    <FormSwitchCard
      containerClassName="self-start"
      fieldName="allowRevoting"
      offLabel={t('info.no')}
      onLabel={t('info.yes')}
      setValue={setValue}
      sizing="sm"
      value={allowRevoting}
    />
  )
}

const AllowRevotingReview = ({
  data: { allowRevoting },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithAllowRevoting>) => {
  const { t } = useTranslation()
  return <>{allowRevoting ? t('info.yes') : t('info.no')}</>
}

export const makeAllowRevotingVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithAllowRevoting> => ({
    Icon: RecycleEmoji,
    nameI18nKey: 'form.allowRevotingTitle',
    descriptionI18nKey: 'form.allowRevotingDescription',
    Input: AllowRevotingInput,
    getInputError: ({ allowRevoting } = {}) => allowRevoting,
    Review: AllowRevotingReview,
    getReviewClassName: ({ allowRevoting }) =>
      allowRevoting ? 'bg-component-badge-valid' : 'bg-component-badge-error',
  })
