import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputErrorMessage, InputLabel, TextInput } from '@dao-dao/ui'
import {
  validateAddress,
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

export interface AuthzOptions {}

export const AuthzComponent: ActionComponent<AuthzOptions> = (props) => {
  const { t } = useTranslation()
  const { fieldNamePrefix, onRemove, errors, isCreating } = props
  const { register } = useFormContext()

  // TODO translations
  return (
    <ActionCard Icon={AuthzIcon} onRemove={onRemove} title={t('Authz')}>
      <div className="flex flex-col gap-1 items-stretch">
        <InputLabel name={`${t('Message type')}`} />
        <TextInput
          disabled={!isCreating}
          error={errors?.admin}
          fieldName={fieldNamePrefix + 'value.msgTypeUrl'}
          placeholder={!isCreating ? t('info.none') : 'Message Type URL'}
          register={register}
          validation={[(v: string) => validateRequired(v)]}
        />
        <InputErrorMessage error={errors?.admin} />
      </div>

      <div className="flex flex-col gap-1 items-stretch">
        <InputLabel name={`${t('Grantee')}`} />
        <TextInput
          disabled={!isCreating}
          error={errors?.admin}
          fieldName={fieldNamePrefix + 'value.grantee'}
          placeholder={!isCreating ? t('info.none') : 'juno...'}
          register={register}
          validation={[
            (v: string) =>
              validateAddress(v) || validateContractAddress(v, false),
          ]}
        />
        <InputErrorMessage error={errors?.admin} />
      </div>
    </ActionCard>
  )
}

export const AuthzIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.key')} symbol="🔑" />
}
