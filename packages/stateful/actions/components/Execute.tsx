import { Coin } from '@cosmjs/stargate'
import { Check, Close } from '@mui/icons-material'
import JSON5 from 'json5'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CodeMirrorInput,
  InputErrorMessage,
  InputLabel,
  SwordsEmoji,
  TextInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  NATIVE_DENOM,
  makeWasmMessage,
  validateContractAddress,
  validateCosmosMsg,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard } from './ActionCard'
import {
  NativeCoinSelector,
  NativeCoinSelectorProps,
} from './NativeCoinSelector'

export interface ExecuteOptions {
  nativeBalances: readonly Coin[]
  // Only present once executed.
  instantiatedAddress?: string
}

export const ExecuteComponent: ActionComponent<ExecuteOptions> = (props) => {
  const { t } = useTranslation()
  const { fieldNamePrefix, onRemove, errors, isCreating } = props
  const { register, control } = useFormContext()
  const {
    fields: coins,
    append: appendCoin,
    remove: removeCoin,
  } = useFieldArray({
    control,
    name: fieldNamePrefix + 'funds',
  })

  return (
    <ActionCard
      Icon={SwordsEmoji}
      onRemove={onRemove}
      title={t('title.executeSmartContract')}
    >
      <div className="flex flex-col items-stretch gap-1">
        <InputLabel name={t('form.smartContractAddress')} />
        <TextInput
          disabled={!isCreating}
          error={errors?.address}
          fieldName={fieldNamePrefix + 'address'}
          placeholder="juno..."
          register={register}
          validation={[validateRequired, validateContractAddress]}
        />
        <InputErrorMessage error={errors?.codeId} />
      </div>

      <InputLabel className="-mb-1" name={t('form.message')} />
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
            return (
              validateCosmosMsg(msg).valid || t('error.invalidExecuteMessage')
            )
          },
        ]}
      />

      {errors?.message ? (
        <p className="flex items-center gap-1 text-sm text-text-interactive-error">
          <Close className="!h-5 !w-5" /> <span>{errors.message.message}</span>
        </p>
      ) : (
        <p className="flex items-center gap-1 text-sm text-text-interactive-valid">
          <Check className="!h-5 !w-5" /> {t('info.jsonIsValid')}
        </p>
      )}

      <InputLabel className="mt-1 -mb-1" name={t('form.funds')} />
      <div className="flex flex-col items-stretch gap-2">
        {coins.map(({ id }, index) => (
          <NativeCoinSelector
            key={id}
            {...({
              ...props,
              onRemove: props.isCreating
                ? () => removeCoin(index)
                : props.onRemove,
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
    </ActionCard>
  )
}
