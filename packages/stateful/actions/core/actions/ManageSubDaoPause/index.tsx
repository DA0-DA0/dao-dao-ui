import { useQueryClient } from '@tanstack/react-query'

import { contractQueries, daoQueries } from '@dao-dao/state'
import { ActionBase, PlayPauseEmoji } from '@dao-dao/stateless'
import { ChainId, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  NEUTRON_GOVERNANCE_DAO,
  NEUTRON_SECURITY_SUBDAO,
  NEUTRON_SUBDAO_CORE_CONTRACT_NAMES,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { EntityDisplay } from '../../../../components'
import { useQueryLoadingData } from '../../../../hooks'
import { ManageSubDaoPauseComponent, ManageSubDaoPauseData } from './Component'

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

export class ManageSubDaoPauseAction extends ActionBase<ManageSubDaoPauseData> {
  public readonly key = ActionKey.ManageSubDaoPause
  public readonly Component = Component

  protected _defaults: ManageSubDaoPauseData = {
    address: '',
    pausing: true,
    pauseBlocks: 0,
  }

  constructor(options: ActionOptions) {
    if (
      options.chain.chain_id !== ChainId.NeutronMainnet ||
      options.context.type !== ActionContextType.Dao ||
      (options.address !== NEUTRON_GOVERNANCE_DAO &&
        options.address !== NEUTRON_SECURITY_SUBDAO)
    ) {
      throw new Error(
        'Only main Neutron DAO or its security subDAO can manage SubDAO pauses.'
      )
    }

    super(options, {
      Icon: PlayPauseEmoji,
      label: options.t('title.manageSubDaoPause'),
      description: options.t('info.manageSubDaoPauseDescription'),
    })
  }

  encode({
    address,
    pausing,
    pauseBlocks,
  }: ManageSubDaoPauseData): UnifiedCosmosMsg {
    return makeExecuteSmartContractMessage({
      chainId: this.options.chain.chain_id,
      sender: this.options.address,
      contractAddress: address,
      msg: pausing
        ? {
            pause: {
              duration: pauseBlocks,
            },
          }
        : {
            unpause: {},
          },
    })
  }

  async match([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): Promise<ActionMatch> {
    return (
      (objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              pause: {
                duration: {},
              },
            },
          },
        },
      }) ||
        objectMatchesStructure(decodedMessage, {
          wasm: {
            execute: {
              contract_addr: {},
              funds: {},
              msg: {
                unpause: {},
              },
            },
          },
        })) &&
      (await this.options.queryClient.fetchQuery(
        contractQueries.isContract(this.options.queryClient, {
          chainId,
          address: decodedMessage.wasm.execute.contract_addr,
          nameOrNames: NEUTRON_SUBDAO_CORE_CONTRACT_NAMES,
        })
      ))
    )
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): ManageSubDaoPauseData {
    const pausing = objectMatchesStructure(decodedMessage.wasm.execute.msg, {
      pause: {},
    })

    return {
      address: decodedMessage.wasm.execute.contract_addr,
      pausing,
      pauseBlocks: pausing ? decodedMessage.wasm.execute.msg.pause.duration : 0,
    }
  }
}
