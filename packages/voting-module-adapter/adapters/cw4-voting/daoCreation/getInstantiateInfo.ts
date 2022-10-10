import { Buffer } from 'buffer'

import { InstantiateMsg, Member } from '@dao-dao/state/clients/cw4-voting'
import { DaoCreationGetInstantiateInfo } from '@dao-dao/tstypes'
import { CW4GROUP_CODE_ID, CW4VOTING_CODE_ID } from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import { Cw4VotingAdapter } from '../../../index'
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
    cw4_group_code_id: CW4GROUP_CODE_ID,
    initial_members: initialMembers,
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(instantiateSchema, t)(msg)

  return {
    admin: { core_module: {} },
    code_id: CW4VOTING_CODE_ID,
    label: `DAO_${name}_${Cw4VotingAdapter.id}`,
    msg: Buffer.from(JSON.stringify(msg), 'utf8').toString('base64'),
  }
}
