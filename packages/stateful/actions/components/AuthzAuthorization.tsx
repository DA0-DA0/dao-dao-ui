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
  TokenType,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  makeWasmMessage,
  NATIVE_DENOM,
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
  balances: GenericTokenBalance[]
}

/*
   TODO now:
   - [] Hide authorization type on revoke
   - [] Wire up and test encoders
   - [] Check errors and validation work
   - [] Support revoking contract related authorizations

   TODO later:
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

  // TODO rename?
  const grantOrRevoke = watch(fieldNamePrefix + 'typeUrl')
  const authorizationTypeUrl = watch(fieldNamePrefix + 'authorizationTypeUrl')
  const custom = watch(fieldNamePrefix + 'custom')

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

        {grantOrRevoke === '/cosmos.authz.v1beta1.MsgGrant' && (
          <Warning>
            USE WITH CAUTION! Granting an Authorization allows another account
            to perform actions on behalf of your account.
          </Warning>
        )}
      </div>

      <div className="flex flex-col items-stretch gap-1">
        <InputLabel
          name={t('form.granteeAddress')}
          tooltip={t('form.granteeAddressTooltip')}
        />
        <AddressInput
          disabled={!isCreating}
          error={errors?.value?.grantee}
          fieldName={fieldNamePrefix + 'value.grant.grantee'}
          placeholder={!isCreating ? t('info.none') : undefined}
          register={register}
          validation={[
            (v: string) =>
              validateAddress(v) || validateContractAddress(v, false),
          ]}
        />
        <InputErrorMessage error={errors?.value?.grantee} />
      </div>

      {grantOrRevoke === '/cosmos.authz.v1beta1.MsgGrant' && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={'Authorization Type'}
            tooltip={'The type of authorization to grant or revoke'}
          />
          <SelectInput
            disabled={!isCreating}
            fieldName={fieldNamePrefix + 'authorizationTypeUrl'}
            register={register}
          >
            <option value={AuthorizationTypeUrl.Generic}>
              Generic Authorization
            </option>
            <option value={AuthorizationTypeUrl.Spend}>Spend</option>
            <option value={AuthorizationTypeUrl.ContractExecution}>
              Contract Execution
            </option>
            <option value={AuthorizationTypeUrl.ContractMigration}>
              Contract Migration
            </option>
          </SelectInput>
        </div>
      )}

      {authorizationTypeUrl === AuthorizationTypeUrl.Generic && (
        <>
          {!custom ? (
            <div className="flex flex-col items-stretch gap-1">
              <InputLabel
                name={t('form.messageType')}
                tooltip={
                  'The type of Cosmos Message to grant / revoke an authorization for.'
                }
              />
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
                {grantOrRevoke !== '/cosmos.authz.v1beta1.MsgGrant' && (
                  <>
                    <option value={AuthzExecActionTypes.Spend}>Spend</option>
                    <option value={AuthorizationTypeUrl.ContractExecution}>
                      Contract Execution
                    </option>
                    <option value={AuthorizationTypeUrl.ContractMigration}>
                      Contract Migration
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
                error={errors?.value?.msgTypeUrl}
                fieldName={fieldNamePrefix + 'value.msgTypeUrl'}
                placeholder={
                  !isCreating ? t('info.none') : t('form.messageType')
                }
                register={register}
                validation={[(v: string) => validateRequired(v)]}
              />
              <InputErrorMessage error={errors?.value?.msgTypeUrl} />
            </div>
          )}

          {(isCreating || custom) && (
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
        </>
      )}

      {authorizationTypeUrl === AuthorizationTypeUrl.Spend && (
        <div className="flex flex-col gap-1">
          <InputLabel name={'Spend Authorization'} />
          <div className="flex flex-col items-stretch gap-2">
            {coins.map(({ id }, index) => (
              <NativeCoinSelector
                key={id}
                {...({
                  ...props,
                  options: {
                    nativeBalances: props.options.balances.filter(
                      ({ token }) => token.type === TokenType.Native
                    ),
                  },
                  onRemove: props.isCreating
                    ? () => removeCoin(index)
                    : undefined,
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
        authorizationTypeUrl === AuthorizationTypeUrl.ContractMigration) && (
        <>
          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={'Contract Address'} />
            <AddressInput
              disabled={!isCreating}
              error={errors?.value?.grantee}
              fieldName={fieldNamePrefix + 'value.grant.grantee'}
              placeholder={!isCreating ? t('info.none') : undefined}
              register={register}
              validation={[
                (v: string) =>
                  validateAddress(v) || validateContractAddress(v, false),
              ]}
            />
            <InputErrorMessage error={errors?.value?.grantee} />
          </div>

          <div className="flex flex-col items-stretch gap-1">
            <InputLabel name={'Msg Keys'} />

            <RadioInput
              fieldName={fieldNamePrefix + 'filterType'}
              options={[
                { label: 'All', value: FilterTypes.All },
                { label: 'Keys', value: FilterTypes.Keys },
                { label: 'Msg', value: FilterTypes.Msg },
              ]}
              setValue={setValue}
              watch={watch}
            />
          </div>

          {filterType === FilterTypes.Keys && (
            <div className="flex flex-col items-stretch gap-1">
              <InputLabel name={'Msg Keys'} />

              <TextInput
                disabled={!isCreating}
                error={errors?.key}
                fieldName={fieldNamePrefix + 'key'}
                register={register}
                validation={[validateRequired]}
              />
              <InputErrorMessage error={errors?.key} />
            </div>
          )}

          {filterType === FilterTypes.Msg && (
            <div className="flex flex-col items-stretch gap-1">
              <InputLabel name={'Message'} tooltip={'The message to execute'} />

              <CodeMirrorInput
                control={control}
                error={errors?.message}
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
            name={'Spending limit'}
            tooltip={
              'The amount of funds to be spendable with smart contract calls'
            }
          />
          <div className="flex flex-col items-stretch gap-2">
            {coins.map(({ id }, index) => (
              <NativeCoinSelector
                key={id}
                {...({
                  ...props,
                  options: {
                    nativeBalances: props.options.balances.filter(
                      ({ token }) => token.type === TokenType.Native
                    ),
                  },
                  onRemove: props.isCreating
                    ? () => removeCoin(index)
                    : undefined,
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
