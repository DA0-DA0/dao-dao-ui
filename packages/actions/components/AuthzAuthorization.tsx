import { InformationCircleIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormSwitch,
  InputErrorMessage,
  InputLabel,
  SelectInput,
  TextInput,
  Tooltip,
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
  const { register, setValue, watch } = useFormContext()

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

      {!data.custom ? (
        <div className="flex flex-col gap-1 items-stretch">
          <InputLabel name={t('form.messageType')} />
          <SelectInput
            disabled={!isCreating}
            fieldName={fieldNamePrefix + 'value.msgTypeUrl'}
            register={register}
          >
            <option value="/cosmos.staking.v1beta1.MsgDelegate">
              {t('info.stake')}
            </option>
            <option value="/cosmos.staking.v1beta1.MsgUndelegate">
              {t('info.unstake')}
            </option>
            <option value="/cosmos.staking.v1beta1.MsgBeginRedelegate">
              {t('info.redelegate')}
            </option>
            <option value="/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward">
              {t('info.withdrawStakingRewards')}
            </option>
          </SelectInput>
        </div>
      ) : (
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
          <InputErrorMessage error={errors?.value?.msgTypeUrl} />
        </div>
      )}

      <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 bg-card rounded-md">
        <div className="flex flex-row gap-1">
          <Tooltip label={t('form.authzCustomMessageTypeTooltip')}>
            <InformationCircleIcon className="w-4 h-4 secondary-text" />
          </Tooltip>

          <p className="w-max secondary-text">
            {t('form.authzUseCustomMessageType')}
          </p>
        </div>
        <FormSwitch
          fieldName={fieldNamePrefix + 'custom'}
          readOnly={!isCreating}
          setValue={setValue}
          sizing="sm"
          watch={watch}
        />
      </div>
    </ActionCard>
  )
}

export const AuthzAuthorizationIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.key')} symbol="🔑" />
}
