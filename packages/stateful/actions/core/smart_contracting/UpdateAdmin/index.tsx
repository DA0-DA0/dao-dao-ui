import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { contractAdminSelector } from '@dao-dao/state'
import {
  ChainPickerInput,
  ChainProvider,
  MushroomEmoji,
} from '@dao-dao/stateless'
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
  CHAIN_ID,
  decodePolytoneExecuteMsg,
  getChainForChainId,
  isValidContractAddress,
  makePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import { UpdateAdminComponent as StatelessUpdateAdminComponent } from './Component'

interface UpdateAdminData {
  chainId: string
  contract: string
  newAdmin: string
}

const useDefaults: UseDefaults<UpdateAdminData> = () => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()

  return {
    chainId,
    contract: '',
    newAdmin: '',
  }
}

const useTransformToCosmos: UseTransformToCosmos<UpdateAdminData> = () => {
  const currentChainId = useActionOptions().chain.chain_id

  return useCallback(
    ({ chainId, contract, newAdmin }: UpdateAdminData) => {
      const updateMsg = {
        wasm: {
          update_admin: {
            contract_addr: contract,
            admin: newAdmin,
          },
        },
      }

      if (chainId === currentChainId) {
        return updateMsg
      } else {
        return makePolytoneExecuteMessage(chainId, updateMsg)
      }
    },
    [currentChainId]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateAdminData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = decodePolytoneExecuteMsg(msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
  }

  return objectMatchesStructure(msg, {
    wasm: {
      update_admin: {
        contract_addr: {},
        admin: {},
      },
    },
  })
    ? {
        match: true,
        data: {
          chainId,
          contract: msg.wasm.update_admin.contract_addr,
          newAdmin: msg.wasm.update_admin.admin,
        },
      }
    : {
        match: false,
      }
}

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()
  const { watch } = useFormContext<UpdateAdminData>()

  const chainId =
    watch((props.fieldNamePrefix + 'chainId') as 'chainId') || CHAIN_ID
  const { bech32_prefix: bech32Prefix } = getChainForChainId(chainId)

  const [contract, setContract] = useState('')

  const admin = useRecoilValueLoadable(
    contract && isValidContractAddress(contract, bech32Prefix)
      ? contractAdminSelector({
          contractAddress: contract,
          chainId,
        })
      : constSelector(undefined)
  )

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <ChainPickerInput
          className="mb-4"
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
        />
      )}

      <ChainProvider chainId={chainId}>
        <StatelessUpdateAdminComponent
          {...props}
          options={{
            contractAdmin:
              admin.state === 'hasValue' ? admin.contents : undefined,
            onContractChange: (contract: string) => setContract(contract),
          }}
        />
      </ChainProvider>
    </>
  )
}

export const makeUpdateAdminAction: ActionMaker<UpdateAdminData> = ({ t }) => ({
  key: ActionKey.UpdateAdmin,
  Icon: MushroomEmoji,
  label: t('title.updateContractAdmin'),
  description: t('info.updateContractAdminActionDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
