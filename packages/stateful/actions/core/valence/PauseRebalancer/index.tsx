import { useCallback } from 'react'

import { PlayPauseEmoji } from '@dao-dao/stateless'
import { AccountType, ActionMaker, ChainId } from '@dao-dao/types'
import {
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  getAccountAddress,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import {
  PauseRebalancerComponent as Component,
  PauseRebalancerData,
} from './Component'

const useDefaults: UseDefaults<PauseRebalancerData> = () => {
  const { t, context } = useActionOptions()

  const account = getAccountAddress({
    accounts: context.accounts,
    chainId: ChainId.NeutronMainnet,
    types: [AccountType.Valence],
  })

  if (!account) {
    return new Error(t('error.noValenceAccount'))
  }

  return {
    account,
  }
}

const useTransformToCosmos: UseTransformToCosmos<PauseRebalancerData> = () =>
  useCallback(
    ({ account }: PauseRebalancerData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: account,
            funds: [],
            msg: {
              pause_service: {
                service_name: 'rebalancer',
              },
            },
          },
        },
      }),
    []
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<PauseRebalancerData> = (
  msg: Record<string, any>
) =>
  objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {
          pause_service: {
            service_name: {},
          },
        },
      },
    },
  }) && msg.wasm.execute.msg.pause_service.service_name === 'rebalancer'
    ? {
        match: true,
        data: {
          account: msg.wasm.execute.contract_addr,
        },
      }
    : {
        match: false,
      }

export const makePauseRebalancerAction: ActionMaker<PauseRebalancerData> = ({
  t,
  context,
}) => ({
  key: ActionKey.PauseRebalancer,
  Icon: PlayPauseEmoji,
  label: t('title.pauseRebalancer'),
  description: t('info.pauseRebalancerDescription'),
  notReusable: true,
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
  // Hide if no Valence account created.
  hideFromPicker: !context.accounts.some(
    ({ type }) => type === AccountType.Valence
  ),
})
