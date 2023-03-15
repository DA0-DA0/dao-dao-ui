import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormSwitchCard,
  InputErrorMessage,
  InputLabel,
  KeyEmoji,
  SegmentedControls,
  SelectInput,
  TextInput,
} from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  validateAddress,
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils'

import { AuthzExecActionTypes } from '../actions/AuthzExec'
import { ActionCard } from './ActionCard'

export interface AuthzOptions {
  AddressInput: ComponentType<AddressInputProps>
}

/*
   TODO now:
   - [] Hide custom message type switch
   - [] Attach funding limits
   - [] Msg filter (keys)
   - [] Accepted Msgs (json)
   - [] Warning

   TODO later:
   - [] Tabs for grant / revoke?
   - [] Max calls limits?
   - [] Expires time?
 */

export const AuthzAuthorizationComponent: ActionComponent<AuthzOptions> = (
  props
) => {
  const { t } = useTranslation()
  const {
    data,
    fieldNamePrefix,
    onRemove,
    errors,
    isCreating,
    options: { AddressInput },
  } = props
  const { register, setValue, watch } = useFormContext()

  const grantOrRevoke = watch(fieldNamePrefix + 'typeUrl')

  return (
    <ActionCard
      Icon={KeyEmoji}
      onRemove={onRemove}
      title={t('title.authzAuthorization')}
    >
      <div className="flex flex-col items-stretch gap-1">
        <SegmentedControls<string>
          className="mb-4"
          disabled={!isCreating}
          onSelect={(value) => setValue(fieldNamePrefix + 'typeUrl', value)}
          selected={grantOrRevoke}
          tabs={[
            {
              label: t('form.grantAuthorizationOption'),
              value: '/cosmos.authz.v1beta1.MsgGrant',
            },
            {
              label: t('form.revokeAuthorizationOption'),
              value: '/cosmos.authz.v1beta1.MsgRevoke',
            },
          ]}
        />

        {/* <InputLabel name={t('form.grantOrRevokeAuthz')} />
              <SelectInput
              disabled={!isCreating}
              fieldName={fieldNamePrefix + 'typeUrl'}
              register={register}
              >
              <option value="/cosmos.authz.v1beta1.MsgGrant">
              {t('form.grantAuthorizationOption')}
              </option>
              <option value="/cosmos.authz.v1beta1.MsgRevoke">
              {t('form.revokeAuthorizationOption')}
              </option>
              </SelectInput> */}
      </div>

      <div className="flex flex-col items-stretch gap-1">
        <InputLabel
          name={t('form.granteeAddress')}
          tooltip={t('form.granteeAddressTooltip')}
        />
        <AddressInput
          disabled={!isCreating}
          error={errors?.value?.grantee}
          fieldName={fieldNamePrefix + 'value.grantee'}
          placeholder={!isCreating ? t('info.none') : undefined}
          register={register}
          validation={[
            (v: string) =>
              validateAddress(v) || validateContractAddress(v, false),
          ]}
        />
        <InputErrorMessage error={errors?.value?.grantee} />
      </div>

      {!data.custom ? (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel name={t('form.messageType')} />
          <SelectInput
            disabled={!isCreating}
            fieldName={fieldNamePrefix + 'value.msgTypeUrl'}
            register={register}
          >
            <option value={AuthzExecActionTypes.Delegate}>
              {t('info.stake')}
            </option>
            <option value={AuthzExecActionTypes.Undelegate}>
              {t('info.unstake')}
            </option>
            <option value={AuthzExecActionTypes.Redelegate}>
              {t('info.redelegate')}
            </option>
            <option value={AuthzExecActionTypes.ClaimRewards}>
              {t('info.withdrawStakingRewards')}
            </option>
            <option value={AuthzExecActionTypes.Vote}>Vote</option>
            <option value={AuthzExecActionTypes.Execute}>
              Execute Smart Contract
            </option>
            <option value={AuthzExecActionTypes.Migrate}>
              Migrate Smart Contract
            </option>
            {/* <option value={AuthzExecActionTypes.Custom}>
                Custom SDK Message
                </option> */}
          </SelectInput>
        </div>
      ) : (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel name={t('form.messageType')} />
          <TextInput
            disabled={!isCreating}
            error={errors?.value?.msgTypeUrl}
            fieldName={fieldNamePrefix + 'value.msgTypeUrl'}
            placeholder={!isCreating ? t('info.none') : t('form.messageType')}
            register={register}
            validation={[(v: string) => validateRequired(v)]}
          />
          <InputErrorMessage error={errors?.value?.msgTypeUrl} />
        </div>
      )}

      {(isCreating || data.custom) && (
        <FormSwitchCard
          containerClassName="self-start"
          fieldName={fieldNamePrefix + 'custom'}
          label={t('form.authzUseCustomMessageType')}
          onToggle={
            // Set message type URL back to delegate if custom is disabled.
            (custom) =>
              !custom &&
              setValue(
                fieldNamePrefix + 'value.msgTypeUrl',
                AuthzExecActionTypes.Delegate
              )
          }
          readOnly={!isCreating}
          setValue={setValue}
          sizing="sm"
          tooltip={t('form.authzCustomMessageTypeTooltip')}
          tooltipIconSize="sm"
          value={watch(fieldNamePrefix + 'custom')}
        />
      )}
    </ActionCard>
  )
}
