import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue, useRecoilValueLoadable } from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import {
  Action,
  ActionComponent,
  ActionKey,
  DepositRefundPolicy,
  ProposalModule,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes'
import {
  ExecuteMsg,
  UncheckedDenom,
  UncheckedDepositInfo,
} from '@dao-dao/tstypes/contracts/CwPreProposeSingle'
import { UpdateProposalConfigIcon } from '@dao-dao/ui'
import {
  CHAIN_BECH32_PREFIX,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  isValidContractAddress,
  makeWasmMessage,
} from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { configSelector } from '../../../contracts/CwPreProposeSingle.recoil'
import {
  UpdatePreProposeConfigComponent,
  UpdatePreProposeConfigData,
} from './UpdatePreProposeConfigComponent'

// TODO: Convert this into a more generalizable 'context' abstraction.
type AsProposalModuleMaker<T> = (proposalModule: ProposalModule) => T

const makeUseDefaults: AsProposalModuleMaker<
  UseDefaults<UpdatePreProposeConfigData>
> =
  ({ preProposeAddress }) =>
  () => {
    const {
      hooks: { useGovernanceTokenInfo },
    } = useVotingModuleAdapter()
    const { governanceTokenAddress = '', governanceTokenInfo } =
      useGovernanceTokenInfo?.() ?? {}

    const { t } = useTranslation()
    if (!preProposeAddress) {
      throw new Error(t('error.loadingData'))
    }

    const configDepositInfo = useRecoilValue(
      configSelector({
        contractAddress: preProposeAddress,
        params: [],
      })
    ).deposit_info

    const cw20TokenInfo = useRecoilValue(
      configDepositInfo?.denom && 'cw20' in configDepositInfo.denom
        ? Cw20BaseSelectors.tokenInfoSelector({
            contractAddress: configDepositInfo.denom.cw20,
            params: [],
          })
        : constSelector(undefined)
    )
    const cw20Decimals = cw20TokenInfo?.decimals ?? 0

    const depositRequired = !!configDepositInfo
    const depositInfo: UpdatePreProposeConfigData['depositInfo'] =
      configDepositInfo
        ? {
            amount: convertMicroDenomToDenomWithDecimals(
              configDepositInfo.amount,
              'cw20' in configDepositInfo.denom ? cw20Decimals : NATIVE_DECIMALS
            ),
            type: 'native' in configDepositInfo.denom ? 'native' : 'cw20',
            cw20Address:
              'cw20' in configDepositInfo.denom
                ? configDepositInfo.denom.cw20
                : governanceTokenAddress,
            cw20Decimals,
            refundPolicy: configDepositInfo.refund_policy,
          }
        : {
            amount: 1,
            type: 'native',
            cw20Address:
              governanceTokenAddress &&
              // If native governance token, don't fill in here.
              isValidContractAddress(
                governanceTokenAddress,
                CHAIN_BECH32_PREFIX
              )
                ? governanceTokenAddress
                : '',
            cw20Decimals: governanceTokenInfo?.decimals ?? 0,
            refundPolicy: DepositRefundPolicy.OnlyPassed,
          }

    return {
      depositRequired,
      depositInfo,
    }
  }

const makeUseTransformToCosmos: AsProposalModuleMaker<
  UseTransformToCosmos<UpdatePreProposeConfigData>
> =
  ({ preProposeAddress }) =>
  () => {
    const { t } = useTranslation()
    if (!preProposeAddress) {
      throw new Error(t('error.loadingData'))
    }

    const { open_proposal_submission } = useRecoilValue(
      configSelector({
        contractAddress: preProposeAddress,
        params: [],
      })
    )

    return useCallback(
      (data: UpdatePreProposeConfigData) => {
        const updateConfigMessage: ExecuteMsg = {
          update_config: {
            ...(data.depositInfo && data.depositRequired
              ? {
                  deposit_info: {
                    amount: convertDenomToMicroDenomWithDecimals(
                      data.depositInfo.amount,
                      data.depositInfo.type === 'cw20'
                        ? data.depositInfo.cw20Decimals
                        : NATIVE_DECIMALS
                    ).toString(),
                    denom: {
                      token: {
                        denom: {
                          [data.depositInfo.type]:
                            data.depositInfo.type === 'cw20'
                              ? data.depositInfo.cw20Address
                              : NATIVE_DENOM,
                        } as UncheckedDenom,
                      },
                    },
                    refund_policy: data.depositInfo.refundPolicy,
                  },
                }
              : {
                  deposit_info: null,
                }),
            // Pass through since we don't support changing this yet.
            open_proposal_submission,
          },
        }

        return makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: preProposeAddress,
              funds: [],
              msg: updateConfigMessage,
            },
          },
        })
      },
      [open_proposal_submission]
    )
  }

const makeUseDecodedCosmosMsg: AsProposalModuleMaker<
  UseDecodedCosmosMsg<UpdatePreProposeConfigData>
