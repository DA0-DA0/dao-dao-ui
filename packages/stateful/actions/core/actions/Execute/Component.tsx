import { Check, Close } from '@mui/icons-material'
import JSON5 from 'json5'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  AccountSelector,
  AddressInput,
  Button,
  CodeMirrorInput,
  FormSwitchCard,
  InputErrorMessage,
  InputLabel,
  NativeCoinSelector,
  TokenInput,
  useActionOptions,
  useChain,
} from '@dao-dao/stateless'
import { GenericTokenBalance, LoadingData, TokenType } from '@dao-dao/types'
import { ActionComponent, ActionContextType } from '@dao-dao/types/actions'
import {
  getNativeTokenForChainId,
  makeValidateAddress,
  makeWasmMessage,
  validateCosmosMsgForChain,
  validateRequired,
} from '@dao-dao/utils'

export type ExecuteData = {
  chainId: string
  sender: string
  address: string
  message: string
  funds: {
    denom: string
    amount: number
    // Will multiply `amount` by 10^decimals when generating the message.
    decimals: number
  }[]
  // Whether or not we're executing via a CW20 send.
  cw20: boolean
}

export type ExecuteOptions = {
  tokens: LoadingData<GenericTokenBalance[]>
  // Only present once executed.
  instantiatedAddress?: string
}

export const ExecuteComponent: ActionComponent<ExecuteOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { tokens },
}) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()
  const { chain_id: chainId, bech32_prefix: bech32Prefix } = useChain()

  const { register, control, watch, setValue } = useFormContext()
  const {
    fields: coins,
    append: appendCoin,
    remove: removeCoin,
  } = useFieldArray({
    control,
    name: fieldNamePrefix + 'funds',
  })

  const cw20Tokens = tokens.loading
    ? []
    : tokens.data.filter(
        ({ token }) =>
          token.chainId === chainId && token.type === TokenType.Cw20
      )
  const cw20 = watch(fieldNamePrefix + 'cw20') as boolean
  const firstDenom = (
    watch(fieldNamePrefix + 'funds.0') as ExecuteData['funds'][0] | undefined
  )?.denom
  const selectedCw20 = cw20Tokens.find(
    ({ token }) => token.denomOrAddress === firstDenom
  )

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
            tooltip={t('info.executorAccountTooltip')}
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

      <div className="flex flex-col items-stretch gap-1">
        <InputLabel name={t('form.smartContractAddress')} />
        <AddressInput
          disabled={!isCreating}
          error={errors?.address}
          fieldName={fieldNamePrefix + 'address'}
          register={register}
          type="contract"
          validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
        />
        <InputErrorMessage error={errors?.address} />
      </div>

      <div className="flex flex-col items-stretch gap-1">
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
                  execute: {
                    contract_addr: '',
                    funds: [],
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
            <Check className="!h-5 !w-5" /> {t('info.jsonIsValid')}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.funds')} />

        <div className="flex flex-row flex-wrap items-end justify-between gap-6">
          <div className="flex grow flex-col gap-1">
            {cw20 ? (
              <TokenInput
                amount={{
                  watch,
                  setValue,
                  register,
                  fieldName: fieldNamePrefix + 'funds.0.amount',
                  error: errors?.funds?.[0]?.amount,
                  min: HugeDecimal.one.toHumanReadableNumber(
                    selectedCw20?.token.decimals ?? 0
                  ),
                  step: HugeDecimal.one.toHumanReadableNumber(
                    selectedCw20?.token.decimals ?? 0
                  ),
                }}
                onSelectToken={({ denomOrAddress, decimals }) => {
                  setValue(fieldNamePrefix + 'funds.0.denom', denomOrAddress)
                  setValue(fieldNamePrefix + 'funds.0.decimals', decimals)
                }}
                readOnly={!isCreating}
                selectedToken={selectedCw20?.token}
                tokens={
                  tokens.loading
                    ? { loading: true }
                    : {
                        loading: false,
                        data: cw20Tokens
                          .filter(({ token }) => token.chainId === chainId)
                          .map(({ token }) => token),
                      }
                }
              />
            ) : (
              <div className="flex flex-col items-stretch gap-2">
                {coins.map(({ id }, index) => (
                  <NativeCoinSelector
                    key={id + index}
                    errors={errors?.funds?.[index]}
                    fieldNamePrefix={fieldNamePrefix + `funds.${index}.`}
                    isCreating={isCreating}
                    onRemove={isCreating ? () => removeCoin(index) : undefined}
                    tokens={tokens}
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
            )}
          </div>

          {isCreating && (
            <FormSwitchCard
              fieldName={fieldNamePrefix + 'cw20'}
              label={t('form.useCw20')}
              onToggle={() => setValue(fieldNamePrefix + 'funds', [])}
              readOnly={!isCreating}
              setValue={setValue}
              sizing="sm"
              tooltip={t('form.useCw20ExecuteTooltip')}
              value={watch(fieldNamePrefix + 'cw20')}
            />
          )}
        </div>
      </div>
    </>
  )
}
