import { fromBase64, toBase64 } from '@cosmjs/encoding'
import cloneDeep from 'lodash.clonedeep'
import { useCallback } from 'react'

import { PickEmoji } from '@dao-dao/stateless'
import { ChainId } from '@dao-dao/types'
import {
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
  getChainForChainId,
  getNativeTokenForChainId,
  isDecodedStargateMsg,
  makeStargateMessage,
  maybeMakePolytoneExecuteMessage,
  toValidatorAddress,
} from '@dao-dao/utils'
import { PubKey } from '@dao-dao/utils/protobuf/codegen/cosmos/crypto/ed25519/keys'
import { MsgWithdrawValidatorCommission } from '@dao-dao/utils/protobuf/codegen/cosmos/distribution/v1beta1/tx'
import { MsgUnjail } from '@dao-dao/utils/protobuf/codegen/cosmos/slashing/v1beta1/tx'
import {
  MsgCreateValidator,
  MsgEditValidator,
} from '@dao-dao/utils/protobuf/codegen/cosmos/staking/v1beta1/tx'

import {
  ValidatorActionsComponent as Component,
  VALIDATOR_ACTION_TYPES,
  ValidatorActionsData,
} from './Component'

export const makeValidatorActionsAction: ActionMaker<ValidatorActionsData> = (
  options
) => {
  const {
    t,
    chain: { chain_id: currentChainId },
    context,
  } = options

  if (
    // Governance module cannot run a validator.
    context.type === ActionContextType.Gov ||
    // Neutron does not have validators.
    currentChainId === ChainId.NeutronMainnet
  ) {
    return null
  }

  const getValidatorAddress = (chainId: string) =>
    toValidatorAddress(
      getChainAddressForActionOptions(options, chainId) || '',
      getChainForChainId(chainId).bech32_prefix
    )

  const useTransformToCosmos: UseTransformToCosmos<ValidatorActionsData> = () =>
    useCallback(
      ({
        chainId,
        validatorActionTypeUrl: validatorActionType,
        createMsg,
        editMsg,
      }: ValidatorActionsData) => {
        const validatorAddress = getValidatorAddress(chainId)

        let msg
        switch (validatorActionType) {
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

        return maybeMakePolytoneExecuteMessage(currentChainId, chainId, msg)
      },
      []
    )

  const useDefaults: UseDefaults<ValidatorActionsData> = () => ({
    chainId: currentChainId,
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
          options,
          currentChainId
        ),
        validatorAddress: getValidatorAddress(currentChainId),
        pubkey: {
          typeUrl: PubKey.typeUrl,
          value: {
            key: '<the base64 public key of your node (binary tendermint show-validator)>',
          },
        },
        value: {
          denom: getNativeTokenForChainId(currentChainId).denomOrAddress,
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
        validatorAddress: getValidatorAddress(currentChainId),
      },
      null,
      2
    ),
  })

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ValidatorActionsData> = (
    msg: Record<string, any>
  ) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    const thisAddress = getChainAddressForActionOptions(options, chainId)
    const validatorAddress = getValidatorAddress(chainId)

    const data = useDefaults() as ValidatorActionsData

    if (
      !thisAddress ||
      // Check this is a stargate message.
      !isDecodedStargateMsg(msg)
    ) {
      return { match: false }
    }

    // Check that the type URL is a validator message, set data accordingly.
    const decodedData = cloneDeep(data)
    decodedData.chainId = chainId

    switch (msg.stargate.typeUrl) {
      case MsgWithdrawValidatorCommission.typeUrl:
        if (
          (msg.stargate.value as MsgWithdrawValidatorCommission)
            .validatorAddress !== validatorAddress
        ) {
          return { match: false }
        }

        decodedData.validatorActionTypeUrl =
          MsgWithdrawValidatorCommission.typeUrl
        break

      case MsgCreateValidator.typeUrl:
        if (
          (msg.stargate.value as MsgCreateValidator).delegatorAddress !==
            thisAddress ||
          (msg.stargate.value as MsgCreateValidator).validatorAddress !==
            validatorAddress
        ) {
          return { match: false }
        }

        decodedData.validatorActionTypeUrl = MsgCreateValidator.typeUrl
        const decodedPubkey = PubKey.decode(
          (msg.stargate.value as MsgCreateValidator).pubkey!.value
        )
        decodedData.createMsg = JSON.stringify(
          {
            ...msg.stargate.value,
            pubkey: {
              typeUrl: msg.stargate.value.pubkey!.typeUrl,
              value: {
                key: toBase64(decodedPubkey.key),
              },
            },
          },
          null,
          2
        )
        break

      case MsgEditValidator.typeUrl:
        if (
          (msg.stargate.value as MsgEditValidator).validatorAddress !==
          validatorAddress
        ) {
          return { match: false }
        }

        decodedData.validatorActionTypeUrl = MsgEditValidator.typeUrl
        decodedData.editMsg = JSON.stringify(msg.stargate.value, null, 2)
        break

      case MsgUnjail.typeUrl:
        if (
          (msg.stargate.value as MsgUnjail).validatorAddr !== validatorAddress
        ) {
          return { match: false }
        }

        decodedData.validatorActionTypeUrl = MsgUnjail.typeUrl
        break

      default:
        // No validator action type URL match, so return a false match.
        return { match: false }
    }

    return {
      match: true,
      data: decodedData,
    }
  }

  return {
    key: ActionKey.ValidatorActions,
    Icon: PickEmoji,
    label: t('title.validatorActions'),
    description: t('info.validatorActionsDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
