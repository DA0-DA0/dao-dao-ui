import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'

import { makeWasmMessage } from '@dao-dao/utils'

import {
  UseDecodeCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '../components'

export interface CustomData {
  message: string
}

export const useCustomDefaults: UseDefaults<CustomData> = () => ({
  message: '{}',
})

export const useTransformCustomToCosmos: UseTransformToCosmos<
  CustomData
> = () =>
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

export const useDecodeCustomCosmosMsg: UseDecodeCosmosMsg<CustomData> = (
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
