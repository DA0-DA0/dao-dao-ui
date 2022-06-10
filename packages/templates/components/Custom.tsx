import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import JSON5 from 'json5'
import { useFormContext } from 'react-hook-form'

import { CodeMirrorInput } from '@dao-dao/ui'
import { makeWasmMessage, validateCosmosMsg } from '@dao-dao/utils'

import { TemplateComponent } from './common'
import { TemplateCard } from './TemplateCard'

export const CustomComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => {
  const { control } = useFormContext()

  return (
    <TemplateCard
      emoji={<Emoji label="Robot" symbol="🤖" />}
      onRemove={onRemove}
      title="Custom"
    >
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
            {errors.message.message === 'Invalid cosmos message' ? (
              <>
                Invalid{' '}
                <a
                  className="inline underline link"
                  href="https://github.com/CosmWasm/cosmwasm/blob/d4505011e35a8877fb95e7d14357f2b8693c57bb/packages/std/schema/cosmos_msg.json"
                  rel="noreferrer"
                  target="_blank"
                >
                  cosmos message
                </a>
              </>
            ) : (
              <span>{errors.message.message}</span>
            )}
          </p>
        ) : (
          <p className="flex gap-1 items-center text-sm text-success">
            <CheckIcon className="inline w-5" /> json is valid
          </p>
        )}
      </div>
    </TemplateCard>
  )
}
