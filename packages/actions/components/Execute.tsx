import { Coin } from '@cosmjs/stargate'
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import JSON5 from 'json5'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'
import {
  Button,
  CodeMirrorInput,
  InputErrorMessage,
  InputLabel,
  TextInput,
} from '@dao-dao/ui'
import {
  NATIVE_DENOM,
  makeWasmMessage,
  validateContractAddress,
  validateCosmosMsg,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard, ActionComponent, NativeCoinSelector } from '..'

export interface ExecuteOptions {
  nativeBalances: readonly Coin[]
  // Only present once executed.
  instantiatedAddress?: string
}

export const ExecuteComponent: ActionComponent<ExecuteOptions> = (props) => {
  const { t } = useTranslation()
  const { getFieldName, onRemove, errors, readOnly } = props
  const { register, control } = useFormContext()
  const {
    fields: coins,
    append: appendCoin,
    remove: removeCoin,
  } = useFieldArray({
    control,
    name: getFieldName('funds'),
  })

  return (
    <ActionCard
      emoji={<Emoji label={t('emoji.swords')} symbol="⚔️" />}
      onRemove={onRemove}
      title={t('title.executeSmartContract')}
    >
      <div className="flex flex-col items-stretch gap-1">
        <InputLabel name={t('form.smartContractAddress')} />
        <TextInput
          disabled={readOnly}
          error={errors?.address}
          fieldName={getFieldName('address')}
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
        fieldName={getFieldName('message')}
        readOnly={readOnly}
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
        <p className="flex items-center gap-1 text-sm text-error">
          <XIcon className="inline w-5" /> <span>{errors.message.message}</span>
        </p>
      ) : (
        <p className="text-success flex items-center gap-1 text-sm">
          <CheckIcon className="inline w-5" /> {t('info.jsonIsValid')}
        </p>
      )}

      <InputLabel className="mt-1 -mb-1" name={t('form.funds')} />
      <div className="flex flex-col items-stretch gap-2">
        {coins.map(({ id }, index) => (
          <NativeCoinSelector
            key={id}
            {...props}
            errors={errors?.funds?.[index]}
            getFieldName={(field: string) =>
              getFieldName(`funds.${index}.${field}`)
            }
            onRemove={() => removeCoin(index)}
          />
        ))}
        {readOnly && coins.length === 0 && (
          <p className="mt-1 mb-2 text-xs italic text-tertiary">
            {t('info.none')}
          </p>
        )}
        {!readOnly && (
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
