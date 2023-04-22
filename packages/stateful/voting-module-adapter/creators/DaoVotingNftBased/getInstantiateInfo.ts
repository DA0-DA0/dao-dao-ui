import { Buffer } from 'buffer'

import { DaoCreationGetInstantiateInfo } from '@dao-dao/types'
import { InstantiateMsg } from '@dao-dao/types/contracts/DaoVotingCw721Staked'
import {
  CODE_ID_CONFIG,
  DaoVotingNftBasedCreatorId,
  convertDurationWithUnitsToDuration,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchema from './instantiate_schema.json'
import { VotingModuleCreatorConfig } from './types'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  VotingModuleCreatorConfig
> = (
  { name: daoName },
  { existingGovernanceTokenDenomOrAddress, unstakingDuration },
  t
) => {
  if (!existingGovernanceTokenDenomOrAddress) {
    throw new Error(t('error.missingGovernanceTokenAddress'))
  }

  const msg: InstantiateMsg = {
    nft_address: existingGovernanceTokenDenomOrAddress,
    unstaking_duration: convertDurationWithUnitsToDuration(unstakingDuration),
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(instantiateSchema, t)(msg)

  return {
    admin: { core_module: {} },
    code_id: CODE_ID_CONFIG.DaoVotingCw721Staked,
    label: `DAO_${daoName}_${DaoVotingNftBasedCreatorId}`,
    msg: Buffer.from(JSON.stringify(msg), 'utf8').toString('base64'),
  }
}
