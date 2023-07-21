import { Buffer } from 'buffer'

import { DaoCreatorMutate } from '@dao-dao/types'
import { InstantiateMsg } from '@dao-dao/types/contracts/DaoVotingCw721Staked'
import {
  NftBasedCreatorId,
  convertDurationWithUnitsToDuration,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchema from './instantiate_schema.json'
import { CreatorData, GovernanceTokenType } from './types'

export const mutate: DaoCreatorMutate<CreatorData> = (
  msg,
  { name: daoName },
  {
    tokenType,
    newInfo,
    existingGovernanceTokenDenomOrAddress,
    unstakingDuration,
  },
  t,
  codeIds
) => {
  if (
    tokenType === GovernanceTokenType.Existing &&
    !existingGovernanceTokenDenomOrAddress
  ) {
    throw new Error(t('error.missingGovernanceTokenAddress'))
  }

  const votingModuleAdapterInstantiateMsg: InstantiateMsg = {
    active_threshold: null,
    nft_contract:
      tokenType === GovernanceTokenType.New
        ? {
            new: {
              code_id: codeIds.Cw721Base,
              initial_nfts: newInfo.initialNfts.map(
                ({ owner, token_uri }, index) => ({
                  extension: {},
                  owner,
                  token_uri: token_uri || '',
                  token_id: BigInt(index).toString(),
                })
              ),
              label: newInfo.name,
              name: newInfo.name,
              symbol: newInfo.symbol,
            },
          }
        : {
            existing: {
              address: existingGovernanceTokenDenomOrAddress,
            },
          },
    unstaking_duration: convertDurationWithUnitsToDuration(unstakingDuration),
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(
    instantiateSchema,
    t
  )(votingModuleAdapterInstantiateMsg)

  msg.voting_module_instantiate_info = {
    admin: { core_module: {} },
    code_id: codeIds.DaoVotingCw721Staked,
    label: `DAO_${daoName}_${NftBasedCreatorId}`,
    msg: Buffer.from(
      JSON.stringify(votingModuleAdapterInstantiateMsg),
      'utf8'
    ).toString('base64'),
  }

  return msg
}
