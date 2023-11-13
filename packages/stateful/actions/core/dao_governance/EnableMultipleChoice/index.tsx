import { useCallback } from 'react'
import { constSelector } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import { NumbersEmoji, useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  DepositRefundPolicy,
  DurationUnits,
  Feature,
  TokenType,
} from '@dao-dao/types'
import {
  ActionChainContextType,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { PercentageThreshold } from '@dao-dao/types/contracts/DaoProposalMultiple'
import {
  DaoProposalMultipleAdapterId,
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  DaoProposalMultipleAdapter,
  DaoProposalSingleAdapter,
} from '../../../../proposal-module-adapter'
import {
  anyoneCanProposeSelector,
  makeDepositInfoSelector,
} from '../../../../proposal-module-adapter/adapters/DaoProposalSingle/common'
import { configSelector } from '../../../../proposal-module-adapter/adapters/DaoProposalSingle/contracts/DaoProposalSingle.common.recoil'
import { makeDefaultNewDao } from '../../../../recoil'
import { EnableMultipleChoiceComponent as Component } from './Component'

type EnableMultipleChoiceData = {}

const useDefaults: UseDefaults<EnableMultipleChoiceData> = () => ({})

const useDecodedCosmosMsg: UseDecodedCosmosMsg<EnableMultipleChoiceData> = (
  msg: Record<string, any>
) =>
  objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {
          update_proposal_modules: {
            to_add: {},
          },
        },
      },
    },
  }) &&
  msg.wasm.execute.msg.update_proposal_modules.to_add.length === 1 &&
  objectMatchesStructure(
    msg.wasm.execute.msg.update_proposal_modules.to_add[0],
    {
      admin: {},
      code_id: {},
      label: {},
      msg: {},
    }
  ) &&
  msg.wasm.execute.msg.update_proposal_modules.to_add[0].label.endsWith(
    DaoProposalMultipleAdapterId
  )
    ? {
        match: true,
        data: {},
      }
    : {
        match: false,
      }

export const makeEnableMultipleChoiceAction: ActionMaker<
  EnableMultipleChoiceData
> = ({ t, address, context, chain: { chain_id: chainId }, chainContext }) => {
  // Disallows creation if multiple choice proposal module already exists, down
  // at the bottom of this function, instead of returning null here. This
  // ensures this action can be rendered correctly in past proposals after
  // multiple choice is enabled.
  if (
    context.type !== ActionContextType.Dao ||
    !context.info.supportedFeatures[Feature.MultipleChoiceProposals] ||
    chainContext.type !== ActionChainContextType.Supported
  ) {
    return null
  }

  const useTransformToCosmos: UseTransformToCosmos<
    EnableMultipleChoiceData
  > = () => {
    const singleChoiceProposal = context.info.proposalModules.find(
      ({ contractName }) =>
        DaoProposalSingleAdapter.contractNames.some((name) =>
          contractName.includes(name)
        )
    )
    if (!singleChoiceProposal) {
      throw new Error('No single choice proposal module found')
    }

    const config = useCachedLoadingWithError(
      configSelector({
        contractAddress: singleChoiceProposal.address,
        chainId,
      })
    )
    const depositInfo = useCachedLoadingWithError(
      makeDepositInfoSelector({
        chainId,
        proposalModuleAddress: singleChoiceProposal.address,
        version: singleChoiceProposal.version,
        preProposeAddress: singleChoiceProposal.prePropose?.address ?? null,
      })
    )
    const depositInfoToken = useCachedLoadingWithError(
      depositInfo.loading
        ? undefined
        : depositInfo.errored || !depositInfo.data
        ? constSelector(undefined)
        : genericTokenSelector({
            chainId,
            type:
              'cw20' in depositInfo.data.denom
                ? TokenType.Cw20
                : TokenType.Native,
            denomOrAddress:
              'cw20' in depositInfo.data.denom
                ? depositInfo.data.denom.cw20
                : depositInfo.data.denom.native,
          })
    )
    const anyoneCanPropose = useCachedLoadingWithError(
      anyoneCanProposeSelector({
        chainId,
        preProposeAddress: singleChoiceProposal.prePropose?.address ?? null,
      })
    )

    return useCallback(() => {
      if (
        config.loading ||
        config.errored ||
        depositInfo.loading ||
        depositInfo.errored ||
        depositInfoToken.loading ||
        depositInfoToken.errored ||
        anyoneCanPropose.loading ||
        anyoneCanPropose.errored
      ) {
        return
      }

      const quorum: PercentageThreshold =
        'threshold_quorum' in config.data.threshold
          ? config.data.threshold.threshold_quorum.quorum
          : {
              percent: '0.2',
            }

      const info = DaoProposalMultipleAdapter.daoCreation.getInstantiateInfo(
        chainContext.config,
        {
          ...makeDefaultNewDao(chainId),
          // Only the name is used in this function to pick the contract label.
          name: context.info.name,
        },
        {
          enableMultipleChoice: true,
          moduleInstantiateFundsUnsupported:
            !context.info.supportedFeatures[Feature.ModuleInstantiateFunds],
          quorum: {
            majority: 'majority' in quorum,
            value: 'majority' in quorum ? 50 : Number(quorum.percent) * 100,
          },
          votingDuration:
            'time' in config.data.max_voting_period
              ? {
                  value: config.data.max_voting_period.time,
                  units: DurationUnits.Seconds,
                }
              : {
                  value: 1,
                  units: DurationUnits.Weeks,
                },
          proposalDeposit: {
            enabled: !!depositInfo.data && !!depositInfoToken.data,
            amount:
              depositInfo.data && depositInfoToken.data
                ? convertMicroDenomToDenomWithDecimals(
                    depositInfo.data.amount,
                    depositInfoToken.data.decimals
                  )
                : 10,
            type:
              depositInfo.data && 'cw20' in depositInfo.data.denom
                ? 'cw20'
                : 'native',
            denomOrAddress: depositInfo.data
              ? 'cw20' in depositInfo.data.denom
                ? depositInfo.data.denom.cw20
                : depositInfo.data.denom.native
              : getNativeTokenForChainId(chainId).denomOrAddress,
            token: depositInfoToken.data,
            refundPolicy:
              depositInfo.data?.refund_policy ?? DepositRefundPolicy.OnlyPassed,
          },
          anyoneCanPropose: anyoneCanPropose.data,
          allowRevoting: config.data.allow_revoting,
        },
        t
      )

      return makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: address,
            funds: [],
            msg: {
              update_proposal_modules: {
                to_add: [info],
                to_disable: [],
              },
            },
          },
        },
      })
    }, [anyoneCanPropose, config, depositInfo, depositInfoToken])
  }

  return {
    key: ActionKey.EnableMultipleChoice,
    Icon: NumbersEmoji,
    label: t('title.enableMultipleChoiceProposals'),
    description: t('info.enableMultipleChoiceProposalsDescription'),
    notReusable: true,
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    // Do not allow using this action if the DAO already has a multiple choice
    // proposal module setup.
    hideFromPicker: context.info.proposalModules.some(({ contractName }) =>
      DaoProposalMultipleAdapter.contractNames.some((name) =>
        contractName.includes(name)
      )
    ),
  }
}
