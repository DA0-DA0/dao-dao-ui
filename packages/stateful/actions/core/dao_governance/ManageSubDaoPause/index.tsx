import { useCallback } from 'react'

import { DaoDaoCoreSelectors } from '@dao-dao/state'
import { PlayPauseEmoji, useCachedLoading } from '@dao-dao/stateless'
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
  const neutronSubdaos = useCachedLoading(
    DaoDaoCoreSelectors.listAllSubDaosSelector({
      chainId: ChainId.NeutronMainnet,
      contractAddress: NEUTRON_GOVERNANCE_DAO,
    }),
    []
  )

  return (
    <ManageSubDaoPauseComponent
      {...props}
      options={{
        neutronSubdaos: neutronSubdaos.loading
          ? neutronSubdaos
          : {
              loading: false,
              updating: neutronSubdaos.updating,
              data: neutronSubdaos.data.map(({ addr }) => addr),
            },
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
