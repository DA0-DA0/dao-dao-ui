import { fromBase64, toBase64 } from '@cosmjs/encoding'
import cloneDeep from 'lodash.clonedeep'
import { useCallback, useMemo } from 'react'

import { PubKey } from '@dao-dao/protobuf/codegen/cosmos/crypto/ed25519/keys'
import { MsgWithdrawValidatorCommission } from '@dao-dao/protobuf/codegen/cosmos/distribution/v1beta1/tx'
import { MsgUnjail } from '@dao-dao/protobuf/codegen/cosmos/slashing/v1beta1/tx'
import {
  MsgCreateValidator,
  MsgEditValidator,
} from '@dao-dao/protobuf/codegen/cosmos/staking/v1beta1/tx'
import { PickEmoji } from '@dao-dao/stateless'
import {
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  getNativeTokenForChainId,
  isDecodedStargateMsg,
  makeStargateMessage,
  toValidatorAddress,
} from '@dao-dao/utils'

import {
  ValidatorActionsComponent as Component,
  VALIDATOR_ACTION_TYPES,
  ValidatorActionsData,
} from './Component'

export const makeValidatorActionsAction: ActionMaker<ValidatorActionsData> = ({
  t,
  address,
  chain: { chain_id: chainId, bech32_prefix: bech32Prefix },
}) => {
  const validatorAddress = toValidatorAddress(address, bech32Prefix)

  const useTransformToCosmos: UseTransformToCosmos<ValidatorActionsData> = () =>
    useCallback(
      ({
        validatorActionTypeUrl: validatorActionType,
        createMsg,
        editMsg,
      }: ValidatorActionsData) => {
        switch (validatorActionType) {
          case MsgWithdrawValidatorCommission.typeUrl:
            return makeStargateMessage({
              stargate: {
                typeUrl: MsgWithdrawValidatorCommission.typeUrl,
                value: {
                  validatorAddress,
                } as MsgWithdrawValidatorCommission,
              },
            })
          case MsgCreateValidator.typeUrl:
            const parsed = JSON.parse(createMsg)
            return makeStargateMessage({
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
          case MsgEditValidator.typeUrl:
            return makeStargateMessage({
              stargate: {
                typeUrl: MsgEditValidator.typeUrl,
                value: JSON.parse(editMsg),
              },
            })
          case MsgUnjail.typeUrl:
            return makeStargateMessage({
              stargate: {
                typeUrl: MsgUnjail.typeUrl,
                value: {
                  validatorAddr: validatorAddress,
                } as MsgUnjail,
              },
            })
          default:
            throw Error('Unrecogonized validator action type')
        }
      },
      []
    )

  const useDefaults: UseDefaults<ValidatorActionsData> = () => ({
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
          rate: '50000000000000000',
          maxRate: '200000000000000000',
          maxChangeRate: '100000000000000000',
        },
        minSelfDelegation: '1',
        delegatorAddress: address,
        validatorAddress,
        pubkey: {
          typeUrl: PubKey.typeUrl,
          value: {
            key: '<the base64 public key of your node (binary tendermint show-validator)>',
          },
        },
        value: {
          denom: getNativeTokenForChainId(chainId).denomOrAddress,
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
        commissionRate: '50000000000000000',
        minSelfDelegation: '1',
        validatorAddress,
      },
      null,
      2
    ),
  })

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ValidatorActionsData> = (
    msg: Record<string, any>
  ) => {
    const data = useDefaults()

    return useMemo(() => {
      // Check this is a stargate message.
      if (!isDecodedStargateMsg(msg)) {
        return { match: false }
      }

      // Check that the type URL is a validator message, set data accordingly.
      const decodedData = cloneDeep(data)
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
              address ||
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
    }, [msg, data])
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
