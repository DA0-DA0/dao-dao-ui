import { useCallback } from 'react'
import { constSelector } from 'recoil'

import {
  DaoProposalSingleCommonSelectors,
  genericTokenSelector,
} from '@dao-dao/state/recoil'
import { NumbersEmoji, useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  ContractVersion,
  DepositRefundPolicy,
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
  ContractName,
  DaoProposalMultipleAdapterId,
  convertCosmosVetoConfigToVeto,
  convertDurationToDurationWithUnits,
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
  depositInfoSelector,
} from '../../../../proposal-module-adapter/adapters/DaoProposalSingle/common'
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
  // Disallow usage if:
  // - not a DAO
  // - DAO doesn't support multiple choice proposals
  // - Neutron fork SubDAO
  // - chain is not supported (type-check, implied by DAO check)
  //
  // Disallows creation at the bottom of this function if:
  // - multiple choice proposal module already exists
  // - single-choice approval flow is enabled, since multiple choice doesn't
  //   support approval flow right now and that would be confusing.
  if (
    context.type !== ActionContextType.Dao ||
    !context.dao.info.supportedFeatures[Feature.MultipleChoiceProposals] ||
    // Neutron fork SubDAOs don't support multiple choice proposals due to the
    // timelock/overrule system only being designed for single choice proposals.
    context.dao.coreVersion === ContractVersion.V2AlphaNeutronFork ||
    chainContext.type !== ActionChainContextType.Supported
  ) {
    return null
  }

  const useTransformToCosmos: UseTransformToCosmos<
    EnableMultipleChoiceData
  > = () => {
    const singleChoiceProposal = context.dao.proposalModules.find(
      ({ contractName }) =>
        DaoProposalSingleAdapter.contractNames.some((name) =>
          contractName.includes(name)
        )
    )
    if (!singleChoiceProposal) {
      throw new Error('No single choice proposal module found')
    }

    const config = useCachedLoadingWithError(
      DaoProposalSingleCommonSelectors.configSelector({
        contractAddress: singleChoiceProposal.address,
        chainId,
      })
    )
    const depositInfo = useCachedLoadingWithError(
      depositInfoSelector({
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
          name: context.dao.name,
        },
        {
          ...makeDefaultNewDao(chainId).votingConfig,
          enableMultipleChoice: true,
          moduleInstantiateFundsUnsupported:
            !context.dao.info.supportedFeatures[Feature.ModuleInstantiateFunds],
          quorum: {
            majority: 'majority' in quorum,
            value: 'majority' in quorum ? 50 : Number(quorum.percent) * 100,
          },
          votingDuration: convertDurationToDurationWithUnits(
            config.data.max_voting_period
          ),
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
          approver: {
            enabled: false,
            address: '',
          },
          veto: convertCosmosVetoConfigToVeto(
            'veto' in config.data ? config.data.veto : null
          ),
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

  // Disallow creation if:
  // - multiple choice proposal module already exists
  // - single-choice approval flow is enabled, since multiple choice doesn't
  //   support approval flow right now and that would be confusing.
  const hideFromPicker = context.dao.proposalModules.some(
    ({ contractName, prePropose }) =>
      DaoProposalMultipleAdapter.contractNames.some((name) =>
        contractName.includes(name)
      ) || prePropose?.contractName === ContractName.PreProposeApprovalSingle
  )

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
    hideFromPicker,
  }
}