> =
  ({ preProposeAddress }) =>
  (msg: Record<string, any>) => {
    const {
      hooks: { useGovernanceTokenInfo },
    } = useVotingModuleAdapter()
    const { governanceTokenAddress, governanceTokenInfo } =
      useGovernanceTokenInfo?.() ?? {}

    const configDepositInfo = msg.wasm?.execute?.msg?.update_config
      ?.deposit_info as UncheckedDepositInfo | null | undefined

    // Get CW20 token address either explicitly specified or by retrieving
    // address from voting module when using voting module token.
    let cw20Address: string | undefined
    if (
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'contract_addr' in msg.wasm.execute &&
      msg.wasm.execute.contract_addr === preProposeAddress &&
      'update_config' in msg.wasm.execute.msg &&
      configDepositInfo
    ) {
      cw20Address =
        'token' in configDepositInfo.denom &&
        'cw20' in configDepositInfo.denom.token.denom
          ? configDepositInfo.denom.token.denom.cw20
          : 'voting_module_token' in configDepositInfo.denom
          ? governanceTokenAddress
          : undefined
    }

    const cw20DepositTokenInfo = useRecoilValue(
      cw20Address
        ? Cw20BaseSelectors.tokenInfoSelector({
            contractAddress: cw20Address,
            params: [],
          })
        : constSelector(undefined)
    )

    if (
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'contract_addr' in msg.wasm.execute &&
      msg.wasm.execute.contract_addr === preProposeAddress &&
      'update_config' in msg.wasm.execute.msg
    ) {
      if (!configDepositInfo) {
        return {
          data: {
            depositRequired: false,
            depositInfo: {
              amount: 1,
              type: 'native',
              cw20Address:
                governanceTokenAddress &&
                // If native governance token, don't fill in here.
                isValidContractAddress(
                  governanceTokenAddress,
                  CHAIN_BECH32_PREFIX
                )
                  ? governanceTokenAddress
                  : '',
              cw20Decimals: governanceTokenInfo?.decimals ?? 0,
              refundPolicy: DepositRefundPolicy.OnlyPassed,
            },
          },
          match: true,
        }
      }

      const type = cw20Address !== undefined ? 'cw20' : 'native'
      const cw20Decimals = cw20DepositTokenInfo?.decimals ?? 0

      const depositInfo: UpdatePreProposeConfigData['depositInfo'] = {
        amount: convertMicroDenomToDenomWithDecimals(
          configDepositInfo.amount,
          type === 'cw20' ? cw20Decimals : NATIVE_DECIMALS
        ),
        type,
        cw20Address: cw20Address ?? '',
        cw20Decimals,
        refundPolicy: configDepositInfo.refund_policy,
      }

      return {
        data: {
          depositRequired: true,
          depositInfo,
        },
        match: true,
      }
    }
    return { match: false }
  }

export const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const { fieldNamePrefix, Loader } = props

  const { setValue, watch } = useFormContext()

  const depositInfo: UpdatePreProposeConfigData['depositInfo'] = watch(
    fieldNamePrefix + 'depositInfo'
  )

  const tokenInfoLoadable = useRecoilValueLoadable(
    depositInfo.type === 'cw20' &&
      depositInfo.cw20Address &&
      isValidContractAddress(depositInfo.cw20Address, CHAIN_BECH32_PREFIX)
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: depositInfo.cw20Address,
          params: [],
        })
      : constSelector(undefined)
  )

  // Update cw20 decimals and address error.
  const [additionalAddressError, setAdditionalAddressError] = useState<string>()
  useEffect(() => {
    // Update decimals in data for transforming to cosmos message.
    if (tokenInfoLoadable.state === 'hasValue') {
      setValue(
        fieldNamePrefix + 'depositInfo.cw20Decimals',
        tokenInfoLoadable.contents
      )
    }

    if (tokenInfoLoadable.state !== 'hasError') {
      if (additionalAddressError) {
        setAdditionalAddressError(undefined)
      }
      return
    }

    if (!additionalAddressError) {
      setAdditionalAddressError(t('error.notCw20Address'))
    }
  }, [fieldNamePrefix, setValue, tokenInfoLoadable, t, additionalAddressError])

  return (
    <UpdatePreProposeConfigComponent
      {...props}
      options={{
        cw20: {
          additionalAddressError,
          formattedJsonDisplayProps: {
            jsonLoadable: tokenInfoLoadable,
            Loader,
          },
        },
      }}
    />
  )
}

export const makeUpdatePreProposeConfigAction = (
  proposalModule: ProposalModule
): Action<UpdatePreProposeConfigData> => ({
  key: ActionKey.UpdatePreProposeConfig,
  Icon: UpdateProposalConfigIcon,
  label: 'Update Proposal Submission Config',
  description: 'Update the proposal submission paramaters for your DAO.',
  Component,
  useDefaults: makeUseDefaults(proposalModule),
  useTransformToCosmos: makeUseTransformToCosmos(proposalModule),
  useDecodedCosmosMsg: makeUseDecodedCosmosMsg(proposalModule),
})
