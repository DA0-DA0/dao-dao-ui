import { Coin } from '@cosmjs/stargate'
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import JSON5 from 'json5'
import { ComponentProps, FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import {
  Button,
  CodeMirrorInput,
  CopyToClipboard,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  SelectInput,
  TextInput,
} from '@dao-dao/ui'
import {
  convertDenomToHumanReadableDenom,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
  nativeTokenLabel,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  validateContractAddress,
  validateCosmosMsg,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { TemplateComponent } from './common'
import { TemplateCard } from './TemplateCard'

export interface InstantiateOptions {
  nativeBalances: readonly Coin[]
  // Only present once executed.
  instantiatedAddress?: string
}

export const InstantiateComponent: TemplateComponent<InstantiateOptions> = (
  props
) => {
  const {
    getLabel,
    onRemove,
    errors,
    readOnly,
    options: { instantiatedAddress },
  } = props

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
    <TemplateCard
      emoji={<Emoji label="Baby" symbol="👶" />}
      onRemove={onRemove}
      title="Instantiate Smart Contract"
    >
      {instantiatedAddress && (
        <div className="flex flex-row gap-3 items-center mb-2 text-primary">
          <InputLabel name="Instantiated Address:" />
          <CopyToClipboard
            takeStartEnd={{ start: instantiatedAddress.length, end: 0 }}
            value={instantiatedAddress}
          />
        </div>
      )}

      <div className="flex flex-row gap-2 items-center">
        <div className="flex flex-col gap-1 items-stretch">
          <InputLabel name="Code ID" />
          <NumberInput
            disabled={readOnly}
            error={errors?.codeId}
            label={getLabel('codeId')}
            register={register}
            sizing="sm"
            step={1}
            validation={[validateRequired, validatePositive]}
          />
          <InputErrorMessage error={errors?.codeId} />
        </div>

        <div className="flex flex-col grow gap-1 items-stretch">
          <InputLabel name="Contract Label" />
          <TextInput
            disabled={readOnly}
            error={errors?.label}
            label={getLabel('label')}
            register={register}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.label} />
        </div>
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
                instantiate: {
                  admin: null,
                  code_id: 0,
                  funds: [],
                  label: '',
                  msg: msg,
                },
              },
            })
            return validateCosmosMsg(msg).valid || 'Invalid instantiate message'
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
          <CoinSelector
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
            className="self-start mb-2"
            onClick={() => appendCoin({ amount: 1, denom: NATIVE_DENOM })}
            variant="secondary"
          >
            Add payment
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-1 items-stretch">
        <InputLabel name="Admin" />
        <TextInput
          disabled={readOnly}
          error={errors?.admin}
          label={getLabel('admin')}
          placeholder={readOnly ? 'None' : 'juno...'}
          register={register}
          validation={[(v: string) => validateContractAddress(v, false)]}
        />
        <InputErrorMessage error={errors?.admin} />
      </div>
    </TemplateCard>
  )
}

interface CoinSelectorProps
  extends ComponentProps<typeof InstantiateComponent> {
  index: number
}

const CoinSelector: FC<CoinSelectorProps> = ({
  onRemove,
  getLabel,
  errors,
  readOnly,
  options: { nativeBalances },
}) => {
  const { register, setValue, watch } = useFormContext()

  const watchAmount = watch(getLabel('amount'))
  const watchDenom = watch(getLabel('denom'))

  const validatePossibleSpend = (
    id: string,
    amount: string
  ): string | boolean => {
    const native = nativeBalances.find(({ denom }) => denom === id)
    if (native) {
      const humanReadableAmount = convertMicroDenomToDenomWithDecimals(
        native.amount,
        NATIVE_DECIMALS
      )
      const microAmount = convertDenomToMicroDenomWithDecimals(
        amount,
        NATIVE_DECIMALS
      )
      return (
        Number(microAmount) <= Number(native.amount) ||
        `Can't spend more tokens than are in the DAO treasury (${humanReadableAmount} ${nativeTokenLabel(
          id
        )}).`
      )
    }
    // If there are no native tokens in the treasury the native balances
    // query will return an empty list.
    if (id === NATIVE_DENOM) {
      return `Can't spend more tokens than are in the DAO treasury (0 ${convertDenomToHumanReadableDenom(
        NATIVE_DENOM
      )}).`
    }
    return 'Unrecognized denom.'
  }

  return (
    <div>
      <div className="flex flex-row gap-2 items-stretch">
        <NumberInput
          disabled={readOnly}
          error={errors?.amount}
          label={getLabel('amount')}
          onPlusMinus={[
            () =>
              setValue(
                getLabel('amount'),
                Math.max(Number(watchAmount) + 1, 1 / 10 ** NATIVE_DECIMALS)
              ),
            () =>
              setValue(
                getLabel('amount'),
                Math.max(Number(watchAmount) - 1, 1 / 10 ** NATIVE_DECIMALS)
              ),
          ]}
          register={register}
          sizing="auto"
          step={1 / 10 ** NATIVE_DECIMALS}
          validation={[
            validateRequired,
            validatePositive,
            (amount: string) => validatePossibleSpend(watchDenom, amount),
          ]}
        />

        <SelectInput
          defaultValue={NATIVE_DENOM}
          disabled={readOnly}
          error={errors?.denom}
          label={getLabel('denom')}
          register={register}
          validation={[
            (denom: string) => validatePossibleSpend(denom, watchAmount),
          ]}
        >
          {nativeBalances.map(({ denom }) => (
            <option key={denom} value={denom}>
              ${nativeTokenLabel(denom)}
            </option>
          ))}
        </SelectInput>

        {!readOnly && (
          <button onClick={onRemove} type="button">
            <XIcon className="w-4 h-4 text-error" />
          </button>
        )}
      </div>

      <InputErrorMessage error={errors?.amount ?? errors?.denom} />
    </div>
  )
}
