import { Buffer } from 'buffer'

import { ChainId, DaoCreatorMutate } from '@dao-dao/types'
import { InstantiateMsg, Member } from '@dao-dao/types/contracts/DaoVotingCw4'
import { MembershipBasedCreatorId } from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchema from './instantiate_schema.json'
import { CreatorData } from './types'

export const mutate: DaoCreatorMutate<CreatorData> = (
  msg,
  { chainId, name },
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

  const votingModuleAdapterInstantiateMsg: InstantiateMsg = {
    group_contract: {
      new: {
        cw4_group_code_id: codeIds.Cw4Group,
        initial_members: initialMembers,
      },
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
    label: `DAO_${name}_${MembershipBasedCreatorId}`,
    msg: Buffer.from(
      JSON.stringify(votingModuleAdapterInstantiateMsg),
      'utf8'
    ).toString('base64'),
    // TODO(neutron-2.3.0): add back in.
    ...(chainId !== ChainId.NeutronMainnet && {
      funds: [],
    }),
  }

  return msg
}
