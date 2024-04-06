import { DaoCreatorMutate } from '@dao-dao/types'
import { InstantiateMsg, Member } from '@dao-dao/types/contracts/DaoVotingCw4'
import { MembershipBasedCreatorId, encodeJsonToBase64 } from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchema from './instantiate_schema.json'
import { CreatorData } from './types'

export const mutate: DaoCreatorMutate<CreatorData> = (
  msg,
  { name },
  { tiers },
  t,
  codeIds
) => {
  const initialMembers: Member[] = tiers.flatMap(({ weight, members }) =>
    members.map(({ address }) => ({
      addr: address,
      weight,
    }))
  )

  const newData = {
    cw4_group_code_id: codeIds.Cw4Group,
    initial_members: initialMembers,
  }

  const votingModuleAdapterInstantiateMsg: InstantiateMsg = {
    group_contract: {
      new: newData,
    },
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(
    instantiateSchema,
    t
  )(votingModuleAdapterInstantiateMsg)

  msg.voting_module_instantiate_info = {
    admin: { core_module: {} },
    code_id: codeIds.DaoVotingCw4,
    label: `DAO_${name.trim()}_${MembershipBasedCreatorId}`,
    msg: encodeJsonToBase64(votingModuleAdapterInstantiateMsg),
    funds: [],
  }

  return msg
}
