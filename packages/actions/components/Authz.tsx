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

export const AuthzComponent: ActionComponent<AuthzOptions> = (props) => {
  const { t } = useTranslation()
  const { fieldNamePrefix, onRemove, errors, isCreating } = props
  const { register } = useFormContext()

  // TODO translations
  return (
    <ActionCard Icon={AuthzIcon} onRemove={onRemove} title="Authz">
      <div className="flex flex-col gap-1 items-stretch">
        <SelectInput
          disabled={!isCreating}
          fieldName={fieldNamePrefix + 'type_url'}
          register={register}
        >
          <option value="/cosmos.authz.v1beta1.MsgExec">
            Execute Authz TX
          </option>
          <option value="/cosmos.authz.v1beta1.MsgGrant">
            Grant Authorization
          </option>
          <option value="/cosmos.authz.v1beta1.MsgRevoke">
            Revoke Authorization
          </option>
        </SelectInput>

        <InputLabel name="Message type" />
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
        <InputLabel name="Grantee" />
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
