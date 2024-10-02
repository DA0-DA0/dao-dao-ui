import { Check, Close, Tag } from '@mui/icons-material'
import JSON5 from 'json5'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AccountSelector,
  AddressInput,
  Button,
  CodeMirrorInput,
  CopyToClipboard,
  ErrorPage,
  HugeDecimalInput,
  InputErrorMessage,
  InputLabel,
  NativeCoinSelector,
  TextInput,
  useActionOptions,
  useChain,
} from '@dao-dao/stateless'
import {
  GenericTokenBalance,
  LoadingData,
  LoadingDataWithError,
} from '@dao-dao/types'
import { ActionComponent, ActionContextType } from '@dao-dao/types/actions'
import {
  getNativeTokenForChainId,
  makeValidateAddress,
  makeWasmMessage,
  validateCosmosMsgForChain,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type Instantiate2Data = {
  chainId: string
  sender: string
  admin: string
  codeId: number
  label: string
  message: string
  salt: string
  funds: {
    denom: string
    amount: string
    // Will multiply `amount` by 10^decimals when generating the message.
    decimals: number
  }[]
}

export type Instantiate2Options = {
  nativeBalances: LoadingData<GenericTokenBalance[]>
  predictedAddress: LoadingDataWithError<string>
}

export const Instantiate2Component: ActionComponent<Instantiate2Options> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { predictedAddress, nativeBalances },
}) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()
  const { chain_id: chainId, bech32_prefix: bech32Prefix } = useChain()

  const { watch, setValue, register, control } = useFormContext()
  const {
    fields: coins,
    append: appendCoin,
    remove: removeCoin,
  } = useFieldArray({
    control,
    name: fieldNamePrefix + 'funds',
  })

  const codeId = watch((fieldNamePrefix + 'codeId') as 'codeId')

  const nativeToken = getNativeTokenForChainId(chainId)

  const sender = watch((fieldNamePrefix + 'sender') as 'sender')
  const chainAccounts = context.accounts.filter((a) => a.chainId === chainId)
  const selectedAccount = context.accounts.find(
    (a) => a.chainId === chainId && a.address === sender
  )

  return (
    <>
      {context.type === ActionContextType.Dao && (
        // Show accounts on the selected chain in case there are more than one
        // to choose from.
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('title.account')}
            tooltip={t('info.instantiatorAccountTooltip')}
          />

          <AccountSelector
            accounts={chainAccounts}
            disabled={
              !isCreating ||
              // If only one chain account to select and it's selected, disable
              // input since there's nothing to change. If more than one
              // potential account, or the only account isn't selected, let them
              // change the account.
              (chainAccounts.length === 1 &&
                selectedAccount === chainAccounts[0])
            }
            hideChainImage
            onSelect={({ address }) =>
              setValue((fieldNamePrefix + 'sender') as 'sender', address)
            }
            selectedAccount={selectedAccount}
          />
        </div>
      )}

      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel name={t('form.codeId')} />
          <HugeDecimalInput
            disabled={!isCreating}
            error={errors?.codeId}
            fieldName={fieldNamePrefix + 'codeId'}
            min={1}
            numericValue
            register={register}
            sizing="sm"
            step={1}
            validation={[validateRequired, validatePositive]}
          />
          <InputErrorMessage error={errors?.codeId} />
        </div>

        <div className="flex grow flex-col items-stretch gap-1">
          <InputLabel name={t('form.contractLabel')} />
          <TextInput
            disabled={!isCreating}
            error={errors?.label}
            fieldName={fieldNamePrefix + 'label'}
            register={register}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.label} />
        </div>
      </div>

      <div className="flex grow flex-col items-stretch gap-1">
        <InputLabel name={t('form.salt')} />
        <TextInput
          disabled={!isCreating}
          error={errors?.salt}
          fieldName={fieldNamePrefix + 'salt'}
          register={register}
          validation={[validateRequired]}
        />
        <InputErrorMessage error={errors?.salt} />
      </div>

      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.message')} />
        <CodeMirrorInput
          control={control}
          error={errors?.message}
          fieldName={fieldNamePrefix + 'message'}
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
                  instantiate: {
                    admin: null,
                    code_id: 0,
                    funds: [],
                    label: '',
                    msg,
                  },
                },
              })

              try {
                validateCosmosMsgForChain(chainId, msg)
              } catch (err) {
                return err instanceof Error ? err.message : `${err}`
              }

              return true
            },
          ]}
        />

        {errors?.message ? (
          <p className="mt-1 flex items-center gap-1 text-sm text-text-interactive-error">
            <Close className="!h-5 !w-5" />{' '}
            <span>{errors.message.message}</span>
          </p>
        ) : (
          <p className="mt-1 flex items-center gap-1 text-sm text-text-interactive-valid">
            <Check className="!h-5 w-5" /> {t('info.jsonIsValid')}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.funds')} />
        <div className="flex flex-col items-stretch gap-2">
          {coins.map(({ id }, index) => (
            <NativeCoinSelector
              key={id + index}
              errors={errors?.funds?.[index]}
              fieldNamePrefix={fieldNamePrefix + `funds.${index}.`}
              isCreating={isCreating}
              onRemove={isCreating ? () => removeCoin(index) : undefined}
              tokens={nativeBalances}
            />
          ))}
          {!isCreating && coins.length === 0 && (
            <p className="mt-1 mb-2 text-xs italic text-text-tertiary">
              {t('info.none')}
            </p>
          )}
          {isCreating && (
            <Button
              className="mb-2 self-start"
              onClick={() =>
                appendCoin({
                  amount: 1,
                  denom: nativeToken.denomOrAddress,
                  decimals: nativeToken.decimals,
                })
              }
              variant="secondary"
            >
              {t('button.addPayment')}
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-1">
        <InputLabel name={`${t('form.admin')} (${t('form.optional')})`} />
        <AddressInput
          disabled={!isCreating}
          error={errors?.admin}
          fieldName={fieldNamePrefix + 'admin'}
          placeholder={!isCreating ? t('info.none') : undefined}
          register={register}
          type="contract"
          validation={[makeValidateAddress(bech32Prefix, false)]}
        />
        <InputErrorMessage error={errors?.admin} />
      </div>

      {!!codeId && !isNaN(codeId) && codeId > 0 && (
        <div className="flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-md bg-background-tertiary border border-border-interactive-hover p-4 mt-1">
          <div className="flex flex-row gap-1.5 items-center">
            <Tag className="!h-6 !w-6" />

            <p className="primary-text text-base shrink-0">
              {t('info.predictedAddress')}
            </p>
          </div>

          {predictedAddress.loading ? (
            <p className="secondary-text">{t('info.loading')}</p>
          ) : predictedAddress.errored ? (
            <ErrorPage error={predictedAddress.error} />
          ) : (
            <CopyToClipboard
              className="min-w-0"
              takeAll
              tooltip={t('button.clickToCopyAddress')}
              value={predictedAddress.data}
            />
          )}
        </div>
      )}
    </>
  )
}
