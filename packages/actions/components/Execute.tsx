import { Coin } from '@cosmjs/stargate'
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import JSON5 from 'json5'
import { useFieldArray, useFormContext } from 'react-hook-form'

import {
  Button,
  CodeMirrorInput,
  InputErrorMessage,
  InputLabel,
  TextInput,
} from '@dao-dao/ui'
import {
  makeWasmMessage,
  NATIVE_DENOM,
  validateContractAddress,
  validateCosmosMsg,
  validateRequired,
} from '@dao-dao/utils'

import { ActionComponent, NativeCoinSelector, ActionCard } from '..'

export interface ExecuteOptions {
  nativeBalances: readonly Coin[]
  // Only present once executed.
  instantiatedAddress?: string
}

export const ExecuteComponent: ActionComponent<ExecuteOptions> = (props) => {
  const { getLabel, onRemove, errors, readOnly } = props
  const { register, control } = useFormContext()
  const {
    fields: coins,
    append: appendCoin,
    remove: removeCoin,
  } = useFieldArray({
    control,
    name: getLabel('funds'),
  })

  return (
    <ActionCard
      emoji={<Emoji label="Swords" symbol="⚔️" />}
      onRemove={onRemove}
      title="Execute Smart Contract"
    >
      <div className="flex flex-col gap-1 items-stretch">
        <InputLabel name="Smart Contract Address" />
        <TextInput
          disabled={readOnly}
          error={errors?.address}
          label={getLabel('address')}
          placeholder="juno..."
          register={register}
          validation={[validateRequired, validateContractAddress]}
        />
        <InputErrorMessage error={errors?.codeId} />
      </div>

      <InputLabel className="-mb-1" name="Message" />
      <CodeMirrorInput
        control={control}
        error={errors?.message}
        label={getLabel('message')}
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
            return validateCosmosMsg(msg).valid || 'Invalid execute message'
          },
        ]}
      />

      {errors?.message ? (
        <p className="flex gap-1 items-center text-sm text-error">
          <XIcon className="inline w-5" /> <span>{errors.message.message}</span>
        </p>
      ) : (
        <p className="flex gap-1 items-center text-sm text-success">
          <CheckIcon className="inline w-5" /> json is valid
        </p>
      )}

      <InputLabel className="mt-1 -mb-1" name="Funds" />
      <div className="flex flex-col gap-2 items-stretch">
        {coins.map(({ id }, index) => (
          <NativeCoinSelector
            key={id}
            {...props}
            errors={errors?.funds?.[index]}
            getLabel={(field: string) => getLabel(`funds.${index}.${field}`)}
            onRemove={() => removeCoin(index)}
          />
        ))}
        {readOnly && coins.length === 0 && (
          <p className="mt-1 mb-2 text-xs italic text-tertiary">None</p>
        )}
        {!readOnly && (
          <Button
            className="self-start"
            onClick={() => appendCoin({ amount: 1, denom: NATIVE_DENOM })}
            variant="secondary"
          >
            Add payment
          </Button>
        )}
      </div>
    </ActionCard>
  )
}
