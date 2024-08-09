import { fromBase64, fromBech32, toBase64 } from '@cosmjs/encoding'
import { Trans } from 'react-i18next'

import {
  ActionBase,
  ComputerDiskEmoji,
  DaoSupportedChainPickerInput,
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
import { MsgStoreCode } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'
import { AccessType } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/types'
import { MsgStoreCode as SecretMsgStoreCode } from '@dao-dao/types/protobuf/codegen/secret/compute/v1beta1/msg'
import {
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  isGzipped,
  isSecretNetwork,
  maybeMakePolytoneExecuteMessages,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { UploadCodeComponent, UploadCodeData } from './Component'

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
        />
      )}

      <UploadCodeComponent
        {...props}
        options={{
          Trans,
          AddressInput,
        }}
      />
    </>
  )
}

export class UploadCodeAction extends ActionBase<UploadCodeData> {
  public readonly key = ActionKey.UploadCode
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: ComputerDiskEmoji,
      label: options.t('title.uploadSmartContractCode'),
      description: options.t('info.uploadSmartContractCodeActionDescription'),
      // DAO proposal modules limit the sizes of proposals such that uploading
      // almost any wasm file is impossible. Until we figure out a workaround,
      // hide it from being selected in a DAO. Wallets and chain governance
      // proposals can still use this.
      hideFromPicker: options.context.type === ActionContextType.Dao,
    })

    this.defaults = {
      chainId: options.chain.chain_id,
      accessType: AccessType.Everybody,
      allowedAddresses: [{ address: options.address }],
    }
  }

  encode({
    chainId,
    data,
    accessType,
    allowedAddresses,
  }: UploadCodeData): UnifiedCosmosMsg[] {
    if (!data) {
      return []
    }

    const sender = getChainAddressForActionOptions(this.options, chainId)
    if (!sender) {
      throw new Error('No sender found for chain')
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chain_id,
      chainId,
      makeStargateMessage({
        stargate: isSecretNetwork(chainId)
          ? {
              typeUrl: SecretMsgStoreCode.typeUrl,
              value: SecretMsgStoreCode.fromPartial({
                sender: fromBech32(sender).data,
                wasmByteCode: fromBase64(data),
              }),
            }
          : {
              typeUrl: MsgStoreCode.typeUrl,
              value: MsgStoreCode.fromPartial({
                sender,
                wasmByteCode: fromBase64(data),
                instantiatePermission: {
                  permission: accessType,
                  addresses:
                    accessType === AccessType.AnyOfAddresses
                      ? allowedAddresses.map(({ address }) => address)
                      : [],
                },
              }),
            },
      })
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return isDecodedStargateMsg(decodedMessage, [
      MsgStoreCode,
      SecretMsgStoreCode,
    ])
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): UploadCodeData {
    const wasmByteCode = decodedMessage.stargate.value
      .wasmByteCode as Uint8Array
    const gzipped =
      wasmByteCode instanceof Uint8Array && isGzipped(wasmByteCode)

    return {
      chainId,
      data: toBase64(wasmByteCode),
      gzipped,
      accessType:
        decodedMessage.stargate.value.instantiatePermission?.permission ??
        AccessType.UNRECOGNIZED,
      allowedAddresses:
        decodedMessage.stargate.value.instantiatePermission?.addresses?.map(
          (address: string) => ({ address })
        ) ?? [],
    }
  }
}
