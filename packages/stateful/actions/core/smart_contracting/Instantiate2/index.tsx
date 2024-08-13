import { instantiate2Address } from '@cosmjs/cosmwasm-stargate'
import { fromHex, fromUtf8, toBase64, toUtf8 } from '@cosmjs/encoding'
import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

import { codeDetailsSelector } from '@dao-dao/state/recoil'
import {
  BabyAngelEmoji,
  ChainProvider,
  DaoSupportedChainPickerInput,
} from '@dao-dao/stateless'
import { AccountType, TokenType, makeStargateMessage } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { MsgInstantiateContract2 } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'
import {
  convertDenomToMicroDenomStringWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodeIcaExecuteMsg,
  decodeJsonFromBase64,
  decodePolytoneExecuteMsg,
  getAccountAddress,
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  isSecretNetwork,
  maybeGetChainForChainId,
  maybeMakeIcaExecuteMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useQueryTokens } from '../../../../hooks'
import { useTokenBalances } from '../../../hooks'
import { useActionOptions } from '../../../react'
import {
  Instantiate2Data,
  Instantiate2Component as StatelessInstantiate2Component,
} from './Component'

// Account types that are allowed to instantiate from.
const ALLOWED_ACCOUNT_TYPES: readonly AccountType[] = [
  AccountType.Native,
  AccountType.Polytone,
  AccountType.Ica,
]

