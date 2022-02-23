import JSON5 from 'json5'
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import { walletAddress } from 'selectors/cosm'
import { makeWasmMessage } from 'util/messagehelpers'
import { validateCosmosMsg } from 'util/validateWasmMsg'
import { CodeMirrorInput } from '@components/input/CodeMirrorInput'
import { FieldErrors, useFormContext } from 'react-hook-form'
import { ToCosmosMsgProps } from './templateList'
import { Config } from 'util/contractConfigWrapper'

export interface CustomData {
  message: string
}

export const customDefaults = (
  _walletAddress: string,
  _contractConfig: Config
) => {
  return {
    message: '{}',
  }
}

export const CustomComponent = ({
  contractAddress,
  getLabel,
  onRemove,
  errors,
  multisig,
}: {
  contractAddress: string
  getLabel: (field: string) => string
  onRemove: () => void
  errors: FieldErrors
  multisig?: boolean
}) => {
  const { control } = useFormContext()

  // We need to use the real label for this component as the
  // control structure we pass along can't me made to understand
  // that we are in a nested object nor wrapped nicely like we do
  // with register.
  return (
    <div className="flex flex-col py-2 px-3 my-2 bg-base-300 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-3xl">🤖</h2>
          <h2>Custom</h2>
        </div>
        <button onClick={onRemove} type="button">
          <XIcon className="h-4" />
        </button>
      </div>
      <CodeMirrorInput
        label={getLabel('message') as never}
        control={control}
        error={errors.message}
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
        {errors.message ? (
          <p className="text-error text-sm flex items-center gap-1">
            <XIcon className="w-5 inline" />{' '}
            {errors.message.message === 'Invalid cosmos message' ? (
              <>
                Invalid{' '}
                <a
                  className="link inline"
                  rel="noreferrer"
                  target="_blank"
                  href="https://github.com/CosmWasm/cosmwasm/blob/d4505011e35a8877fb95e7d14357f2b8693c57bb/packages/std/schema/cosmos_msg.json"
                >
                  cosmos message
                </a>
              </>
            ) : null}
          </p>
        ) : (
          <p className="text-success text-sm flex items-center gap-1">
            <CheckIcon className="w-5 inline" /> json is valid
          </p>
        )}
      </div>
    </div>
  )
}

export const transformCustomToCosmos = (
  self: CustomData,
  _props: ToCosmosMsgProps
) => {
  let msg
  try {
    msg = JSON5.parse(self.message)
  } catch (e: any) {
    // Should never hit this as we the message being valid JSON and
    // a valid cosmos message is a requirement for submission.
    console.log(`internal error. unparsable message: (${self.message})`)
  }
  // Convert the wasm message component to base64
  if (msg.wasm) msg = makeWasmMessage(msg)
  return msg
}
