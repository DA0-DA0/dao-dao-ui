import { useCallback } from 'react'

import {
  DaoVotingTokenStakedSelectors,
  contractDetailsSelector,
} from '@dao-dao/state/recoil'
import { HerbEmoji, useCachedLoadable } from '@dao-dao/stateless'
import { ChainId } from '@dao-dao/types'
import {
  ActionChainContextType,
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseHideFromPicker,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  convertDenomToMicroDenomStringWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../../../actions'
import { AddressInput } from '../../../../../components/AddressInput'
import { useVotingModuleAdapterOptions } from '../../../../react/context'
import { useGovernanceTokenInfo } from '../../hooks'
import {
  MintData,
  MintComponent as StatelessMintComponent,
} from './MintComponent'

const useTransformToCosmos: UseTransformToCosmos<MintData> = () => {
  const {
    tokenFactoryIssuerAddress,
    governanceToken: { decimals },
  } = useGovernanceTokenInfo()

  return useCallback(
    ({ recipient, amount }: MintData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: tokenFactoryIssuerAddress,
            funds: [],
            msg: {
              mint: {
                to_address: recipient,
                amount: convertDenomToMicroDenomStringWithDecimals(
                  amount,
                  decimals
                ),
              },
            },
          },
        },
      }),
    [decimals, tokenFactoryIssuerAddress]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<MintData> = (
  msg: Record<string, any>
) => {
  const {
    tokenFactoryIssuerAddress,
    governanceToken: { decimals },
  } = useGovernanceTokenInfo()

  return objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        msg: {
          mint: {
            amount: {},
            to_address: {},
          },
        },
      },
    },
  }) && msg.wasm.execute.contract_addr === tokenFactoryIssuerAddress
    ? {
        match: true,
        data: {
          recipient: msg.wasm.execute.msg.mint.to_address,
          amount: convertMicroDenomToDenomWithDecimals(
            msg.wasm.execute.msg.mint.amount,
            decimals
          ),
        },
      }
    : {
        match: false,
      }
}

const Component: ActionComponent = (props) => {
  const { governanceToken } = useGovernanceTokenInfo()

  return (
    <StatelessMintComponent
      {...props}
      options={{
        govToken: governanceToken,
        AddressInput,
      }}
    />
  )
}

// Only show in picker if using cw-tokenfactory-issuer contract.
const useHideFromPicker: UseHideFromPicker = () => {
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()
  const { chainContext } = useActionOptions()

  const tfIssuer = useCachedLoadable(
    DaoVotingTokenStakedSelectors.validatedTokenfactoryIssuerContractSelector({
      contractAddress: votingModuleAddress,
      chainId,
    })
  )
  const tfIssuerContract = useCachedLoadable(
    tfIssuer.state === 'hasValue' && tfIssuer.contents
      ? contractDetailsSelector({
          contractAddress: tfIssuer.contents,
          chainId,
        })
      : undefined
  )

  return (
    tfIssuer.state !== 'hasValue' ||
    !tfIssuer.contents ||
    // Disallow minting on Miagloo if cw-tokenfactory-issuer is on old version.
    (chainContext.chainId === ChainId.MigalooMainnet &&
      chainContext.type === ActionChainContextType.Supported &&
      (tfIssuerContract.state !== 'hasValue' ||
        tfIssuerContract.contents.codeId ===
          chainContext.config.codeIds.CwTokenfactoryIssuerCosmWasm))
  )
}

export const makeMintAction: ActionMaker<MintData> = ({ t, address }) => {
  const useDefaults: UseDefaults<MintData> = () => ({
    recipient: address,
    amount: 1,
  })

  return {
    key: ActionKey.Mint,
    Icon: HerbEmoji,
    label: t('title.mint'),
    description: t('info.mintActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    useHideFromPicker,
  }
}
