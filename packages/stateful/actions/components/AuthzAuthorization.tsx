import JSON5 from 'json5'
import { ComponentType } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CodeMirrorInput,
  FormSwitchCard,
  InputErrorMessage,
  InputLabel,
  KeyEmoji,
  RadioInput,
  SegmentedControls,
  SelectInput,
  TextInput,
  Warning,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  GenericTokenBalance,
  LoadingData,
  TokenType,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  NATIVE_DENOM,
  makeWasmMessage,
  validateAddress,
  validateContractAddress,
  validateCosmosMsg,
  validateRequired,
} from '@dao-dao/utils'

import {
  AuthorizationTypeUrl,
  FilterTypes,
} from '../actions/AuthzAuthorization'
import { AuthzExecActionTypes } from '../actions/AuthzExec'
import { ActionCard } from './ActionCard'
import {
  NativeCoinSelector,
  NativeCoinSelectorProps,
} from './NativeCoinSelector'

export interface AuthzOptions {
  AddressInput: ComponentType<AddressInputProps>
  balances: LoadingData<GenericTokenBalance[]>
}

/*
   TODO later:
   - [] Warnings
   - [] Max calls limits?
   - [] Expires time?
 */

export const AuthzAuthorizationComponent: ActionComponent<AuthzOptions> = (
  props
) => {
  const { t } = useTranslation()
  const {
    fieldNamePrefix,
    onRemove,
    errors,
    isCreating,
    options: { AddressInput, balances },
  } = props
  const { control, register, setValue, watch } = useFormContext()

  const {
    fields: coins,
    append: appendCoin,
    remove: removeCoin,
  } = useFieldArray({
    control,
    name: fieldNamePrefix + 'funds',
  })

  const typeUrl = watch(fieldNamePrefix + 'typeUrl')
  const authorizationTypeUrl = watch(fieldNamePrefix + 'authorizationTypeUrl')
  const customTypeUrl = watch(fieldNamePrefix + 'customTypeUrl')
  const filterType = watch(fieldNamePrefix + 'filterType')

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
          selected={typeUrl}
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

        {typeUrl === '/cosmos.authz.v1beta1.MsgGrant' && (
          <Warning>{t('info.authzWarning')}</Warning>
        )}
      </div>

      <div className="flex flex-col items-stretch gap-1">
        <InputLabel
          name={t('form.granteeAddress')}
          tooltip={t('form.granteeAddressTooltip')}
        />
        <AddressInput
          disabled={!isCreating}
          error={errors?.grantee}
          fieldName={fieldNamePrefix + 'grantee'}
          placeholder={!isCreating ? t('info.none') : undefined}
          register={register}
          validation={[
            (v: string) =>
              validateAddress(v) || validateContractAddress(v, false),
          ]}
        />
        <InputErrorMessage error={errors?.grantee} />
      </div>

      {typeUrl === '/cosmos.authz.v1beta1.MsgGrant' && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('form.authzType')}
            tooltip={'form.authzTypeDescription'}
          />
          <SelectInput
            disabled={!isCreating}
            fieldName={fieldNamePrefix + 'authorizationTypeUrl'}
            register={register}
          >
            <option value={AuthorizationTypeUrl.Generic}>
              {t('form.generic')}
            </option>
            <option value={AuthorizationTypeUrl.Spend}>
              {t('title.spend')}
            </option>
            <option value={AuthorizationTypeUrl.ContractExecution}>
              {t('title.executeSmartContract')}
            </option>
            <option value={AuthorizationTypeUrl.ContractMigration}>
              {t('title.migrateSmartContract')}
            </option>
          </SelectInput>
        </div>
      )}

      {(authorizationTypeUrl === AuthorizationTypeUrl.Generic ||
        typeUrl === '/cosmos.authz.v1beta1.MsgRevoke') && (
        <>
          {!customTypeUrl ? (
            <div className="flex flex-col items-stretch gap-1">
              <InputLabel
                name={t('form.messageType')}
                tooltip={t('form.authzMessageType')}
              />
              <SelectInput
                disabled={!isCreating}
                fieldName={fieldNamePrefix + 'msgTypeUrl'}
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
                <option value={AuthzExecActionTypes.Vote}>
                  {t('title.vote')}
                </option>
                {typeUrl !== '/cosmos.authz.v1beta1.MsgGrant' && (
                  <>
                    <option value={AuthzExecActionTypes.Spend}>
                      {t('title.spend')}
                    </option>
                    <option value={AuthorizationTypeUrl.ContractExecution}>
                      {t('title.executeSmartContract')}
                    </option>
                    <option value={AuthorizationTypeUrl.ContractMigration}>
                      {t('title.migrateSmartContract')}
                    </option>
                  </>
                )}
              </SelectInput>
            </div>
          ) : (
            <div className="flex flex-col items-stretch gap-1">
              <InputLabel name={t('form.messageType')} />
              <TextInput
                disabled={!isCreating}
                error={errors?.msgTypeUrl}
                fieldName={fieldNamePrefix + 'msgTypeUrl'}
                placeholder={
                  !isCreating ? t('info.none') : t('form.messageType')
                }
                register={register}
                validation={[(v: string) => validateRequired(v)]}
              />
              <InputErrorMessage error={errors?.msgTypeUrl} />
            </div>
          )}

          {(isCreating || customTypeUrl) && (
            <FormSwitchCard
              containerClassName="self-start"
              fieldName={fieldNamePrefix + 'customTypeUrl'}
              label={t('form.authzUseCustomMessageType')}
              onToggle={
                // Set message type URL back to delegate if customTypeUrl is disabled.
                (customTypeUrl) =>
                  !customTypeUrl &&
                  setValue(
                    fieldNamePrefix + 'msgTypeUrl',
                    AuthzExecActionTypes.Delegate
                  )
              }
              readOnly={!isCreating}
              setValue={setValue}
              sizing="sm"
              tooltip={t('form.authzCustomMessageTypeTooltip')}
              tooltipIconSize="sm"
              value={watch(fieldNamePrefix + 'customTypeUrl')}
            />
          )}
        </>
      )}

      {authorizationTypeUrl === AuthorizationTypeUrl.Spend &&
        typeUrl === '/cosmos.authz.v1beta1.MsgGrant' && (
          <div className="flex flex-col gap-1">
            <InputLabel name={t('form.spendAuthorization')} />
            <div className="flex flex-col items-stretch gap-2">
              {coins.map(({ id }, index) => (
                <NativeCoinSelector
                  key={id}
                  {...({
                    ...props,
                    options: {
                      nativeBalances: balances.loading
                        ? { loading: true }
                        : {
                            loading: false,
                            data: balances.data.filter(
                              ({ token }) => token.type === TokenType.Native
                            ),
                          },
                    },
                    onRemove: isCreating ? () => removeCoin(index) : undefined,
                  } as NativeCoinSelectorProps)}
                  errors={errors?.funds?.[index]}
                  fieldNamePrefix={fieldNamePrefix + `funds.${index}.`}
                />
              ))}
              {!isCreating && coins.length === 0 && (
                <p className="mt-1 mb-2 text-xs italic text-text-tertiary">
                  {t('info.none')}
                </p>
              )}
              {isCreating && (
                <Button
                  className="self-start"
                  onClick={() => appendCoin({ amount: 1, denom: NATIVE_DENOM })}
                  variant="secondary"
                >
                  {t('button.addPayment')}
                </Button>
              )}
            </div>
          </div>
        )}

      {(authorizationTypeUrl === AuthorizationTypeUrl.ContractExecution ||
        authorizationTypeUrl === AuthorizationTypeUrl.ContractMigration) &&
        typeUrl === '/cosmos.authz.v1beta1.MsgGrant' && (
          <>
            <div className="flex flex-col items-stretch gap-1">
              <InputLabel name={t('form.smartContractAddress')} />
              <TextInput
                disabled={!isCreating}
                error={errors?.contract}
                fieldName={fieldNamePrefix + 'contract'}
                placeholder={!isCreating ? t('info.none') : undefined}
                register={register}
                validation={[
                  (v: string) =>
                    validateAddress(v) || validateContractAddress(v, false),
                ]}
              />
              <InputErrorMessage error={errors?.contract} />
            </div>

            <div className="flex flex-col items-stretch gap-1">
              <InputLabel
                name={t('form.permissions')}
                tooltip={t('form.permissionsDescription')}
              />
              <RadioInput
                fieldName={fieldNamePrefix + 'filterType'}
                options={[
                  { label: t('title.all'), value: FilterTypes.All },
                  { label: t('form.allowedMethods'), value: FilterTypes.Keys },
                  {
                    label: t('form.message'),
                    value: FilterTypes.Msg,
                  },
                ]}
                setValue={setValue}
                watch={watch}
              />
            </div>

            {filterType === FilterTypes.Keys && (
              <div className="flex flex-col items-stretch gap-1">
                <InputLabel name={t('form.allowedMethods')} />

                <TextInput
                  disabled={!isCreating}
                  error={errors?.filterKeys}
                  fieldName={fieldNamePrefix + 'filterKeys'}
                  register={register}
                  validation={[validateRequired]}
                />
                <InputErrorMessage error={errors?.filterKeys} />
              </div>
            )}

            {filterType === FilterTypes.Msg && (
              <div className="flex flex-col items-stretch gap-1">
                <InputLabel
                  name={t('form.smartContractMessage')}
                  tooltip={'The message to execute'}
                />

                <CodeMirrorInput
                  control={control}
                  error={errors?.filterMsg}
                  fieldName={fieldNamePrefix + 'filterMsg'}
                  readOnly={!isCreating}
                  validation={[
                    (v: string) => {
                      let msg
                      try {
                        msg = JSON5.parse(v)
                      } catch (err) {
                        return err instanceof Error ? err.message : `${err}`
                      }
                      msg = makeWasmMessage({
                        wasm: {
                          execute: {
                            contract_addr: '',
                            funds: [],
                            msg,
                          },
                        },
                      })
                      return (
                        validateCosmosMsg(msg).valid ||
                        t('error.invalidExecuteMessage')
                      )
                    },
                  ]}
                />
              </div>
            )}

            <InputLabel
              name={t('form.spendingLimit')}
              tooltip={t('form.spendingLimitDescription')}
            />
            <div className="flex flex-col items-stretch gap-2">
              {coins.map(({ id }, index) => (
                <NativeCoinSelector
                  key={id}
                  {...({
                    ...props,
                    options: {
                      nativeBalances: balances.loading
                        ? { loading: true }
                        : {
                            loading: false,
                            data: balances.data.filter(
                              ({ token }) => token.type === TokenType.Native
                            ),
                          },
                    },
                    onRemove: isCreating ? () => removeCoin(index) : undefined,
                  } as NativeCoinSelectorProps)}
                  errors={errors?.funds?.[index]}
                  fieldNamePrefix={fieldNamePrefix + `funds.${index}.`}
                />
              ))}
              {!isCreating && coins.length === 0 && (
                <p className="mt-1 mb-2 text-xs italic text-text-tertiary">
                  {t('info.none')}
                </p>
              )}
              {isCreating && (
                <Button
                  className="self-start"
                  onClick={() => appendCoin({ amount: 1, denom: NATIVE_DENOM })}
                  variant="secondary"
                >
                  {t('button.addPayment')}
                </Button>
              )}
            </div>
          </>
        )}
    </ActionCard>
  )
}
