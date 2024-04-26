import { fromBase64 } from '@cosmjs/encoding'
import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'

import { RobotEmoji } from '@dao-dao/stateless'
import { makeStargateMessage } from '@dao-dao/types'
import {
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import { CustomComponent as Component, CustomData } from './Component'

const useDefaults: UseDefaults<CustomData> = () => ({
  message: '{}',
})

const useTransformToCosmos: UseTransformToCosmos<CustomData> = () =>
  useCallback((data: CustomData) => {
    let msg
    try {
      msg = JSON5.parse(data.message)
    } catch (err) {
      console.error(
        `internal error. unparsable message: (${data.message})`,
        err
      )
      return
    }
    // Convert the wasm message component to base64
    if (msg.wasm) {
      msg = makeWasmMessage(msg)
    }
    // Encode JSON stargate message if needed.
    if (
      objectMatchesStructure(msg, {
        stargate: {
          typeUrl: {},
          value: {},
        },
      })
    ) {
      msg = makeStargateMessage(msg)
    }
    // If msg is in the encoded stargate format, validate it.
    if (
      objectMatchesStructure(msg, {
        stargate: {
          type_url: {},
          value: {},
        },
      })
    ) {
      if (typeof msg.stargate.value !== 'string') {
        throw new Error('stargate `value` must be a base64-encoded string')
      }

      // Ensure value is valid base64 by attempting to decode it and throwing
      // error on failure.
      fromBase64(msg.stargate.value)
    }

    return msg
  }, [])

const useDecodedCosmosMsg: UseDecodedCosmosMsg<CustomData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () => ({
      match: true,
      data: {
        message: JSON.stringify(msg, undefined, 2),
      },
    }),
    [msg]
  )

export const makeCustomAction: ActionMaker<CustomData> = ({ t, context }) => ({
  key: ActionKey.Custom,
  Icon: RobotEmoji,
  label: t('title.custom'),
  description: t('info.customActionDescription', {
    context: context.type,
  }),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
