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
  NativeCoinSelector,
  NativeCoinSelectorProps,
  NumberInput,
  RadioInput,
  SegmentedControlsTitle,
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
  validateNonNegative,
  validateRequired,
} from '@dao-dao/utils'

import {
  AuthorizationTypeUrl,
  AuthzExecActionTypes,
  FilterTypes,
  LimitTypes,
} from './types'

export type AuthzGrantRevokeOptions = {
  AddressInput: ComponentType<AddressInputProps>
  balances: LoadingData<GenericTokenBalance[]>
}

export const AuthzGrantRevokeComponent: ActionComponent<
  AuthzGrantRevokeOptions
> = (props) => {
  const { t } = useTranslation()
  const {
    fieldNamePrefix,
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

  const mode = watch(fieldNamePrefix + 'mode')
  const authorizationTypeUrl = watch(fieldNamePrefix + 'authorizationTypeUrl')
  const customTypeUrl = watch(fieldNamePrefix + 'customTypeUrl')
  const filterType = watch(fieldNamePrefix + 'filterType')
  const limitType = watch(fieldNamePrefix + 'limitType')

  return (
    <>
      <SegmentedControlsTitle
        editable={isCreating}
        fieldName={fieldNamePrefix + 'mode'}
        tabs={[
          {
            label: t('form.grantAuthorizationOption'),
            value: 'grant',
          },
          {
            label: t('form.revokeAuthorizationOption'),
            value: 'revoke',
          },
        ]}
      />

      {mode === 'grant' && <Warning>{t('info.authzWarning')}</Warning>}

      <div className="flex flex-col gap-1">
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

      {mode === 'grant' && (
        <div className="flex flex-col gap-1">
          <InputLabel
            name={t('form.authzType')}
            tooltip={t('form.authzTypeDescription')}
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
        mode === 'revoke') && (
        <>
          {!customTypeUrl ? (
            <div className="flex flex-col gap-1">
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
                <option value={AuthzExecActionTypes.Spend}>
                  {t('title.spend')}
                </option>
                <option value={AuthzExecActionTypes.Execute}>
                  {t('title.executeSmartContract')}
                </option>
                <option value={AuthzExecActionTypes.Migrate}>
                  {t('title.migrateSmartContract')}
                </option>
              </SelectInput>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <InputLabel name={t('form.messageType')} />
              <TextInput
                disabled={!isCreating}
                error={errors?.msgTypeUrl}
                fieldName={fieldNamePrefix + 'msgTypeUrl'}
                placeholder={
                  !isCreating ? t('info.none') : t('form.messageType')
                }
                register={register}
                validation={[validateRequired]}
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

      {authorizationTypeUrl === AuthorizationTypeUrl.Spend && mode === 'grant' && (
        <div className="flex flex-col gap-1">
          <InputLabel
            name={t('form.spendingAllowance')}
            tooltip={t('form.spendingAllowanceDescription')}
          />

          {isCreating || coins.length > 0 ? (
            <div className="flex flex-col items-stretch gap-1">
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
            </div>
          ) : (
            <p className="text-xs italic text-text-tertiary">
              {t('info.none')}
            </p>
          )}

          {isCreating && (
            <Button
              className="mt-2 self-start"
              onClick={() => appendCoin({ amount: 1, denom: NATIVE_DENOM })}
              variant="secondary"
            >
              {t('button.addAllowance')}
            </Button>
          )}
        </div>
      )}

      {(authorizationTypeUrl === AuthorizationTypeUrl.ContractExecution ||
        authorizationTypeUrl === AuthorizationTypeUrl.ContractMigration) &&
        mode === 'grant' && (
          <>
            <div className="flex flex-col gap-1">
              <InputLabel name={t('form.smartContractAddress')} />
              <AddressInput
                disabled={!isCreating}
                error={errors?.contract}
                fieldName={fieldNamePrefix + 'contract'}
                register={register}
                type="contract"
                validation={[validateContractAddress]}
              />
              <InputErrorMessage error={errors?.contract} />
            </div>

            <div className="flex flex-col gap-1">
              <InputLabel
                name={t('form.contractPermissions')}
                tooltip={t('form.contractPermissionsDescription')}
              />

              <RadioInput
                disabled={!isCreating}
                fieldName={fieldNamePrefix + 'filterType'}
                options={[
                  { label: t('title.all'), value: FilterTypes.All },
                  { label: t('form.allowedMethods'), value: FilterTypes.Keys },
                  {
                    label: t('form.message'),
                    value: FilterTypes.Msgs,
                  },
                ]}
                setValue={setValue}
                watch={watch}
              />
            </div>

            {filterType === FilterTypes.Keys && (
              <div className="flex flex-col gap-1">
                <InputLabel
                  name={t('form.allowedMethods')}
                  tooltip={t('form.allowedMethodsDescription')}
                />

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

            {filterType === FilterTypes.Msgs && (
              <div className="flex flex-col gap-1">
                <InputLabel
                  name={t('form.smartContractMessage')}
                  tooltip={t('form.smartContractMessageDescription')}
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

            <div className="flex flex-col gap-1">
              <InputLabel
                name={t('form.limits')}
                tooltip={t('form.authzLimitsDescription')}
              />

              <RadioInput
                disabled={!isCreating}
                fieldName={fieldNamePrefix + 'limitType'}
                options={[
                  { label: t('form.calls'), value: LimitTypes.Calls },
                  { label: t('form.funds'), value: LimitTypes.Funds },
                  {
                    label: t('form.combined'),
                    value: LimitTypes.Combined,
                  },
                ]}
                setValue={setValue}
                watch={watch}
              />
            </div>

            {(limitType === LimitTypes.Calls ||
              limitType === LimitTypes.Combined) && (
              <div className="flex flex-col gap-1">
                <InputLabel
                  name={t('form.calls')}
                  tooltip={t('form.callsDescription')}
                />

                <NumberInput
                  containerClassName="grow"
                  disabled={!isCreating}
                  error={errors?.calls}
                  fieldName={fieldNamePrefix + 'calls'}
                  min={0}
                  register={register}
                  setValue={setValue}
                  sizing="md"
                  step={1}
                  validation={[validateNonNegative, validateRequired]}
                  watch={watch}
                />
              </div>
            )}

            {(limitType === LimitTypes.Funds ||
              limitType === LimitTypes.Combined) && (
              <div className="flex flex-col gap-1">
                <InputLabel
                  name={t('form.spendingAllowance')}
                  tooltip={t('form.spendingAllowanceDescription')}
                />

                {isCreating || coins.length > 0 ? (
                  <div className="flex flex-col gap-1">
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
                                    ({ token }) =>
                                      token.type === TokenType.Native
                                  ),
                                },
                          },
                          onRemove: isCreating
                            ? () => removeCoin(index)
                            : undefined,
                        } as NativeCoinSelectorProps)}
                        errors={errors?.funds?.[index]}
                        fieldNamePrefix={fieldNamePrefix + `funds.${index}.`}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs italic text-text-tertiary">
                    {t('info.none')}
                  </p>
                )}

                {isCreating && (
                  <Button
                    className="mt-2 self-start"
                    onClick={() =>
                      appendCoin({ amount: 1, denom: NATIVE_DENOM })
                    }
                    variant="secondary"
                  >
                    {t('button.addAllowance')}
                  </Button>
                )}
              </div>
            )}
          </>
        )}
    </>
  )
}
