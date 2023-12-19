import { useCallback } from 'react'

import { DaoVotingTokenStakedSelectors } from '@dao-dao/state/recoil'
import { PrinterEmoji, useCachedLoadable } from '@dao-dao/stateless'
import {
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

import { AddressInput } from '../../../../../components/AddressInput'
import { useVotingModuleAdapterOptions } from '../../../../react/context'
import { useGovernanceTokenInfo } from '../../hooks'
import {
  UpdateMinterAllowanceComponent,
  UpdateMinterAllowanceData,
} from './UpdateMinterAllowanceComponent'

const useTransformToCosmos: UseTransformToCosmos<
  UpdateMinterAllowanceData
> = () => {
  const {
    tokenFactoryIssuerAddress,
    governanceTokenInfo: { decimals },
  } = useGovernanceTokenInfo()

  return useCallback(
    ({ minter, allowance }: UpdateMinterAllowanceData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: tokenFactoryIssuerAddress,
            funds: [],
            msg: {
              set_minter_allowance: {
                address: minter,
                allowance: convertDenomToMicroDenomStringWithDecimals(
                  allowance,
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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateMinterAllowanceData> = (
  msg: Record<string, any>
) => {
  const {
    tokenFactoryIssuerAddress,
    governanceTokenInfo: { decimals },
  } = useGovernanceTokenInfo()

  return objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        msg: {
          set_minter_allowance: {
            address: {},
            allowance: {},
          },
        },
      },
    },
  }) && msg.wasm.execute.contract_addr === tokenFactoryIssuerAddress
    ? {
        match: true,
        data: {
          minter: msg.wasm.execute.msg.set_minter_allowance.address,
          allowance: convertMicroDenomToDenomWithDecimals(
            msg.wasm.execute.msg.set_minter_allowance.allowance,
            decimals
          ),
        },
      }
    : {
        match: false,
      }
}

const Component: ActionComponent = (props) => {
  const { token } = useGovernanceTokenInfo()

  return (
    <UpdateMinterAllowanceComponent
      {...props}
      options={{
        govToken: token,
        AddressInput,
      }}
    />
  )
}

// Only show in picker if using cw-tokenfactory-issuer contract.
const useHideFromPicker: UseHideFromPicker = () => {
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()

  const tfIssuer = useCachedLoadable(
    DaoVotingTokenStakedSelectors.validatedTokenfactoryIssuerContractSelector({
      contractAddress: votingModuleAddress,
      chainId,
    })
  )

  return tfIssuer.state !== 'hasValue' || !tfIssuer.contents
}

export const makeUpdateMinterAllowanceAction: ActionMaker<
  UpdateMinterAllowanceData
> = ({ t, address }) => {
  const useDefaults: UseDefaults<UpdateMinterAllowanceData> = () => ({
    minter: address,
    allowance: 1,
  })

  return {
    key: ActionKey.UpdateMinterAllowance,
    Icon: PrinterEmoji,
    label: t('title.updateMinterAllowance'),
    description: t('info.updateMinterAllowanceDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    useHideFromPicker,
    // Programmatically add when minting, but don't reveal by itself. This is
    // dangerous and probably won't be used.
    programmaticOnly: true,
  }
}
