import { Coin } from '@cosmjs/stargate'
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import JSON5 from 'json5'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'
import {
  Button,
  CodeMirrorInput,
  CopyToClipboard,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  TextInput,
} from '@dao-dao/ui'
import {
  NATIVE_DENOM,
  makeWasmMessage,
  validateContractAddress,
  validateCosmosMsg,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard, ActionComponent, NativeCoinSelector } from '..'

export interface InstantiateOptions {
  nativeBalances: readonly Coin[]
  // Only present once executed.
  instantiatedAddress?: string
}

export const InstantiateComponent: ActionComponent<InstantiateOptions> = (
  props
) => {
  const { t } = useTranslation()
  const {
    getFieldName,
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
    name: getFieldName('funds'),
  })

  return (
    <ActionCard
      emoji={<Emoji label={t('emoji.baby')} symbol="👶" />}
      onRemove={onRemove}
      title={t('title.instantiateSmartContract')}
    >
      {instantiatedAddress && (
        <div className="flex flex-row gap-3 items-center mb-2 text-primary">
          <InputLabel name={t('form.instantiatedAddress') + ':'} />
          <CopyToClipboard
            takeStartEnd={{ start: instantiatedAddress.length, end: 0 }}
            value={instantiatedAddress}
          />
        </div>
      )}

      <div className="flex flex-row gap-2 items-center">
        <div className="flex flex-col gap-1 items-stretch">
          <InputLabel name={t('form.codeID')} />
          <NumberInput
            disabled={readOnly}
            error={errors?.codeId}
            fieldName={getFieldName('codeId')}
            register={register}
            sizing="sm"
            step={1}
            validation={[validateRequired, validatePositive]}
          />
          <InputErrorMessage error={errors?.codeId} />
        </div>

        <div className="flex flex-col grow gap-1 items-stretch">
          <InputLabel name={t('form.contractLabel')} />
          <TextInput
            disabled={readOnly}
            error={errors?.label}
            fieldName={getFieldName('label')}
            register={register}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.label} />
        </div>
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
                instantiate: {
                  admin: null,
                  code_id: 0,
                  funds: [],
                  label: '',
                  msg,
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
          <CheckIcon className="inline w-5" /> {t('info.jsonIsValid')}
        </p>
      )}

      <InputLabel className="mt-1 -mb-1" name={t('form.funds')} />
      <div className="flex flex-col gap-2 items-stretch">
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
            className="self-start mb-2"
            onClick={() => appendCoin({ amount: 1, denom: NATIVE_DENOM })}
            variant="secondary"
          >
            {t('button.addPayment')}
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-1 items-stretch">
        <InputLabel name={t('form.admin')} />
        <TextInput
          disabled={readOnly}
          error={errors?.admin}
          fieldName={getFieldName('admin')}
          placeholder={readOnly ? t('info.none') : 'juno...'}
          register={register}
          validation={[(v: string) => validateContractAddress(v, false)]}
        />
        <InputErrorMessage error={errors?.admin} />
      </div>
    </ActionCard>
  )
}
