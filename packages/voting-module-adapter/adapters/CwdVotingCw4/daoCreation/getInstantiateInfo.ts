import { Buffer } from 'buffer'

import { DaoCreationGetInstantiateInfo } from '@dao-dao/tstypes'
import { InstantiateMsg, Member } from '@dao-dao/tstypes/contracts/CwdVotingCw4'
import { CODE_ID_CONFIG } from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import { CwdVotingCw4Adapter } from '../../../index'
import { DaoCreationConfig } from '../types'
import instantiateSchema from './instantiate_schema.json'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  DaoCreationConfig
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
    code_id: CODE_ID_CONFIG.CwdVotingCw4,
    label: `DAO_${name}_${CwdVotingCw4Adapter.id}`,
    msg: Buffer.from(JSON.stringify(msg), 'utf8').toString('base64'),
  }
}
