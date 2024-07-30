import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { daoQueries } from '@dao-dao/state'
import { PlayPauseEmoji } from '@dao-dao/stateless'
import { ChainId } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  NEUTRON_GOVERNANCE_DAO,
  NEUTRON_SECURITY_SUBDAO,
  NEUTRON_SUBDAO_CORE_CONTRACT_NAMES,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { EntityDisplay } from '../../../../components'
import { useQueryLoadingData } from '../../../../hooks'
import { useMsgExecutesContract } from '../../../hooks'
import { ManageSubDaoPauseComponent, ManageSubDaoPauseData } from './Component'

const useDefaults: UseDefaults<ManageSubDaoPauseData> = () => ({
  address: '',
  pausing: true,
  pauseBlocks: 0,
})

const useTransformToCosmos: UseTransformToCosmos<ManageSubDaoPauseData> = () =>
  useCallback(
    ({ address, pausing, pauseBlocks }) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: address,
            funds: [],
            msg: pausing
              ? {
                  pause: {
                    duration: pauseBlocks,
                  },
                }
              : {
                  unpause: {},
                },
          },
        },
      }),
    []
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageSubDaoPauseData> = (
  msg: Record<string, any>
) => {
  const isNeutronSubdaoWasmExecute = useMsgExecutesContract(
    msg,
    NEUTRON_SUBDAO_CORE_CONTRACT_NAMES
  )

  const isPause =
    isNeutronSubdaoWasmExecute &&
    objectMatchesStructure(msg.wasm.execute.msg, {
      pause: {
        duration: {},
      },
    })
  const isUnpause =
    isNeutronSubdaoWasmExecute &&
    objectMatchesStructure(msg.wasm.execute.msg, {
      unpause: {},
    })

  if (!isPause && !isUnpause) {
    return {
      match: false,
    }
  }

  return {
    match: true,
    data: {
      address: msg.wasm.execute.contract_addr,
      pausing: isPause,
      pauseBlocks: isPause ? msg.wasm.execute.msg.pause.duration : 0,
    },
  }
}

const Component: ActionComponent<undefined, ManageSubDaoPauseData> = (
  props
) => {
  const queryClient = useQueryClient()
  const neutronSubdaos = useQueryLoadingData(
    daoQueries.listAllSubDaos(queryClient, {
      chainId: ChainId.NeutronMainnet,
      address: NEUTRON_GOVERNANCE_DAO,
    }),
    [],
    {
      transform: (subDaos) => subDaos.map(({ addr }) => addr),
    }
  )

  return (
    <ManageSubDaoPauseComponent
      {...props}
      options={{
        neutronSubdaos,
        EntityDisplay,
      }}
    />
  )
}

export const makeManageSubDaoPauseAction: ActionMaker<
  ManageSubDaoPauseData
> = ({ t, chain: { chain_id: chainId }, address, context }) =>
  chainId === ChainId.NeutronMainnet &&
  context.type === ActionContextType.Dao &&
  (address === NEUTRON_GOVERNANCE_DAO || address === NEUTRON_SECURITY_SUBDAO)
    ? {
        key: ActionKey.ManageSubDaoPause,
        Icon: PlayPauseEmoji,
        label: t('title.manageSubDaoPause'),
        description: t('info.manageSubDaoPauseDescription'),
        Component,
        useDefaults,
        useTransformToCosmos,
        useDecodedCosmosMsg,
      }
    : null