const Component: ActionComponent = (props) => {
  const { context, address } = useActionOptions()

  const { watch, setValue } = useFormContext<Instantiate2Data>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const codeId = watch((props.fieldNamePrefix + 'codeId') as 'codeId')
  const salt = watch((props.fieldNamePrefix + 'salt') as 'salt')
  const funds = watch((props.fieldNamePrefix + 'funds') as 'funds')

  const sender = watch((props.fieldNamePrefix + 'sender') as 'sender')
  // If sender is not found in the list of accounts, reset to the first account
  // on the target chain, or an empty account.
  useEffect(() => {
    if (
      sender &&
      !context.accounts.some(
        (a) => a.chainId === chainId && a.address === sender
      )
    ) {
      setValue(
        (props.fieldNamePrefix + 'sender') as 'sender',
        getAccountAddress({
          accounts: context.accounts,
          chainId,
          types: ALLOWED_ACCOUNT_TYPES,
        }) || ''
      )
    }
  }, [chainId, context.accounts, props.fieldNamePrefix, sender, setValue])

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
  })

  const chain = maybeGetChainForChainId(chainId)

  const instantiatedAddress =
    codeDetailsLoadable.state === 'hasValue' &&
    codeDetailsLoadable.contents &&
    chain
      ? instantiate2Address(
          fromHex(codeDetailsLoadable.contents.checksum),
          address,
          toUtf8(salt),
          chain.bech32_prefix
        )
      : undefined

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onChange={(chainId) => {
            // Reset funds and update admin/sender when switching chain.
            setValue((props.fieldNamePrefix + 'funds') as 'funds', [])

            const chainAddress =
              getAccountAddress({
                accounts: context.accounts,
                chainId,
                types: ALLOWED_ACCOUNT_TYPES,
              }) || ''
            setValue((props.fieldNamePrefix + 'admin') as 'admin', chainAddress)
            setValue(
              (props.fieldNamePrefix + 'sender') as 'sender',
              chainAddress
            )
          }}
        />
      )}

      <ChainProvider chainId={chainId}>
        <StatelessInstantiate2Component
          {...props}
          options={{
            nativeBalances: nativeBalances.loading
              ? nativeBalances
              : {
                  loading: false,
                  data: nativeBalances.data.filter(
                    ({ token, owner }) =>
                      token.chainId === chainId && owner.address === sender
                  ),
                },
            instantiatedAddress,
          }}
        />
      </ChainProvider>
    </>
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<Instantiate2Data> = (
  msg: Record<string, any>
) => {
  let {
    chain: { chain_id: chainId },
    address: sender,
    context: { accounts },
  } = useActionOptions()
  const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
    sender =
      getAccountAddress({
        accounts,
        chainId,
        types: [AccountType.Polytone],
      }) || ''
  } else {
    const decodedIca = decodeIcaExecuteMsg(chainId, msg)
    if (decodedIca.match) {
      chainId = decodedIca.chainId
      // should never be undefined since we check for 1 message in the decoder
      msg = decodedIca.msgWithSender?.msg || {}
      sender = decodedIca.msgWithSender?.sender || ''
    }
  }

  // Convert to CW msg format to use same matching logic below.
  if (
    isDecodedStargateMsg(msg) &&
    msg.stargate.typeUrl === MsgInstantiateContract2.typeUrl
  ) {
    msg = {
      wasm: {
        instantiate2: {
          admin: msg.stargate.value.admin,
          code_id: Number(msg.stargate.value.codeId),
          label: msg.stargate.value.label,
          msg: decodeJsonFromBase64(toBase64(msg.stargate.value.msg), true),
          funds: msg.stargate.value.funds,
          fix_msg: msg.stargate.value.fixMsg,
          salt: fromUtf8(msg.stargate.value.salt),
        },
      },
    }
  }

  const isWasmInstantiate2Msg = objectMatchesStructure(msg, {
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

  const funds: Coin[] | undefined = isWasmInstantiate2Msg
    ? msg.wasm.instantiate2.funds
    : undefined
  const fundsTokens = useQueryTokens(
    funds?.map(({ denom }) => ({
      chainId,
      type: TokenType.Native,
      denomOrAddress: denom,
    }))
  )

  // Can't match until we have the token info.
  if (fundsTokens.loading || fundsTokens.errored) {
    return { match: false }
  }

  return isWasmInstantiate2Msg
    ? {
        match: true,
        data: {
          chainId,
          sender,
          admin: msg.wasm.instantiate2.admin ?? '',
          codeId: msg.wasm.instantiate2.code_id,
          label: msg.wasm.instantiate2.label,
          message: JSON.stringify(msg.wasm.instantiate2.msg, undefined, 2),
          salt: msg.wasm.instantiate2.salt,
          funds: (msg.wasm.instantiate2.funds as Coin[]).map(
            ({ denom, amount }, index) => ({
              denom,
              amount: Number(
                convertMicroDenomToDenomWithDecimals(
                  amount,
                  fundsTokens.data[index].decimals
                )
              ),
              decimals: fundsTokens.data[index].decimals,
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

export const makeInstantiate2Action: ActionMaker<Instantiate2Data> = (
  options
) => {
  const {
    t,
    address,
    chain: { chain_id: currentChainId },
    context,
  } = options

  if (
    // Secret Network does not support instantiate2.
    isSecretNetwork(currentChainId)
  ) {
    return null
  }

  const useDefaults: UseDefaults<Instantiate2Data> = () => ({
    chainId: currentChainId,
    sender: address,
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
        sender,
        admin,
        codeId,
        label,
        message,
        salt,
        funds,
      }: Instantiate2Data) => {
        const account = context.accounts.find(
          (a) => a.chainId === chainId && a.address === sender
        )
        if (!account) {
          throw new Error('Instantiator account not found')
        }

        let msg
        try {
          msg = JSON5.parse(message)
        } catch (err) {
          console.error(`internal error. unparsable message: (${message})`, err)
          return
        }

        const convertedFunds = funds
          .map(({ denom, amount, decimals }) => ({
            denom,
            amount: convertDenomToMicroDenomStringWithDecimals(
              amount,
              decimals
            ),
          }))
          // Neutron errors with `invalid coins` if the funds list is not
          // alphabetized.
          .sort((a, b) => a.denom.localeCompare(b.denom))

        const instantiateMsg = makeStargateMessage({
          stargate: {
            typeUrl: MsgInstantiateContract2.typeUrl,
            value: MsgInstantiateContract2.fromPartial({
              sender: getChainAddressForActionOptions(options, chainId),
              admin: admin || '',
              codeId: codeId ? BigInt(codeId) : 0n,
              label,
              msg: toUtf8(JSON.stringify(msg)),
              funds: convertedFunds,
              salt: toUtf8(salt),
              fixMsg: false,
            }),
          },
        })

        return account.type === AccountType.Polytone
          ? maybeMakePolytoneExecuteMessage(
              currentChainId,
              account.chainId,
              instantiateMsg
            )
          : account.type === AccountType.Ica
          ? maybeMakeIcaExecuteMessage(
              currentChainId,
              account.chainId,
              address,
              account.address,
              instantiateMsg
            )
          : instantiateMsg
      },
      []
    )

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
