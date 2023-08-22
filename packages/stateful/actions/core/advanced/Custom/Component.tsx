import { Check, Close } from '@mui/icons-material'
import JSON5 from 'json5'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { CodeMirrorInput } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  makeStargateMessage,
  makeWasmMessage,
  validateCosmosMsg,
} from '@dao-dao/utils'

export const CustomComponent: ActionComponent = ({
  fieldNamePrefix,
  errors,
  isCreating,
}) => {
  const { t } = useTranslation()
  const { control } = useFormContext()

  return (
    <>
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
            } catch (e: any) {
              return e.message as string
            }
            if (msg.wasm) {
              msg = makeWasmMessage(msg)
            }
            if (msg.stargate) {
              msg = makeStargateMessage(msg)
            }

            try {
              validateCosmosMsg(msg)
            } catch (err) {
              return err instanceof Error ? err.message : `${err}`
            }

            return true
          },
        ]}
      />

      {errors?.message ? (
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-1 text-sm text-text-interactive-error">
            <Close className="!h-5 !w-5" />{' '}
            <span>{errors.message.message}</span>
          </p>

          <a
            className="link ml-6 underline"
            href="https://github.com/CosmWasm/cosmwasm/blob/d4505011e35a8877fb95e7d14357f2b8693c57bb/packages/std/schema/cosmos_msg.json"
            rel="noreferrer"
            target="_blank"
            // eslint-disable-next-line i18next/no-literal-string
          >
            Cosmos message format
          </a>
        </div>
      ) : (
        <p className="flex items-center gap-1 text-sm text-text-interactive-valid">
          <Check className="!h-5 !w-5" /> {t('info.jsonIsValid')}
        </p>
      )}
    </>
  )
}
