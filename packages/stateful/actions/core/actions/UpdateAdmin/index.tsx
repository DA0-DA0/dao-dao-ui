import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { contractAdminSelector } from '@dao-dao/state'
import {
  ActionBase,
  ChainProvider,
  DaoSupportedChainPickerInput,
  MushroomEmoji,
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
import { MsgUpdateAdmin as SecretMsgUpdateAdmin } from '@dao-dao/types/protobuf/codegen/secret/compute/v1beta1/msg'
import {
  getChainAddressForActionOptions,
  getChainForChainId,
  isDecodedStargateMsg,
  isSecretNetwork,
  isValidBech32Address,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { UpdateAdminComponent as StatelessUpdateAdminComponent } from './Component'

export type UpdateAdminData = {
  chainId: string
  contract: string
  newAdmin: string
}

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()
  const { watch } = useFormContext<UpdateAdminData>()

  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const { bech32Prefix } = getChainForChainId(chainId)

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

export class UpdateAdminAction extends ActionBase<UpdateAdminData> {
  public readonly key = ActionKey.UpdateAdmin
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: MushroomEmoji,
      label: options.t('title.updateContractAdmin'),
      description: options.t('info.updateContractAdminActionDescription'),
    })

    this.defaults = {
      chainId: options.chain.chainId,
      contract: '',
      newAdmin: '',
    }
  }

  encode({ chainId, contract, newAdmin }: UpdateAdminData): UnifiedCosmosMsg[] {
    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      isSecretNetwork(chainId)
        ? makeStargateMessage({
            stargate: {
              typeUrl: SecretMsgUpdateAdmin.typeUrl,
              value: SecretMsgUpdateAdmin.fromAmino({
                sender:
                  getChainAddressForActionOptions(this.options, chainId) || '',
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
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return (
      isDecodedStargateMsg(decodedMessage, SecretMsgUpdateAdmin) ||
      objectMatchesStructure(decodedMessage, {
        wasm: {
          update_admin: {
            contract_addr: {},
            admin: {},
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
  ]: ProcessedMessage[]): UpdateAdminData {
    if (isDecodedStargateMsg(decodedMessage, SecretMsgUpdateAdmin)) {
      return {
        chainId,
        contract: decodedMessage.stargate.value.contract,
        newAdmin: decodedMessage.stargate.value.newAdmin,
      }
    } else {
      return {
        chainId,
        contract: decodedMessage.wasm.update_admin.contract_addr,
        newAdmin: decodedMessage.wasm.update_admin.admin,
      }
    }
  }
}
