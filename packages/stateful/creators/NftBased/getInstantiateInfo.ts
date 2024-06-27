import { DaoCreatorGetInstantiateInfo } from '@dao-dao/types'
import {
  convertDurationWithUnitsToDuration,
  isSecretNetwork,
} from '@dao-dao/utils'

import { Cw721StakedVotingModule } from '../../clients/voting-module/Cw721StakedVotingModule'
import { SecretSnip721StakedVotingModule } from '../../clients/voting-module/Snip721StakedVotingModule.secret'
import { CreatorData } from './types'

export const getInstantiateInfo: DaoCreatorGetInstantiateInfo<CreatorData> = ({
  chainConfig: { chainId },
  newDao: { name },
  data: {
    existingGovernanceNftCollectionAddress,
    secretCodeHash,
    unstakingDuration,
    activeThreshold,
  },
}) => {
  if (isSecretNetwork(chainId) && !secretCodeHash) {
    throw new Error('SNIP721 code hash is missing')
  }

  return (
    isSecretNetwork(chainId)
      ? SecretSnip721StakedVotingModule
      : Cw721StakedVotingModule
  ).generateModuleInstantiateInfo(chainId, name, {
    activeThreshold: activeThreshold?.enabled
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
      : null,
    nft: {
      existing: {
        address: existingGovernanceNftCollectionAddress,
        // Type-checked above.
        codeHash: secretCodeHash || '',
      },
    },
    unstakingDuration: convertDurationWithUnitsToDuration(unstakingDuration),
  })
}
