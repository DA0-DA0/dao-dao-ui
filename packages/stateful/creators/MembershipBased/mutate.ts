import { ChainId, DaoCreatorMutate } from '@dao-dao/types'
import { InstantiateMsg, Member } from '@dao-dao/types/contracts/DaoVotingCw4'
import { MembershipBasedCreatorId, encodeMessageAsBase64 } from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchema from './instantiate_schema.json'
import instantiateSchema21 from './instantiate_schema_2.1.json'
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

  const newData = {
    cw4_group_code_id: codeIds.Cw4Group,
    initial_members: initialMembers,
  }

  const votingModuleAdapterInstantiateMsg: InstantiateMsg =
    // TODO(neutron-2.3.0): remove this once upgraded.
    chainId === ChainId.NeutronMainnet
      ? (newData as any)
      : {
          group_contract: {
            new: newData,
          },
        }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(
    // TODO(neutron-2.3.0): remove this once upgraded.
    chainId === ChainId.NeutronMainnet
      ? instantiateSchema21
      : instantiateSchema,
    t
  )(votingModuleAdapterInstantiateMsg)

  msg.voting_module_instantiate_info = {
    admin: { core_module: {} },
    code_id: codeIds.DaoVotingCw4,
    label: `DAO_${name.trim()}_${MembershipBasedCreatorId}`,
    msg: encodeMessageAsBase64(votingModuleAdapterInstantiateMsg),
    // TODO(neutron-2.3.0): add back in here and in dao-core instantiate schema.
    ...(chainId !== ChainId.NeutronMainnet && {
      funds: [],
    }),
  }

  return msg
}
