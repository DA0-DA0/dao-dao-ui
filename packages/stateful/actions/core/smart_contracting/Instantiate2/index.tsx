import { instantiate2Address } from '@cosmjs/cosmwasm-stargate'
import { fromHex, toUtf8 } from '@cosmjs/encoding'
import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

import { codeDetailsSelector } from '@dao-dao/state/recoil'
import {
  BabyAngelEmoji,
  ChainPickerInput,
  ChainProvider,
} from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'
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
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodePolytoneExecuteMsg,
  getNativeTokenForChainId,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useTokenBalances } from '../../../hooks'
import { useActionOptions } from '../../../react'
import { Instantiate2Component as StatelessInstantiate2Component } from './Component'

// TODO(instantiate2): fix pre-propose msg issue

type Instantiate2Data = {
  chainId: string
  admin: string
  codeId: number
  label: string
  message: string
  salt: string
  funds: { denom: string; amount: number }[]
}

const Component: ActionComponent = (props) => {
  const {
    context,
    address,
    chain: { chain_id: currentChainId, bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { watch, setValue } = useFormContext<Instantiate2Data>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const codeId = watch((props.fieldNamePrefix + 'codeId') as 'codeId')
  const salt = watch((props.fieldNamePrefix + 'salt') as 'salt')
  const funds = watch((props.fieldNamePrefix + 'funds') as 'funds')

  // Load checksum of the contract code.
  const codeDetailsLoadable = useRecoilValueLoadable(
    chainId && codeId && !isNaN(codeId)
      ? codeDetailsSelector({
          chainId,
          codeId,
        })
      : constSelector(undefined)
  )

  const nativeBalances = useTokenBalances({
    filter: TokenType.Native,
    // Load selected tokens when not creating in case they are no longer
    // returned in the list of all tokens for the given DAO/wallet after the
    // proposal is made.
    additionalTokens: props.isCreating
      ? undefined
      : funds.map(({ denom }) => ({
          chainId,
          type: TokenType.Native,
          denomOrAddress: denom,
        })),
    allChains: true,
  })

  const instantiatedAddress =
    codeDetailsLoadable.state === 'hasValue' && codeDetailsLoadable.contents
      ? instantiate2Address(
          fromHex(codeDetailsLoadable.contents.checksum),
          address,
          toUtf8(salt),
          bech32Prefix
        )
      : undefined

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <ChainPickerInput
          className="mb-4"
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onChange={(chainId) => {
            // Reset funds and update admin when switching chain.
            setValue((props.fieldNamePrefix + 'funds') as 'funds', [])
            setValue(
              (props.fieldNamePrefix + 'admin') as 'admin',
              chainId === currentChainId
                ? address
                : context.info.polytoneProxies[chainId] ?? ''
            )
          }}
        />
      )}

      <ChainProvider chainId={chainId}>
        <StatelessInstantiate2Component
          {...props}
          options={{
            nativeBalances,
            instantiatedAddress,
          }}
        />
      </ChainProvider>
    </>
  )
}

export const makeInstantiate2Action: ActionMaker<Instantiate2Data> = ({
  t,
  address,
  chain: { chain_id: currentChainId },
}) => {
  const useDefaults: UseDefaults<Instantiate2Data> = () => ({
    chainId: currentChainId,
    admin: address,
    codeId: 0,
    label: '',
    message: '{}',
    salt: uuidv4(),
    funds: [],
  })

  const useTransformToCosmos: UseTransformToCosmos<Instantiate2Data> = () =>
    useCallback(
      ({
        chainId,
        admin,
        codeId,
        label,
        message,
        salt,
        funds,
      }: Instantiate2Data) => {
        let msg
        try {
          msg = JSON5.parse(message)
        } catch (err) {
          console.error(`internal error. unparsable message: (${message})`, err)
          return
        }

        return maybeMakePolytoneExecuteMessage(
          currentChainId,
          chainId,
          makeWasmMessage({
            wasm: {
              instantiate2: {
                admin: admin || null,
                code_id: codeId,
                funds: funds.map(({ denom, amount }) => ({
                  denom,
                  amount: convertDenomToMicroDenomWithDecimals(
                    amount,
                    getNativeTokenForChainId(chainId).decimals
                  ).toString(),
                })),
                label,
                msg,
                salt,
                fix_msg: false,
              },
            },
          })
        )
      },
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<Instantiate2Data> = (
    msg: Record<string, any>
  ) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    return objectMatchesStructure(msg, {
      wasm: {
        instantiate2: {
          code_id: {},
          label: {},
          msg: {},
          funds: {},
          salt: {},
          fix_msg: {},
        },
      },
    })
      ? {
          match: true,
          data: {
            chainId,
            admin: msg.wasm.instantiate.admin ?? '',
            codeId: msg.wasm.instantiate.code_id,
            label: msg.wasm.instantiate.label,
            message: JSON.stringify(msg.wasm.instantiate.msg, undefined, 2),
            salt: msg.wasm.instantiate.salt,
            funds: (msg.wasm.instantiate.funds as Coin[]).map(
              ({ denom, amount }) => ({
                denom,
                amount: Number(
                  convertMicroDenomToDenomWithDecimals(
                    amount,
                    getNativeTokenForChainId(chainId).decimals
                  )
                ),
              })
            ),
            _polytone: decodedPolytone.match
              ? {
                  chainId: decodedPolytone.chainId,
                  note: decodedPolytone.polytoneConnection,
                  initiatorMsg: decodedPolytone.initiatorMsg,
                }
              : undefined,
          },
        }
      : {
          match: false,
        }
  }

  return {
    key: ActionKey.Instantiate2,
    Icon: BabyAngelEmoji,
    label: t('title.instantiatePredictableSmartContract'),
    description: t('info.instantiatePredictableSmartContractActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}