import { DaoCreatorMutate } from '@dao-dao/types'
import {
  ActiveThreshold,
  InstantiateMsg,
} from '@dao-dao/types/contracts/DaoVotingCw721Staked'
import {
  NftBasedCreatorId,
  convertDurationWithUnitsToDuration,
  encodeJsonToBase64,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchema from './instantiate_schema.json'
import { CreatorData } from './types'

export const mutate: DaoCreatorMutate<CreatorData> = (
  msg,
  { name: daoName },
  { existingGovernanceTokenDenomOrAddress, unstakingDuration, activeThreshold },
  t,
  codeIds
) => {
  if (!existingGovernanceTokenDenomOrAddress) {
    throw new Error(t('error.missingGovernanceTokenAddress'))
  }

  const active_threshold: ActiveThreshold | null = activeThreshold?.enabled
    ? !activeThreshold.type || activeThreshold.type === 'percent'
      ? {
          percentage: {
            percent: (activeThreshold.value / 100).toString(),
          },
        }
      : {
          absolute_count: {
            count: BigInt(activeThreshold.value).toString(),
          },
        }
    : null

  const votingModuleAdapterInstantiateMsg: InstantiateMsg = {
    active_threshold,
    nft_contract: {
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
    label: `DAO_${daoName.trim()}_${NftBasedCreatorId}`,
    msg: encodeJsonToBase64(votingModuleAdapterInstantiateMsg),
    funds: [],
  }

  return msg
}
