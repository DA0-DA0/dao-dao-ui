import { Check, Close } from '@mui/icons-material'
import JSON5 from 'json5'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Trans } from '@dao-dao/common'
import { ActionComponent } from '@dao-dao/types/actions'
import { CodeMirrorInput, CustomEmoji } from '@dao-dao/ui'
import { makeWasmMessage, validateCosmosMsg } from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

const INVALID_COSMOS_MSG = 'INVALID_COSMOS_MSG'

export const CustomComponent: ActionComponent = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  Loader,
}) => {
  const { t } = useTranslation()
  const { control } = useFormContext()

  return (
    <ActionCard
      Icon={CustomEmoji}
      onRemove={onRemove}
      title={t('title.custom')}
    >
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
            if (msg.wasm) msg = makeWasmMessage(msg)
            const validCosmos = validateCosmosMsg(msg)

            if (!validCosmos.valid) {
              return INVALID_COSMOS_MSG
            } else {
              return true
            }
          },
        ]}
      />

      <div className="mt-2">
        {errors?.message ? (
          <p className="flex items-center gap-1 text-sm text-text-interactive-error">
            <Close className="!h-5 !w-5" />{' '}
            {errors.message.message === INVALID_COSMOS_MSG ? (
              <Trans Loader={Loader} i18nKey="error.invalidCosmosMessage">
                Invalid{' '}
                <a
                  className="link underline"
                  href="https://github.com/CosmWasm/cosmwasm/blob/d4505011e35a8877fb95e7d14357f2b8693c57bb/packages/std/schema/cosmos_msg.json"
                  rel="noreferrer"
                  target="_blank"
                >
                  Cosmos message
                </a>
              </Trans>
            ) : (
              <span>{errors.message.message}</span>
            )}
          </p>
        ) : (
          <p className="flex items-center gap-1 text-sm text-text-interactive-valid">
            <Check className="!h-5 !w-5" /> {t('info.jsonIsValid')}
          </p>
        )}
      </div>
    </ActionCard>
  )
}
