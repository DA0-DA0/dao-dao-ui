import { Buffer } from 'buffer'

import { DaoCreationGetInstantiateInfo } from '@dao-dao/types'
import { InstantiateMsg } from '@dao-dao/types/contracts/CwdVotingCw721Staked'
import {
  CODE_ID_CONFIG,
  convertDurationWithUnitsToDuration,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import { CwdVotingCw721StakedAdapter } from '../../../index'
import { DaoCreationConfig } from '../types'
import instantiateSchema from './instantiate_schema.json'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  DaoCreationConfig
> = (
  { name: daoName },
  {
    //newInfo: { initialSupply, imageUrl, symbol, name },
    existingGovernanceTokenAddress,
    unstakingDuration,
  },
  t
) => {
  if (!existingGovernanceTokenAddress) {
    throw new Error(t('error.missingGovernanceTokenAddress'))
  }

  const msg: InstantiateMsg = {
    nft_address: existingGovernanceTokenAddress,
    unstaking_duration: convertDurationWithUnitsToDuration(unstakingDuration),
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(instantiateSchema, t)(msg)

  return {
    admin: { core_module: {} },
    code_id: CODE_ID_CONFIG.CwdVotingCw721Staked,
    label: `DAO_${daoName}_${CwdVotingCw721StakedAdapter.id}`,
    msg: Buffer.from(JSON.stringify(msg), 'utf8').toString('base64'),
  }
}
