import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import JSON5 from 'json5'
import { useFormContext } from 'react-hook-form'

import {
  CodeMirrorInput,
  InputErrorMessage,
  InputLabel,
  TextInput,
} from '@dao-dao/ui'
import {
  makeWasmMessage,
  validateContractAddress,
  validateCosmosMsg,
  validateRequired,
} from '@dao-dao/utils'

import { TemplateComponent } from './common'
import { TemplateCard } from './TemplateCard'

export const ExecuteComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => {
  const { register, control } = useFormContext()

  return (
    <TemplateCard
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
                  contract_addr: msg.contract,
                  funds: [],
                  msg: msg,
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
    </TemplateCard>
  )
}
