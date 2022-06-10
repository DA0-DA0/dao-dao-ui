import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import JSON5 from 'json5'
import { useFormContext } from 'react-hook-form'

import {
  CodeMirrorInput,
  CopyToClipboard,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  TextInput,
} from '@dao-dao/ui'
import {
  makeWasmMessage,
  validateCosmosMsg,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { TemplateComponent } from './common'
import { TemplateCard } from './TemplateCard'

export interface InstantiateOptions {
  // Only present once executed.
  instantiatedAddress?: string
}

export const InstantiateComponent: TemplateComponent<InstantiateOptions> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options: { instantiatedAddress },
}) => {
  const { register, control } = useFormContext()

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
    </TemplateCard>
  )
}
