import { fromBase64, toBase64 } from '@cosmjs/encoding'

import { ActionBase, PickEmoji } from '@dao-dao/stateless'
import { ChainId, UnifiedCosmosMsg, makeStargateMessage } from '@dao-dao/types'
import {
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { PubKey } from '@dao-dao/types/protobuf/codegen/cosmos/crypto/ed25519/keys'
import { MsgWithdrawValidatorCommission } from '@dao-dao/types/protobuf/codegen/cosmos/distribution/v1beta1/tx'
import { MsgUnjail } from '@dao-dao/types/protobuf/codegen/cosmos/slashing/v1beta1/tx'
import {
  MsgCreateValidator,
  MsgEditValidator,
} from '@dao-dao/types/protobuf/codegen/cosmos/staking/v1beta1/tx'
import {
  getChainAddressForActionOptions,
  getChainForChainId,
  getNativeTokenForChainId,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessages,
  toValidatorAddress,
} from '@dao-dao/utils'

import {
  VALIDATOR_ACTION_TYPES,
  ValidatorActionsComponent,
  ValidatorActionsData,
} from './Component'

export class ValidatorActionsAction extends ActionBase<ValidatorActionsData> {
  public readonly key = ActionKey.ValidatorActions
  public readonly Component = ValidatorActionsComponent

  constructor(options: ActionOptions) {
    // Governance module cannot run a validator.
    if (options.context.type === ActionContextType.Gov) {
      throw new Error(
        'Validator actions are not available from chain governance'
      )
    }

    // Neutron does not have validators.
    if (
      options.chain.chainId === ChainId.NeutronMainnet ||
      options.chain.chainId === ChainId.NeutronTestnet
    ) {
      throw new Error('Validator actions are not available on Neutron')
    }

    super(options, {
      Icon: PickEmoji,
      label: options.t('title.validatorActions'),
      description: options.t('info.validatorActionsDescription'),
    })
  }

  setup() {
    this.defaults = {
      chainId: this.options.chain.chainId,
      validatorActionTypeUrl: VALIDATOR_ACTION_TYPES[0].typeUrl,
      createMsg: JSON.stringify(
        {
          description: {
            moniker: '<validator name>',
            identity: '<optional identity signature (ex. UPort or Keybase)>',
            website: '<your validator website>',
            securityContact: '<optional security contact email>',
            details: '<description of your validator>',
          },
          commission: {
            rate: '0.05',
            maxRate: '0.2',
            maxChangeRate: '0.1',
          },
          minSelfDelegation: '1',
          delegatorAddress: getChainAddressForActionOptions(
            this.options,
            this.options.chain.chainId
          ),
          validatorAddress: this.getValidatorAddress(
            this.options.chain.chainId
          ),
          pubkey: {
            typeUrl: PubKey.typeUrl,
            value: {
              key: '<the base64 public key of your node (binary tendermint show-validator)>',
            },
          },
          value: {
            denom: getNativeTokenForChainId(this.options.chain.chainId)
              .denomOrAddress,
            amount: '1000000',
          },
        },
        null,
        2
      ),
      editMsg: JSON.stringify(
        {
          description: {
            moniker: '<validator name>',
            identity: '<optional identity signature (ex. UPort or Keybase)>',
            website: '<your validator website>',
            securityContact: '<optional security contact email>',
            details: '<description of your validator>',
          },
          commissionRate: '0.05',
          minSelfDelegation: '1',
          validatorAddress: this.getValidatorAddress(
            this.options.chain.chainId
          ),
        },
        null,
        2
      ),
    }
  }

  getValidatorAddress(chainId: string) {
    return toValidatorAddress(
      getChainAddressForActionOptions(this.options, chainId) || '',
      getChainForChainId(chainId).bech32Prefix
    )
  }

  encode({
    chainId,
    validatorActionTypeUrl,
    createMsg,
    editMsg,
  }: ValidatorActionsData): UnifiedCosmosMsg[] {
    const validatorAddress = this.getValidatorAddress(chainId)

    let msg
    switch (validatorActionTypeUrl) {
      case MsgWithdrawValidatorCommission.typeUrl:
        msg = makeStargateMessage({
          stargate: {
            typeUrl: MsgWithdrawValidatorCommission.typeUrl,
            value: {
              validatorAddress,
            } as MsgWithdrawValidatorCommission,
          },
        })
        break
      case MsgCreateValidator.typeUrl:
        const parsed = JSON.parse(createMsg)
        msg = makeStargateMessage({
          stargate: {
            typeUrl: MsgCreateValidator.typeUrl,
            value: {
              ...parsed,
              pubkey: PubKey.toProtoMsg({
                key: fromBase64(parsed.pubkey.value.key),
              }),
            },
          },
        })
        break
      case MsgEditValidator.typeUrl:
        msg = makeStargateMessage({
          stargate: {
            typeUrl: MsgEditValidator.typeUrl,
            value: JSON.parse(editMsg),
          },
        })
        break
      case MsgUnjail.typeUrl:
        msg = makeStargateMessage({
          stargate: {
            typeUrl: MsgUnjail.typeUrl,
            value: {
              validatorAddr: validatorAddress,
            } as MsgUnjail,
          },
        })
        break
      default:
        throw Error('Unrecogonized validator action type')
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      msg
    )
  }

  match([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): ActionMatch {
    const thisAddress = getChainAddressForActionOptions(this.options, chainId)
    const validatorAddress = this.getValidatorAddress(chainId)

    if (
      !thisAddress ||
      // Ensure this is a stargate message.
      !isDecodedStargateMsg(decodedMessage, VALIDATOR_ACTION_TYPES)
    ) {
      return false
    }

    switch (decodedMessage.stargate.typeUrl) {
      case MsgWithdrawValidatorCommission.typeUrl: {
        if (
          (decodedMessage.stargate.value as MsgWithdrawValidatorCommission)
            .validatorAddress !== validatorAddress
        ) {
          return false
        }

        break
      }

      case MsgCreateValidator.typeUrl: {
        if (
          (decodedMessage.stargate.value as MsgCreateValidator)
            .delegatorAddress !== thisAddress ||
          (decodedMessage.stargate.value as MsgCreateValidator)
            .validatorAddress !== validatorAddress
        ) {
          return false
        }

        break
      }

      case MsgEditValidator.typeUrl: {
        if (
          (decodedMessage.stargate.value as MsgEditValidator)
            .validatorAddress !== validatorAddress
        ) {
          return false
        }

        break
      }

      case MsgUnjail.typeUrl: {
        if (
          (decodedMessage.stargate.value as MsgUnjail).validatorAddr !==
          validatorAddress
        ) {
          return false
        }

        break
      }

      default:
        // No validator action type URL match, so return a false match.
        return false
    }

    return true
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): Partial<ValidatorActionsData> {
    switch (decodedMessage.stargate.typeUrl) {
      case MsgWithdrawValidatorCommission.typeUrl:
        return {
          chainId,
          validatorActionTypeUrl: MsgWithdrawValidatorCommission.typeUrl,
        }

      case MsgCreateValidator.typeUrl:
        return {
          chainId,
          validatorActionTypeUrl: MsgCreateValidator.typeUrl,
          createMsg: JSON.stringify(
            {
              ...decodedMessage.stargate.value,
              pubkey: {
                typeUrl: decodedMessage.stargate.value.pubkey!.typeUrl,
                value: {
                  key: toBase64(
                    PubKey.decode(
                      (decodedMessage.stargate.value as MsgCreateValidator)
                        .pubkey!.value
                    ).key
                  ),
                },
              },
            },
            null,
            2
          ),
        }

      case MsgEditValidator.typeUrl:
        return {
          chainId,
          validatorActionTypeUrl: MsgEditValidator.typeUrl,
          editMsg: JSON.stringify(decodedMessage.stargate.value, null, 2),
        }

      case MsgUnjail.typeUrl:
        return {
          chainId,
          validatorActionTypeUrl: MsgUnjail.typeUrl,
        }

      default:
        // Should never happen since this is validated in match.
        throw new Error('Unrecognized validator action type')
    }
  }
}
