import JSON5 from 'json5'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValueLoadable } from 'recoil'

import { contractAdminSelector } from '@dao-dao/state'
import {
  ActionBase,
  ChainProvider,
  DaoSupportedChainPickerInput,
  WhaleEmoji,
  useActionOptions,
} from '@dao-dao/stateless'
import { UnifiedCosmosMsg, makeStargateMessage } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { MsgMigrateContract as SecretMsgMigrateContract } from '@dao-dao/types/protobuf/codegen/secret/compute/v1beta1/msg'
import {
  bech32AddressToBase64,
  bech32DataToAddress,
  decodeJsonFromBase64,
  encodeJsonToBase64,
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  isSecretNetwork,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { MigrateContractComponent as StatelessMigrateContractComponent } from './Component'

type MigrateData = {
  chainId: string
  contract: string
  codeId: number
  msg: string
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
            contractAdmin: admin.valueMaybe(),
            onContractChange: (contract: string) => setContract(contract),
          }}
        />
      </ChainProvider>
    </>
  )
}

export class MigrateAction extends ActionBase<MigrateData> {
  public readonly key = ActionKey.Migrate
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: WhaleEmoji,
      label: options.t('title.migrateSmartContract'),
      description: options.t('info.migrateSmartContractActionDescription'),
      // The upgrade action (and likely future upgrade actions) are a specific
      // migrate action, so this needs to be after all those but before cross
      // chain and ICA execute.
      matchPriority: -90,
    })

    this.defaults = {
      chainId: options.chain.chainId,
      contract: '',
      codeId: 0,
      msg: '{}',
    }
  }

  encode({
    chainId,
    contract,
    codeId,
    msg: msgString,
  }: MigrateData): UnifiedCosmosMsg[] {
    const msg = JSON5.parse(msgString)

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      isSecretNetwork(chainId)
        ? makeStargateMessage({
            stargate: {
              typeUrl: SecretMsgMigrateContract.typeUrl,
              value: SecretMsgMigrateContract.fromAmino({
                sender: bech32AddressToBase64(
                  getChainAddressForActionOptions(this.options, chainId) || ''
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
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return (
      isDecodedStargateMsg(decodedMessage, SecretMsgMigrateContract) ||
      objectMatchesStructure(decodedMessage, {
        wasm: {
          migrate: {
            contract_addr: {},
            new_code_id: {},
            msg: {},
          },
        },
      })
    )
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): MigrateData {
    if (isDecodedStargateMsg(decodedMessage, SecretMsgMigrateContract)) {
      return {
        chainId,
        contract: bech32DataToAddress(
          chainId,
          decodedMessage.stargate.value.contract
        ),
        codeId: Number(decodedMessage.stargate.value.codeId),
        msg: JSON.stringify(
          decodeJsonFromBase64(decodedMessage.stargate.value.msg)
        ),
      }
    } else {
      return {
        chainId,
        contract: decodedMessage.wasm.migrate.contract_addr,
        codeId: decodedMessage.wasm.migrate.new_code_id,
        msg: JSON.stringify(decodedMessage.wasm.migrate.msg, undefined, 2),
      }
    }
  }
}
