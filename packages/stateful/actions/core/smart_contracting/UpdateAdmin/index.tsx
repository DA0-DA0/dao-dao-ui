import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { contractAdminSelector } from '@dao-dao/state'
import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  MushroomEmoji,
} from '@dao-dao/stateless'
import { makeStargateMessage } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { MsgUpdateAdmin as SecretMsgUpdateAdmin } from '@dao-dao/types/protobuf/codegen/secret/compute/v1beta1/msg'
import {
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  getChainForChainId,
  isDecodedStargateMsg,
  isSecretNetwork,
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
  const options = useActionOptions()

  return useCallback(
    ({ chainId, contract, newAdmin }: UpdateAdminData) =>
      maybeMakePolytoneExecuteMessage(
        options.chain.chain_id,
        chainId,
        isSecretNetwork(chainId)
          ? makeStargateMessage({
              stargate: {
                typeUrl: SecretMsgUpdateAdmin.typeUrl,
                value: SecretMsgUpdateAdmin.fromAmino({
                  sender:
                    getChainAddressForActionOptions(options, chainId) || '',
                  contract,
                  new_admin: newAdmin,
                }),
              },
            })
          : {
              wasm: {
                update_admin: {
                  contract_addr: contract,
                  admin: newAdmin,
                },
              },
            }
      ),
    [options]
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
    : isDecodedStargateMsg(msg) &&
      msg.stargate.typeUrl === SecretMsgUpdateAdmin.typeUrl
    ? {
        match: true,
        data: {
          chainId,
          contract: msg.stargate.value.contract,
          newAdmin: msg.stargate.value.newAdmin,
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
