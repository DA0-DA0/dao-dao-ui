import { Buffer } from 'buffer'

import { DaoCreationGetInstantiateInfo } from '@dao-dao/types'
import { InstantiateMsg, Member } from '@dao-dao/types/contracts/DaoVotingCw4'
import {
  CODE_ID_CONFIG,
  DaoVotingMembershipBasedCreatorId,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchema from './instantiate_schema.json'
import { VotingModuleCreatorConfig } from './types'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  VotingModuleCreatorConfig
> = ({ name }, { tiers }, t) => {
  const initialMembers: Member[] = tiers.flatMap(({ weight, members }) =>
    members.map(({ address }) => ({
      addr: address,
      weight,
    }))
  )

  const msg: InstantiateMsg = {
    cw4_group_code_id: CODE_ID_CONFIG.Cw4Group,
    initial_members: initialMembers,
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(instantiateSchema, t)(msg)

  return {
    admin: { core_module: {} },
    code_id: CODE_ID_CONFIG.DaoVotingCw4,
    label: `DAO_${name}_${DaoVotingMembershipBasedCreatorId}`,
    msg: Buffer.from(JSON.stringify(msg), 'utf8').toString('base64'),
  }
}
