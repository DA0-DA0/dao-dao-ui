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
import { MsgRevoke } from '@dao-dao/types/protobuf/codegen/cosmos/authz/v1beta1/tx'
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
import { DeauthorizeVoterComponent, DeauthorizeVoterData } from './Component'

const Component: ActionComponent = (props) => {
  const { t, context } = useActionOptions()
  const { watch, setValue } = useFormContext<DeauthorizeVoterData>()
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
      <p className="body-text">
        {t('info.deauthorizeVoterDescription', {
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
        <DeauthorizeVoterComponent
          {...props}
          options={{
            AddressInput,
          }}
        />
      </ChainProvider>
    </>
  )
}

// TODO: support both v1 and v1beta1 votes. also choose the right one in gov UI
export const makeDeauthorizeVoterAction: ActionMaker<DeauthorizeVoterData> = (
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

  const useDefaults: UseDefaults<DeauthorizeVoterData> = () => ({
    chainId: currentChainId,
    voter: '',
    v1: undefined,
  })

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<DeauthorizeVoterData> = (
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
      msg.stargate.typeUrl !== MsgRevoke.typeUrl ||
      !objectMatchesStructure(msg.stargate.value, {
        grantee: {},
        granter: {},
        msgTypeUrl: {},
      }) ||
      (msg.stargate.value.msgTypeUrl !== MsgVoteV1Beta1.typeUrl &&
        msg.stargate.value.msgTypeUrl !== MsgVoteV1.typeUrl)
    ) {
      return { match: false }
    }

    return {
      match: true,
      data: {
        chainId,
        voter: msg.stargate.value.grantee,
        v1: msg.stargate.value.msgTypeUrl === MsgVoteV1.typeUrl,
      },
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<DeauthorizeVoterData> = () =>
    useCallback(({ chainId, voter, v1 }: DeauthorizeVoterData) => {
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
            typeUrl: MsgRevoke.typeUrl,
            value: {
              granter: getChainAddressForActionOptions(options, chainId),
              grantee: voter,
              msgTypeUrl: (v1 ? MsgVoteV1 : MsgVoteV1Beta1).typeUrl,
            } as MsgRevoke,
          },
        })
      )
    }, [])

  return {
    key: ActionKey.DeauthorizeVoter,
    Icon: KeyEmoji,
    label: t('title.deauthorizeVoter'),
    description: t('info.deauthorizeVoterDescription', {
      context: context.type,
    }),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
