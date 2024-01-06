import { fromBase64, toBase64 } from '@cosmjs/encoding'
import { useCallback } from 'react'
import { Trans } from 'react-i18next'

import {
  ComputerDiskEmoji,
  DaoSupportedChainPickerInput,
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
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  makeStargateMessage,
  maybeMakePolytoneExecuteMessage,
} from '@dao-dao/utils'
import { MsgStoreCode } from '@dao-dao/utils/protobuf/codegen/cosmwasm/wasm/v1/tx'

import { useActionOptions } from '../../../react'
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
        }}
      />
    </>
  )
}

export const makeUploadCodeAction: ActionMaker<UploadCodeData> = (options) => {
  const {
    t,
    chain: { chain_id: currentChainId },
    context,
  } = options

  const useDefaults: UseDefaults<UploadCodeData> = () => ({
    chainId: currentChainId,
  })

  const useTransformToCosmos: UseTransformToCosmos<UploadCodeData> = () =>
    useCallback(({ chainId, data }: UploadCodeData) => {
      if (!data) {
        return
      }

      return maybeMakePolytoneExecuteMessage(
        currentChainId,
        chainId,
        makeStargateMessage({
          stargate: {
            typeUrl: MsgStoreCode.typeUrl,
            value: {
              sender: getChainAddressForActionOptions(options, chainId),
              wasmByteCode: fromBase64(data),
            } as MsgStoreCode,
          },
        })
      )
    }, [])

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<UploadCodeData> = (
    msg: Record<string, any>
  ) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    if (
      !isDecodedStargateMsg(msg) ||
      msg.stargate.typeUrl !== MsgStoreCode.typeUrl
    ) {
      return {
        match: false,
      }
    }

    return {
      match: true,
      data: {
        chainId,
        data: toBase64(msg.stargate.value.wasmByteCode),
      },
    }
  }

  return {
    key: ActionKey.UploadCode,
    Icon: ComputerDiskEmoji,
    label: t('title.uploadSmartContractCode'),
    description: t('info.uploadSmartContractCodeActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    // DAO proposal modules limit the sizes of proposals such that uploading
    // almost any wasm file is impossible. Until we figure out a workaround,
    // hide it from being selected in a DAO. Wallets and chain governance
    // proposals can still use this.
    hideFromPicker: context.type === ActionContextType.Dao,
  }
}
