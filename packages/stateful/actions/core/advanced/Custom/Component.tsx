import { Check, Close } from '@mui/icons-material'
import JSON5 from 'json5'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  CodeMirrorInput,
  FilterableItemPopup,
  useChain,
} from '@dao-dao/stateless'
import { ChainId } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  PROTOBUF_TYPES,
  makeStargateMessage,
  makeWasmMessage,
  objectMatchesStructure,
  validateCosmosMsg,
} from '@dao-dao/utils'

export type CustomData = {
  message: string
}

export const CustomComponent: ActionComponent = ({
  fieldNamePrefix,
  errors,
  isCreating,
}) => {
  const { t } = useTranslation()
  const { control, setValue } = useFormContext<CustomData>()
  const { chain_id: chainId } = useChain()

  const types = useMemo(
    () =>
      PROTOBUF_TYPES.filter(
        ([type]) =>
          // Only show protobuf message types.
          type.split('.').pop()?.startsWith('Msg') &&
          // Only show stargaze message types on Stargaze chains.
          (!type.startsWith('/publicawesome.stargaze') ||
            chainId === ChainId.StargazeMainnet ||
            chainId === ChainId.StargazeTestnet)
      ),
    [chainId]
  )

  return (
    <>
      {isCreating && (
        <FilterableItemPopup
          filterableItemKeys={FILTERABLE_KEYS}
          items={types.map(([key, type]) => ({
            key,
            label: key,
            type,
          }))}
          labelClassName="break-words whitespace-normal"
          onSelect={({ key, type }) =>
            setValue(
              (fieldNamePrefix + 'message') as 'message',
              JSON.stringify(
                {
                  stargate: {
                    typeUrl: key,
                    // Decoding empty data returns default.
                    value: type.decode(new Uint8Array()),
                  },
                },
                null,
                2
              )
            )
          }
          searchPlaceholder={t('info.searchMessages')}
          trigger={{
            type: 'button',
            props: {
              className: 'self-start',
              variant: 'secondary',
              children: t('button.loadMessageTemplate'),
            },
          }}
        />
      )}

      <CodeMirrorInput
        control={control}
        error={errors?.message}
        fieldName={(fieldNamePrefix + 'message') as 'message'}
        readOnly={!isCreating}
        transform={isCreating ? undefined : transformLongKeys}
        validation={[
          (v: string) => {
            let msg
            try {
              msg = JSON5.parse(v)
            } catch (e: any) {
              return e.message as string
            }

            try {
              if (msg.wasm) {
                msg = makeWasmMessage(msg)
              }
              if (msg.stargate) {
                msg = makeStargateMessage(msg)
              }

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

const FILTERABLE_KEYS = ['label']

// Some messages contain really large data that should not be shown in the UI.
const transformLongKeys = (value: any): string => {
  try {
    const obj = JSON.parse(value)

    if (
      objectMatchesStructure(obj, {
        stargate: {
          typeUrl: {},
          value: {},
        },
      }) &&
      obj.stargate.value instanceof Uint8Array &&
      obj.stargate.value.length > 1000
    ) {
      obj.stargate.value = '[TOO LARGE TO SHOW]'
    } else if (
      objectMatchesStructure(obj, {
        stargate: {
          typeUrl: {},
          value: {
            wasmByteCode: {},
          },
        },
      })
    ) {
      obj.stargate.value.wasmByteCode = '[TOO LARGE TO SHOW]'
    }

    return JSON.stringify(obj, null, 2)
  } catch (err) {
    console.log(err)
    return value
  }
}
