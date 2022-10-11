import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

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
import { ExecuteMsg } from '@dao-dao/tstypes/contracts/CwPreProposeSingle'
import { UpdateProposalConfigIcon } from '@dao-dao/ui'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
  nativeTokenDecimals,
} from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { configSelector } from '../../../contracts/CwPreProposeSingle.recoil'
import { UpdatePreProposeConfigComponent } from './UpdatePreProposeConfigComponent'

// TODO: Convert this into a more generalizable 'context' abstraction.
type AsProposalModuleMaker<T> = (proposalModule: ProposalModule) => T

export interface UpdatePreProposeConfigData {
  depositRequired: boolean
  depositInfo?: {
    deposit: number
    refundFailedProposals: boolean
  }
}

const makeUseDefaults: AsProposalModuleMaker<
  UseDefaults<UpdatePreProposeConfigData>
> =
  ({ preProposeAddress }) =>
  () => {
    const { t } = useTranslation()
    if (!preProposeAddress) {
      throw new Error(t('error.loadingData'))
    }

    const depositInfoConfig = useRecoilValue(
      configSelector({
        contractAddress: preProposeAddress,
        params: [],
      })
    ).deposit_info

    const cw20DepositTokenInfo = useRecoilValue(
      depositInfoConfig?.denom && 'cw20' in depositInfoConfig.denom
        ? Cw20BaseSelectors.tokenInfoSelector({
            contractAddress: depositInfoConfig.denom.cw20,
            params: [],
          })
        : constSelector(undefined)
    )
    const depositDecimals = depositInfoConfig?.denom
      ? 'cw20' in depositInfoConfig.denom && cw20DepositTokenInfo
        ? cw20DepositTokenInfo.decimals
        : 'native' in depositInfoConfig.denom
        ? nativeTokenDecimals(depositInfoConfig.denom.native) ?? 0
        : 0
      : 0

    const depositRequired = !!depositInfoConfig
    const depositInfo = !!depositInfoConfig
      ? {
          deposit: convertMicroDenomToDenomWithDecimals(
            Number(depositInfoConfig.amount),
            // A deposit being configured implies that a token will be present.
            // Type-checked above.
            depositDecimals
          ),
          refundFailedProposals:
            depositInfoConfig.refund_policy === DepositRefundPolicy.Always,
        }
      : {
          deposit: 0,
          refundFailedProposals: false,
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

    const { open_proposal_submission, deposit_info: depositInfoConfig } =
      useRecoilValue(
        configSelector({
          contractAddress: preProposeAddress,
          params: [],
        })
      )

    const cw20DepositTokenInfo = useRecoilValue(
      depositInfoConfig?.denom && 'cw20' in depositInfoConfig.denom
        ? Cw20BaseSelectors.tokenInfoSelector({
            contractAddress: depositInfoConfig.denom.cw20,
            params: [],
          })
        : constSelector(undefined)
    )
    const depositDecimals = depositInfoConfig?.denom
      ? 'cw20' in depositInfoConfig.denom && cw20DepositTokenInfo
        ? cw20DepositTokenInfo.decimals
        : 'native' in depositInfoConfig.denom
        ? nativeTokenDecimals(depositInfoConfig.denom.native) ?? 0
        : 0
      : 0

    return useCallback(
      (data: UpdatePreProposeConfigData) => {
        const updateConfigMessage: ExecuteMsg = {
          update_config: {
            ...(data.depositInfo && data.depositRequired
              ? {
                  deposit_info: {
                    amount: convertDenomToMicroDenomWithDecimals(
                      data.depositInfo.deposit,
                      depositDecimals
                    ).toString(),
                    denom: depositInfoConfig?.denom
                      ? 'voting_module_token' in depositInfoConfig.denom
                        ? { voting_module_token: {} }
                        : { token: { denom: depositInfoConfig.denom } }
                      : {
                          voting_module_token: {},
                        },
                    refund_policy: data.depositInfo.refundFailedProposals
                      ? DepositRefundPolicy.Always
                      : DepositRefundPolicy.OnlyPassed,
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
      [depositInfoConfig, depositDecimals, open_proposal_submission]
    )
  }

const Component: ActionComponent = (props) => {
  const {
    hooks: { useGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const governanceTokenSymbol =
    useGovernanceTokenInfo?.().governanceTokenInfo.symbol

  return (
    <UpdatePreProposeConfigComponent
      {...props}
      options={{ governanceTokenSymbol }}
    />
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdatePreProposeConfigData> = (
  msg: Record<string, any>
) => {
  const {
    hooks: { useGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const voteConversionDecimals =
    useGovernanceTokenInfo?.().governanceTokenInfo.decimals ?? 0

  return useMemo(() => {
    if (
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'update_config' in msg.wasm.execute.msg &&
      'open_proposal_submission' in msg.wasm.execute.msg.update_config
    ) {
      const config = msg.wasm.execute.msg.update_config
      const depositRequired = !!config.deposit_info
      const depositInfo = !!config.deposit_info
        ? {
            deposit: convertMicroDenomToDenomWithDecimals(
              Number(config.deposit_info.deposit),
              voteConversionDecimals
            ),
            refundFailedProposals: config.deposit_info.refund_failed_proposals,
          }
        : undefined

      return {
        data: {
          depositRequired,
          depositInfo,
        },
        match: true,
      }
    }
    return { match: false }
  }, [msg, voteConversionDecimals])
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
  useDecodedCosmosMsg,
})
