import { Buffer } from 'buffer'

import { DaoCreationGetInstantiateInfo } from '@dao-dao/types'
import { InstantiateMsg } from '@dao-dao/types/contracts/DaoVotingNativeStaked'
import {
  CODE_ID_CONFIG,
  DaoVotingNativeStakedAdapterId,
  convertDurationWithUnitsToDuration,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import { DaoCreationConfig } from '../types'
import instantiateSchema from './instantiate_schema.json'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  DaoCreationConfig
> = ({ name: daoName }, { denom, unstakingDuration }, t) => {
  if (!denom) {
    throw new Error(t('error.missingGovernanceTokenDenom'))
  }

  const msg: InstantiateMsg = {
    denom,
    owner: { core_module: {} },
    unstaking_duration:
      unstakingDuration.value === 0
        ? null
        : convertDurationWithUnitsToDuration(unstakingDuration),
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(instantiateSchema, t)(msg)

  return {
    admin: { core_module: {} },
    code_id: CODE_ID_CONFIG.DaoVotingNativeStaked,
    label: `DAO_${daoName}_${DaoVotingNativeStakedAdapterId}`,
    msg: Buffer.from(JSON.stringify(msg), 'utf8').toString('base64'),
  }
}
