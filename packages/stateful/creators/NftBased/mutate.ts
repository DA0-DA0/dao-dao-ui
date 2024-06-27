import { ActiveThreshold, DaoCreatorMutate } from '@dao-dao/types'
import { InstantiateMsg } from '@dao-dao/types/contracts/DaoVotingCw721Staked'
import {
  NftBasedCreatorId,
  convertDurationWithUnitsToDuration,
  encodeJsonToBase64,
} from '@dao-dao/utils'

import { CreatorData } from './types'

export const mutate: DaoCreatorMutate<CreatorData> = (
  msg,
  { name: daoName },
  {
    existingGovernanceNftCollectionAddress,
    unstakingDuration,
    activeThreshold,
  },
  t,
  codeIds
) => {
  if (!existingGovernanceNftCollectionAddress) {
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
        address: existingGovernanceNftCollectionAddress,
      },
    },
    unstaking_duration: convertDurationWithUnitsToDuration(unstakingDuration),
  }

  msg.voting_module_instantiate_info = {
    admin: { core_module: {} },
    code_id: codeIds.DaoVotingCw721Staked,
    label: `DAO_${daoName.trim()}_${NftBasedCreatorId}`,
    msg: encodeJsonToBase64(votingModuleAdapterInstantiateMsg),
    funds: [],
  }

  return msg
}
