import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'

import {
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { CustomEmoji } from '@dao-dao/ui'
import { makeWasmMessage } from '@dao-dao/utils'

import { CustomComponent as Component } from '../components/Custom'

interface CustomData {
  message: string
}

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
    if (msg.wasm) msg = makeWasmMessage(msg)
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
  Icon: CustomEmoji,
  label: t('title.custom'),
  description: t('info.customActionDescription', {
    context: context.type,
  }),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
