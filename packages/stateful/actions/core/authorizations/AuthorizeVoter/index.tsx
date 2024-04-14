import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValueLoadable } from 'recoil'

import { chainSupportsV1GovModuleSelector } from '@dao-dao/state'
import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  KeyEmoji,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
  makeStargateMessage,
} from '@dao-dao/types'
import { GenericAuthorization } from '@dao-dao/types/protobuf/codegen/cosmos/authz/v1beta1/authz'
import { MsgGrant } from '@dao-dao/types/protobuf/codegen/cosmos/authz/v1beta1/tx'
import { MsgVote as MsgVoteV1 } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1/tx'
import { MsgVote as MsgVoteV1Beta1 } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/tx'
import {
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { useActionOptions } from '../../../react'
import { AuthorizeVoterComponent, AuthorizeVoterData } from './Component'

const Component: ActionComponent = (props) => {
  const { t, context } = useActionOptions()
  const { watch, setValue } = useFormContext<AuthorizeVoterData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  // Detect whether or not this chain uses the v1 gov module.
  const supportsV1 = useRecoilValueLoadable(
    chainSupportsV1GovModuleSelector({ chainId })
  )
  useEffect(() => {
    if (supportsV1.state === 'hasValue') {
      setValue((props.fieldNamePrefix + 'v1') as 'v1', supportsV1.contents)
    } else {
      setValue((props.fieldNamePrefix + 'v1') as 'v1', undefined)
    }
  }, [supportsV1, setValue, props.fieldNamePrefix])

  return (
    <>
      <p className="body-text text-text-secondary">
        {t('info.authorizeVoterDescription', {
          context: context.type,
        })}
      </p>

      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onlyDaoChainIds
        />
      )}

      <ChainProvider chainId={chainId}>
        <AuthorizeVoterComponent
          {...props}
          options={{
            AddressInput,
          }}
        />
      </ChainProvider>
    </>
  )
}

export const makeAuthorizeVoterAction: ActionMaker<AuthorizeVoterData> = (
  options
) => {
  const {
    t,
    chain: { chain_id: currentChainId },
    context,
  } = options

  // Gov module cannot vote.
  if (context.type === ActionContextType.Gov) {
    return null
  }

  const useDefaults: UseDefaults<AuthorizeVoterData> = () => ({
    chainId: currentChainId,
    voter: '',
    v1: undefined,
  })

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<AuthorizeVoterData> = (
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
      msg.stargate.typeUrl !== MsgGrant.typeUrl ||
      !objectMatchesStructure(msg.stargate.value, {
        grantee: {},
        granter: {},
      })
    ) {
      return { match: false }
    }

    const grantMsg = msg.stargate.value as MsgGrant
    const authorizationTypeUrl =
      // If not auto-decoded, will be Any. This should be the case for the
      // CosmWasm contract authorizations. $typeUrl will be Any which is
      // unhelpful.
      grantMsg.grant?.authorization?.typeUrl ||
      // If auto-decoded, such as Generic or Send, this will be set instead.
      grantMsg.grant?.authorization?.$typeUrl

    // If not generic authorization type or delegating voting, this is not a
    // match.
    if (authorizationTypeUrl !== GenericAuthorization.typeUrl) {
      return { match: false }
    }

    const msgTypeUrl = (grantMsg.grant!.authorization as GenericAuthorization)
      .msg

    return msgTypeUrl === MsgVoteV1Beta1.typeUrl ||
      msgTypeUrl === MsgVoteV1.typeUrl
      ? {
          match: true,
          data: {
            chainId,
            voter: grantMsg.grantee,
            v1: msgTypeUrl === MsgVoteV1.typeUrl,
          },
        }
      : {
          match: false,
        }
  }

  const useTransformToCosmos: UseTransformToCosmos<AuthorizeVoterData> = () =>
    useCallback(({ chainId, voter, v1 }: AuthorizeVoterData) => {
      if (v1 === undefined) {
        throw new Error(t('error.detectingGovVersionTryAgain'))
      }

      // Expiration set to 10 years.
      const expiration = new Date()
      expiration.setFullYear(expiration.getFullYear() + 10)
      // Encoder needs a whole number of seconds.
      expiration.setMilliseconds(0)

      return maybeMakePolytoneExecuteMessage(
        currentChainId,
        chainId,
        makeStargateMessage({
          stargate: {
            typeUrl: MsgGrant.typeUrl,
            value: {
              grant: {
                authorization: GenericAuthorization.toProtoMsg({
                  msg: (v1 ? MsgVoteV1 : MsgVoteV1Beta1).typeUrl,
                }),
                expiration,
              },
              grantee: voter,
              granter: getChainAddressForActionOptions(options, chainId),
            },
          },
        })
      )
    }, [])

  return {
    key: ActionKey.AuthorizeVoter,
    Icon: KeyEmoji,
    label: t('title.authorizeVoter'),
    description: t('info.authorizeVoterDescription', {
      context: context.type,
    }),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
