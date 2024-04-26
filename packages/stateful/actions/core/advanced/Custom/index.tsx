import { useCallback, useMemo } from 'react'

import { RobotEmoji } from '@dao-dao/stateless'
import {
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { convertJsonToCWCosmosMsg } from '@dao-dao/utils'

import { CustomComponent as Component, CustomData } from './Component'

const useDefaults: UseDefaults<CustomData> = () => ({
  message: '{}',
})

const useTransformToCosmos: UseTransformToCosmos<CustomData> = () =>
  useCallback((data: CustomData) => convertJsonToCWCosmosMsg(data.message), [])

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
