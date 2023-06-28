import { Buffer } from 'buffer'

import { DaoCreatorMutate } from '@dao-dao/types'
import { InstantiateMsg } from '@dao-dao/types/contracts/DaoVotingCw721Staked'
import {
  CODE_ID_CONFIG,
  NftBasedCreatorId,
  convertDurationWithUnitsToDuration,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchema from './instantiate_schema.json'
import { CreatorData } from './types'

export const mutate: DaoCreatorMutate<CreatorData> = (
  msg,
  { name: daoName },
  { existingGovernanceTokenDenomOrAddress, unstakingDuration },
  t
) => {
  if (!existingGovernanceTokenDenomOrAddress) {
    throw new Error(t('error.missingGovernanceTokenAddress'))
  }

  const votingModuleAdapterInstantiateMsg: InstantiateMsg = {
    nft_address: existingGovernanceTokenDenomOrAddress,
    unstaking_duration: convertDurationWithUnitsToDuration(unstakingDuration),
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(
    instantiateSchema,
    t
  )(votingModuleAdapterInstantiateMsg)

  msg.voting_module_instantiate_info = {
    admin: { core_module: {} },
    code_id: CODE_ID_CONFIG.DaoVotingCw721Staked,
    label: `DAO_${daoName}_${NftBasedCreatorId}`,
    msg: Buffer.from(
      JSON.stringify(votingModuleAdapterInstantiateMsg),
      'utf8'
    ).toString('base64'),
  }

  return msg
}
