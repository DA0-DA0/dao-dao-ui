import { CodeMirrorInput } from '@dao-dao/ui'
import { makeWasmMessage, validateCosmosMsg } from '@dao-dao/utils'
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import JSON5 from 'json5'
import { useFormContext } from 'react-hook-form'

import { TemplateComponent } from './common'

export interface CustomData {
  message: string
}

export const customDefaults = (): CustomData => ({
  message: '{}',
})

export const CustomComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => {
  const { control } = useFormContext()

  // We need to use the real label for this component as the
  // control structure we pass along can't me made to understand
  // that we are in a nested object nor wrapped nicely like we do
  // with register.
  return (
    <div className="flex flex-col p-3 my-2 bg-primary rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center mb-2">
          <h2 className="text-3xl">🤖</h2>
          <h2>Custom</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
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
            } catch (e: any) {
              return e.message as string
            }
            if (msg.wasm) msg = makeWasmMessage(msg)
            const validCosmos = validateCosmosMsg(msg)
            if (!validCosmos.valid) {
              return 'Invalid cosmos message'
            } else {
              return true
            }
          },
        ]}
      />
      <div className="mt-2">
        {errors?.message ? (
          <p className="flex gap-1 items-center text-sm text-error">
            <XIcon className="inline w-5" />{' '}
            {errors?.message.message === 'Invalid cosmos message' ? (
              <>
                Invalid{' '}
                <a
                  className="inline link"
                  href="https://github.com/CosmWasm/cosmwasm/blob/d4505011e35a8877fb95e7d14357f2b8693c57bb/packages/std/schema/cosmos_msg.json"
                  rel="noreferrer"
                  target="_blank"
                >
                  cosmos message
                </a>
              </>
            ) : null}
          </p>
        ) : (
          <p className="flex gap-1 items-center text-sm text-success">
            <CheckIcon className="inline w-5" /> json is valid
          </p>
        )}
      </div>
    </div>
  )
}

export const transformCustomToCosmos = (data: CustomData) => {
  let msg
  try {
    msg = JSON5.parse(data.message)
  } catch (e: any) {
    // Should never hit this as a valid cosmos message is a requirement for submission.
    console.log(`internal error. unparsable message: (${data.message})`)
  }
  // Convert the wasm message component to base64
  if (msg.wasm) msg = makeWasmMessage(msg)
  return msg
}

export const transformCosmosToCustom = (
  msg: Record<string, any>
): CustomData => ({
  message: JSON.stringify(msg, undefined, 2),
})
