import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import JSON5 from 'json5'
import { useFormContext } from 'react-hook-form'

import { Trans, useTranslation } from '@dao-dao/i18n'
import { CodeMirrorInput } from '@dao-dao/ui'
import { makeWasmMessage, validateCosmosMsg } from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

const INVALID_COSMOS_MSG = 'INVALID_COSMOS_MSG'

export const CustomComponent: ActionComponent = ({
  getFieldName,
  onRemove,
  errors,
  readOnly,
}) => {
  const { t } = useTranslation()
  const { control } = useFormContext()

  return (
    <ActionCard
      emoji={<Emoji label={t('emoji.robot')} symbol="🤖" />}
      onRemove={onRemove}
      title={t('title.custom')}
    >
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
          <p className="flex items-center gap-1 text-sm text-error">
            <XIcon className="inline w-5" />{' '}
            {errors.message.message === INVALID_COSMOS_MSG ? (
              <Trans i18nKey="error.invalidCosmosMessage">
                Invalid{' '}
                <a
                  className="link inline underline"
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
          <p className="text-success flex items-center gap-1 text-sm">
            <CheckIcon className="inline w-5" /> {t('info.jsonIsValid')}
          </p>
        )}
      </div>
    </ActionCard>
  )
}
