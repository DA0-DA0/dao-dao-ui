import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import JSON5 from 'json5'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

import { CodeMirrorInput, Trans } from '@dao-dao/ui'
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
          <p className="flex gap-1 items-center text-sm text-error">
            <XIcon className="inline w-5" />{' '}
            {errors.message.message === INVALID_COSMOS_MSG ? (
              <Trans i18nKey="error.invalidCosmosMessage">
                Invalid{' '}
                <a
                  className="inline underline link"
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
          <p className="flex gap-1 items-center text-sm text-success">
            <CheckIcon className="inline w-5" /> {t('info.jsonIsValid')}
          </p>
        )}
      </div>
    </ActionCard>
  )
}
