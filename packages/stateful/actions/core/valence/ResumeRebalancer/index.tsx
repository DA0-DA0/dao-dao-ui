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
  ResumeRebalancerComponent as Component,
  ResumeRebalancerData,
} from './Component'

const useDefaults: UseDefaults<ResumeRebalancerData> = () => {
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

const useTransformToCosmos: UseTransformToCosmos<ResumeRebalancerData> = () =>
  useCallback(
    ({ account }: ResumeRebalancerData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: account,
            funds: [],
            msg: {
              resume_service: {
                service_name: 'rebalancer',
              },
            },
          },
        },
      }),
    []
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ResumeRebalancerData> = (
  msg: Record<string, any>
) =>
  objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {
          resume_service: {
            service_name: {},
          },
        },
      },
    },
  }) && msg.wasm.execute.msg.resume_service.service_name === 'rebalancer'
    ? {
        match: true,
        data: {
          account: msg.wasm.execute.contract_addr,
        },
      }
    : {
        match: false,
      }

export const makeResumeRebalancerAction: ActionMaker<ResumeRebalancerData> = ({
  t,
  context,
}) => ({
  key: ActionKey.ResumeRebalancer,
  Icon: PlayPauseEmoji,
  label: t('title.resumeRebalancer'),
  description: t('info.resumeRebalancerDescription'),
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
