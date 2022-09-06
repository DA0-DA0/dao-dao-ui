import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  InputErrorMessage,
  InputLabel,
  SelectInput,
  TextInput,
} from '@dao-dao/ui'
import {
  validateAddress,
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

export interface AuthzOptions {}

export const AuthzAuthorizationComponent: ActionComponent<AuthzOptions> = (
  props
) => {
  const { t } = useTranslation()
  const { data, fieldNamePrefix, onRemove, errors, isCreating } = props
  const { register } = useFormContext()

  return (
    <ActionCard
      Icon={AuthzAuthorizationIcon}
      onRemove={onRemove}
      title={t('title.authzAuthorization')}
    >
      <div className="flex flex-col gap-1 items-stretch">
        <InputLabel name={t('form.grantOrRevokeAuthz')} />
        <SelectInput
          disabled={!isCreating}
          fieldName={fieldNamePrefix + 'type_url'}
          register={register}
        >
          <option value="/cosmos.authz.v1beta1.MsgGrant">
            {t('form.grantAuthorizationOption')}
          </option>
          <option value="/cosmos.authz.v1beta1.MsgRevoke">
            {t('form.revokeAuthorizationOption')}
          </option>
        </SelectInput>
      </div>

      <div className="flex flex-col gap-1 items-stretch">
        <InputLabel
          name={t('form.granteeAddress')}
          tooltip={t('form.granteeAddressTooltip')}
        />
        <TextInput
          disabled={!isCreating}
          error={errors?.value?.grantee}
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

      <div className="flex flex-col gap-1 items-stretch">
        <InputLabel name={t('form.messageType')} />
        <TextInput
          disabled={!isCreating}
          error={errors?.value?.msgTypeUrl}
          fieldName={fieldNamePrefix + 'value.msgTypeUrl'}
          placeholder={!isCreating ? t('info.none') : t('form.messageType')}
          register={register}
          validation={[(v: string) => validateRequired(v)]}
        />
        <InputErrorMessage error={errors?.admin} />
      </div>
    </ActionCard>
  )
}

export const AuthzAuthorizationIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.key')} symbol="🔑" />
}
