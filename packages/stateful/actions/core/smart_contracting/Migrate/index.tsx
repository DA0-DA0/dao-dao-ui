import JSON5 from 'json5'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValueLoadable } from 'recoil'

import { contractAdminSelector } from '@dao-dao/state'
import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  WhaleEmoji,
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
import { MsgMigrateContract as SecretMsgMigrateContract } from '@dao-dao/types/protobuf/codegen/secret/compute/v1beta1/msg'
import {
  bech32AddressToBase64,
  bech32DataToAddress,
  decodeJsonFromBase64,
  decodePolytoneExecuteMsg,
  encodeJsonToBase64,
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  isSecretNetwork,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import { MigrateContractComponent as StatelessMigrateContractComponent } from './Component'

interface MigrateData {
  chainId: string
  contract: string
  codeId: number
  msg: string
}

const useDefaults: UseDefaults<MigrateData> = () => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()

  return {
    chainId,
    contract: '',
    codeId: 0,
    msg: '{}',
  }
}

const useTransformToCosmos: UseTransformToCosmos<MigrateData> = () => {
  const options = useActionOptions()

  return useCallback(
    ({ chainId, contract, codeId, msg: msgString }: MigrateData) => {
      let msg
      try {
        msg = JSON5.parse(msgString)
      } catch (err) {
        console.error(`internal error. unparsable message: (${msg})`, err)
        return
      }

      return maybeMakePolytoneExecuteMessage(
        options.chain.chain_id,
        chainId,
        isSecretNetwork(chainId)
          ? makeStargateMessage({
              stargate: {
                typeUrl: SecretMsgMigrateContract.typeUrl,
                value: SecretMsgMigrateContract.fromAmino({
                  sender: bech32AddressToBase64(
                    getChainAddressForActionOptions(options, chainId) || ''
                  ),
                  contract: bech32AddressToBase64(contract),
                  code_id: BigInt(codeId).toString(),
                  msg: encodeJsonToBase64(msg),
                }),
              },
            })
          : makeWasmMessage({
              wasm: {
                migrate: {
                  contract_addr: contract,
                  new_code_id: codeId,
                  msg,
                },
              },
            })
      )
    },
    [options]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<MigrateData> = (
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
      migrate: {
        contract_addr: {},
        new_code_id: {},
        msg: {},
      },
    },
  })
    ? {
        match: true,
        data: {
          chainId,
          contract: msg.wasm.migrate.contract_addr,
          codeId: msg.wasm.migrate.new_code_id,
          msg: JSON.stringify(msg.wasm.migrate.msg, undefined, 2),
        },
      }
    : isDecodedStargateMsg(msg) &&
      msg.stargate.typeUrl === SecretMsgMigrateContract.typeUrl
    ? {
        match: true,
        data: {
          chainId,
          contract: bech32DataToAddress(chainId, msg.stargate.value.contract),
          codeId: Number(msg.stargate.value.codeId),
          msg: JSON.stringify(decodeJsonFromBase64(msg.stargate.value.msg)),
        },
      }
    : {
        match: false,
      }
}

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()
  const { watch } = useFormContext<MigrateData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  const [contract, setContract] = useState('')

  const admin = useRecoilValueLoadable(
    contractAdminSelector({
      chainId,
      contractAddress: contract,
    })
  )

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onlyDaoChainIds
        />
      )}

      <ChainProvider chainId={chainId}>
        <StatelessMigrateContractComponent
          {...props}
          options={{
            contractAdmin:
              admin.state === 'hasValue' ? admin.getValue() : undefined,
            onContractChange: (contract: string) => setContract(contract),
          }}
        />
      </ChainProvider>
    </>
  )
}

export const makeMigrateAction: ActionMaker<MigrateData> = ({ t }) => ({
  key: ActionKey.Migrate,
  Icon: WhaleEmoji,
  label: t('title.migrateSmartContract'),
  description: t('info.migrateSmartContractActionDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
