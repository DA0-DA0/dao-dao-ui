import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
} from '@dao-dao/types'
import { FormSwitchCard } from '@dao-dao/stateless'

import { DaoCreationConfig } from '../types'

export const AllowRevotingIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.recycle')} symbol="♻️" />
}

export const AllowRevotingInput = ({
  data: { allowRevoting },
  setValue,
}: DaoCreationVotingConfigItemInputProps<DaoCreationConfig>) => {
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

export const AllowRevotingReview = ({
  data: { allowRevoting },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationConfig>) => {
  const { t } = useTranslation()
  return <>{allowRevoting ? t('info.yes') : t('info.no')}</>
}

export const AllowRevotingVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationConfig> =
  {
    Icon: AllowRevotingIcon,
    nameI18nKey: 'form.allowRevotingTitle',
    descriptionI18nKey: 'form.allowRevotingDescription',
    Input: AllowRevotingInput,
    getInputError: ({ allowRevoting } = {}) => allowRevoting,
    Review: AllowRevotingReview,
    getReviewClassName: ({ allowRevoting }) =>
      allowRevoting ? 'bg-component-badge-valid' : 'bg-component-badge-error',
  }
