import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { contractAdminSelector } from '@dao-dao/state'
import {
  ChainProvider,
  DaoSupportedChainPickerInput,
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
  decodePolytoneExecuteMsg,
  getChainForChainId,
  isValidBech32Address,
  maybeMakePolytoneExecuteMessage,
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
    ({ chainId, contract, newAdmin }: UpdateAdminData) =>
      maybeMakePolytoneExecuteMessage(currentChainId, chainId, {
        wasm: {
          update_admin: {
            contract_addr: contract,
            admin: newAdmin,
          },
        },
      }),
    [currentChainId]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateAdminData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
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

  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const { bech32_prefix: bech32Prefix } = getChainForChainId(chainId)

  const contract = watch((props.fieldNamePrefix + 'contract') as 'contract')

  const admin = useRecoilValueLoadable(
    contract && isValidBech32Address(contract, bech32Prefix)
      ? contractAdminSelector({
          contractAddress: contract,
          chainId,
        })
      : constSelector(undefined)
  )

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          className="mb-4"
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onlyDaoChainIds
        />
      )}

      <ChainProvider chainId={chainId}>
        <StatelessUpdateAdminComponent
          {...props}
          options={{
            contractAdmin:
              admin.state === 'hasValue' ? admin.contents : undefined,
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
