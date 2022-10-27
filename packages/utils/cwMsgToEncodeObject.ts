import {
  MsgClearAdminEncodeObject,
  MsgExecuteContractEncodeObject,
  MsgInstantiateContractEncodeObject,
  MsgMigrateContractEncodeObject,
  MsgUpdateAdminEncodeObject,
} from '@cosmjs/cosmwasm-stargate'
import { fromBase64 } from '@cosmjs/encoding'
import { EncodeObject } from '@cosmjs/proto-signing'
import {
  MsgDelegateEncodeObject,
  MsgSendEncodeObject,
  MsgUndelegateEncodeObject,
  MsgVoteEncodeObject,
  MsgWithdrawDelegatorRewardEncodeObject,
} from '@cosmjs/stargate'
import { VoteOption as CosmosGovVoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import Long from 'long'

import { CosmosMsgFor_Empty } from '@dao-dao/types'

export const cwMsgToEncodeObject = (
  msg: CosmosMsgFor_Empty,
  sender: string
): EncodeObject => {
  if ('bank' in msg) {
    const bankMsg = msg.bank

    if ('send' in bankMsg) {
      const encodeObject: MsgSendEncodeObject = {
        typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        value: {
          fromAddress: sender,
          toAddress: bankMsg.send.to_address,
          amount: bankMsg.send.amount,
        },
      }

      return encodeObject
    }

    // burn does not exist?

    throw new Error('Unsupported bank module message.')
  }

  if ('staking' in msg) {
    const stakingMsg = msg.staking

    if ('delegate' in stakingMsg) {
      const encodeObject: MsgDelegateEncodeObject = {
        typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
        value: {
          delegatorAddress: sender,
          validatorAddress: stakingMsg.delegate.validator,
          amount: stakingMsg.delegate.amount,
        },
      }
      return encodeObject
    }

    if ('undelegate' in stakingMsg) {
      const encodeObject: MsgUndelegateEncodeObject = {
        typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
        value: {
          delegatorAddress: sender,
          validatorAddress: stakingMsg.undelegate.validator,
          amount: stakingMsg.undelegate.amount,
        },
      }
      return encodeObject
    }

    // redelegate does not exist?

    throw new Error('Unsupported staking module message.')
  }

  if ('distribution' in msg) {
    const distributionMsg = msg.distribution

    // set_withdraw_address does not exist?

    if ('withdraw_delegator_reward' in distributionMsg) {
      const encodeObject: MsgWithdrawDelegatorRewardEncodeObject = {
        typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
        value: {
          delegatorAddress: sender,
          validatorAddress: distributionMsg.withdraw_delegator_reward.validator,
        },
      }
      return encodeObject
    }

    throw new Error('Unsupported distribution module message.')
  }

  if ('stargate' in msg) {
    const stargateMsg = msg.stargate

    const encodeObject: EncodeObject = {
      typeUrl: stargateMsg.type_url,
      value: stargateMsg.value,
    }
    return encodeObject
  }

  if ('wasm' in msg) {
    const wasmMsg = msg.wasm

    // MsgStoreCodeEncodeObject missing from CosmosMsgFor_Empty.

    if ('execute' in wasmMsg) {
      const encodeObject: MsgExecuteContractEncodeObject = {
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: {
          sender: sender,
          contract: wasmMsg.execute.contract_addr,
          funds: wasmMsg.execute.funds,
          msg: fromBase64(wasmMsg.execute.msg),
        },
      }
      return encodeObject
    }

    if ('instantiate' in wasmMsg) {
      const encodeObject: MsgInstantiateContractEncodeObject = {
        typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
        value: {
          sender: sender,
          admin: wasmMsg.instantiate.admin ?? undefined,
          codeId: Long.fromInt(wasmMsg.instantiate.code_id),
          label: wasmMsg.instantiate.label,
          msg: fromBase64(wasmMsg.instantiate.msg),
          funds: wasmMsg.instantiate.funds,
        },
      }
      return encodeObject
    }

    if ('migrate' in wasmMsg) {
      const encodeObject: MsgMigrateContractEncodeObject = {
        typeUrl: '/cosmwasm.wasm.v1.MsgMigrateContract',
        value: {
          sender: sender,
          contract: wasmMsg.migrate.contract_addr,
          codeId: Long.fromInt(wasmMsg.migrate.new_code_id),
          msg: fromBase64(wasmMsg.migrate.msg),
        },
      }
      return encodeObject
    }

    if ('update_admin' in wasmMsg) {
      const encodeObject: MsgUpdateAdminEncodeObject = {
        typeUrl: '/cosmwasm.wasm.v1.MsgUpdateAdmin',
        value: {
          sender: sender,
          newAdmin: wasmMsg.update_admin.admin,
          contract: wasmMsg.update_admin.contract_addr,
        },
      }
      return encodeObject
    }

    if ('clear_admin' in wasmMsg) {
      const encodeObject: MsgClearAdminEncodeObject = {
        typeUrl: '/cosmwasm.wasm.v1.MsgClearAdmin',
        value: {
          sender: sender,
          contract: wasmMsg.clear_admin.contract_addr,
        },
      }
      return encodeObject
    }

    throw new Error('Unsupported wasm module message.')
  }

  if ('gov' in msg) {
    const govMsg = msg.gov

    // MsgDepositEncodeObject and MsgSubmitProposalEncodeObject missing from
    // CosmosMsgFor_Empty.

    if ('vote' in govMsg) {
      const vote = govMsg.vote.vote
      const voteOption: CosmosGovVoteOption =
        vote === 'yes'
          ? CosmosGovVoteOption.VOTE_OPTION_YES
          : vote === 'abstain'
          ? CosmosGovVoteOption.VOTE_OPTION_ABSTAIN
          : vote === 'no'
          ? CosmosGovVoteOption.VOTE_OPTION_NO
          : vote === 'no_with_veto'
          ? CosmosGovVoteOption.VOTE_OPTION_NO_WITH_VETO
          : CosmosGovVoteOption.UNRECOGNIZED

      const encodeObject: MsgVoteEncodeObject = {
        typeUrl: '/cosmos.gov.v1beta1.MsgVote',
        value: {
          proposalId: Long.fromInt(govMsg.vote.proposal_id),
          voter: sender,
          option: voteOption,
        },
      }
      return encodeObject
    }

    throw new Error('Unsupported gov module message.')
  }

  throw new Error('Unsupported cosmos message.')
}
