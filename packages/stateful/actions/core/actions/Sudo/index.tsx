import { toBase64 } from '@cosmjs/encoding'
import JSON5 from 'json5'
import { useFormContext } from 'react-hook-form'

import { contractQueries } from '@dao-dao/state'
import {
  ActionBase,
  ChainProvider,
  DaoSupportedChainPickerInput,
  PlungerEmoji,
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
import { MsgSudoContract } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'
import {
  decodeJsonFromBase64,
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessages,
} from '@dao-dao/utils'

import { useQueryLoadingDataWithError } from '../../../../hooks'
import {
  SudoContractComponent as StatelessSudoContractComponent,
  SudoData,
} from './Component'

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()
  const { watch } = useFormContext<SudoData>()

  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const contract = watch((props.fieldNamePrefix + 'contract') as 'contract')

  const admin = useQueryLoadingDataWithError(
    contractQueries.admin({
      chainId,
      address: contract,
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
        <StatelessSudoContractComponent
          {...props}
          options={{
            admin,
          }}
        />
      </ChainProvider>
    </>
  )
}

export class SudoAction extends ActionBase<SudoData> {
  public readonly key = ActionKey.Sudo
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: PlungerEmoji,
      label: options.t('title.sudoSmartContract'),
      description: options.t('info.sudoSmartContractActionDescription'),
    })

    this.defaults = {
      chainId: options.chain.chainId,
      contract: '',
      msg: '{}',
    }
  }

  encode({ chainId, contract, msg: msgString }: SudoData): UnifiedCosmosMsg[] {
    const msg = JSON5.parse(msgString)

    const authority = getChainAddressForActionOptions(this.options, chainId)
    if (!authority) {
      throw new Error('No account address found for chain')
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      makeStargateMessage({
        stargate: {
          typeUrl: MsgSudoContract.typeUrl,
          value: MsgSudoContract.fromAmino({
            authority,
            contract,
            msg,
          }),
        },
      })
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return isDecodedStargateMsg(decodedMessage, MsgSudoContract)
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): SudoData {
    return {
      chainId,
      contract: decodedMessage.stargate.value.contract,
      msg: JSON.stringify(
        decodeJsonFromBase64(toBase64(decodedMessage.stargate.value.msg), true),
        null,
        2
      ),
    }
  }
}
