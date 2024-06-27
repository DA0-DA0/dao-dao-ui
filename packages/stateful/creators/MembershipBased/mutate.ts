import { DaoCreatorMutate } from '@dao-dao/types'
import { InstantiateMsg, Member } from '@dao-dao/types/contracts/DaoVotingCw4'
import { MembershipBasedCreatorId, encodeJsonToBase64 } from '@dao-dao/utils'

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

  msg.voting_module_instantiate_info = {
    admin: { core_module: {} },
    code_id: codeIds.DaoVotingCw4,
    label: `DAO_${name.trim()}_${MembershipBasedCreatorId}`,
    msg: encodeJsonToBase64(votingModuleAdapterInstantiateMsg),
    funds: [],
  }

  return msg
}
