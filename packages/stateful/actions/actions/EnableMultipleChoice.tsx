import { useCallback } from 'react'
import { constSelector, useRecoilValue } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import { NumbersEmoji } from '@dao-dao/stateless'
import {
  ContractVersion,
  DepositRefundPolicy,
  DurationUnits,
  TokenType,
} from '@dao-dao/types'
import {
  ActionContextType,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { PercentageThreshold } from '@dao-dao/types/contracts/DaoProposalMultiple'
import {
  DaoProposalMultipleAdapterId,
  NATIVE_TOKEN,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  DaoProposalMultipleAdapter,
  DaoProposalSingleAdapter,
} from '../../proposal-module-adapter'
import {
  anyoneCanProposeSelector,
  makeDepositInfoSelector,
} from '../../proposal-module-adapter/adapters/DaoProposalSingle/common'
import { configSelector } from '../../proposal-module-adapter/adapters/DaoProposalSingle/contracts/DaoProposalSingle.common.recoil'
import { makeDefaultNewDao } from '../../recoil'
import { EnableMultipleChoiceComponent as Component } from '../components/EnableMultipleChoice'

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
> = ({ t, address, chainId, context }) => {
  // Only show for v2 DAOs that do not already have a multiple choice proposal
  // module setup.
  if (
    context.type !== ActionContextType.Dao ||
    context.info.coreVersion === ContractVersion.V1 ||
    context.info.proposalModules.some(({ contractName }) =>
      DaoProposalMultipleAdapter.contractNames.some((name) =>
        contractName.includes(name)
      )
    )
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

    const config = useRecoilValue(
      configSelector({
        contractAddress: singleChoiceProposal.address,
        chainId,
      })
    )

    const depositInfo = useRecoilValue(
      makeDepositInfoSelector({
        chainId,
        proposalModuleAddress: singleChoiceProposal.address,
        version: singleChoiceProposal.version,
        preProposeAddress: singleChoiceProposal.preProposeAddress,
      })
    )
    const depositInfoToken = useRecoilValue(
      depositInfo
        ? genericTokenSelector({
            chainId,
            type:
              'cw20' in depositInfo.denom ? TokenType.Cw20 : TokenType.Native,
            denomOrAddress:
              'cw20' in depositInfo.denom
                ? depositInfo.denom.cw20
                : depositInfo.denom.native,
          })
        : constSelector(undefined)
    )

    const anyoneCanPropose = useRecoilValue(
      anyoneCanProposeSelector({
        chainId,
        preProposeAddress: singleChoiceProposal.preProposeAddress,
      })
    )

    const quorum: PercentageThreshold =
      'threshold_quorum' in config.threshold
        ? config.threshold.threshold_quorum.quorum
        : {
            percent: '0.2',
          }

    const info = DaoProposalMultipleAdapter.daoCreation.getInstantiateInfo(
      {
        ...makeDefaultNewDao(),
        // Only the name is used in this function to pick the contract label.
        name: context.info.name,
      },
      {
        quorum: {
          majority: 'majority' in quorum,
          value: 'majority' in quorum ? 50 : Number(quorum.percent) * 100,
        },
        votingDuration:
          'time' in config.max_voting_period
            ? {
                value: config.max_voting_period.time,
                units: DurationUnits.Seconds,
              }
            : {
                value: 1,
                units: DurationUnits.Weeks,
              },
        proposalDeposit: {
          enabled: !!depositInfo && !!depositInfoToken,
          amount:
            depositInfo && depositInfoToken
              ? convertMicroDenomToDenomWithDecimals(
                  depositInfo.amount,
                  depositInfoToken.decimals
                )
              : 10,
          type: depositInfo && 'cw20' in depositInfo.denom ? 'cw20' : 'native',
          denomOrAddress: depositInfo
            ? 'cw20' in depositInfo.denom
              ? depositInfo.denom.cw20
              : depositInfo.denom.native
            : NATIVE_TOKEN.denomOrAddress,
          token: depositInfoToken,
          refundPolicy:
            depositInfo?.refund_policy ?? DepositRefundPolicy.OnlyPassed,
        },
        anyoneCanPropose,
        allowRevoting: config.allow_revoting,
      },
      t
    )

    return useCallback(
      () =>
        makeWasmMessage({
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
        }),
      [info]
    )
  }

  return {
    key: CoreActionKey.EnableMultipleChoice,
    Icon: NumbersEmoji,
    label: t('title.enableMultipleChoiceProposals'),
    description: t('info.enableMultipleChoiceProposalsDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
