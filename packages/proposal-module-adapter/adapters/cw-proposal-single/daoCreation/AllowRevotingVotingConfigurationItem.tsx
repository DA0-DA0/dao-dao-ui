import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

import {
  DaoCreationConfigItem,
  DaoCreationConfigItemInputProps,
} from '@dao-dao/tstypes'
import { FormSwitchCard } from '@dao-dao/ui'

import { DaoCreationConfig } from '../types'

export const AllowRevotingIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.recycle')} symbol="♻️" />
}

export const AllowRevotingInput = ({
  data: { allowRevoting },
  setValue,
}: DaoCreationConfigItemInputProps<DaoCreationConfig>) => {
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

export const AllowRevotingVotingConfigurationItem: DaoCreationConfigItem<DaoCreationConfig> =
  {
    Icon: AllowRevotingIcon,
    nameI18nKey: 'form.allowRevotingTitle',
    descriptionI18nKey: 'form.allowRevotingDescription',
    Input: AllowRevotingInput,
  }
