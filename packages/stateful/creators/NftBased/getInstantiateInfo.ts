import {
  Cw721RolesVotingModule,
  Cw721StakedVotingModule,
  OnftStakedVotingModule,
} from '@dao-dao/state/clients'
import { SecretSnip721StakedVotingModule } from '@dao-dao/state/clients/voting-module/Snip721StakedVotingModule.secret'
import { ChainId, DaoCreatorGetInstantiateInfo } from '@dao-dao/types'
import {
  convertDurationWithUnitsToDuration,
  isSecretNetwork,
} from '@dao-dao/utils'

import { CreatorData, GovernanceTokenType, NftVotingModuleType } from './types'

export const getInstantiateInfo: DaoCreatorGetInstantiateInfo<CreatorData> = ({
  chainConfig: { chainId },
  data,
}) => {
  const isOmniFlix =
    chainId === ChainId.OmniflixHubMainnet ||
    chainId === ChainId.OmniflixHubTestnet

  if (data.votingModuleType === NftVotingModuleType.Roles) {
    if (isSecretNetwork(chainId)) {
      throw new Error(
        'CW721 roles voting module is not supported on Secret Network'
      )
    }

    if (isOmniFlix) {
      throw new Error('CW721 roles voting module is not supported on OmniFlix')
    }

    return Cw721RolesVotingModule.generateModuleInstantiateInfo(chainId, {
      nft:
        data.tokenType === GovernanceTokenType.Existing
          ? {
              existing: {
                address: data.existingGovernanceNftCollectionAddress,
              },
            }
          : {
              new: {
                name: data.newInfo.name,
                symbol: data.newInfo.symbol,
                initialNfts: data.initialNfts.map(
                  ({ owner, tokenId, tokenUri, role, weight }) => ({
                    owner,
                    token_id: tokenId,
                    token_uri: tokenUri?.trim() || null,
                    extension: {
                      role: role?.trim() || null,
                      weight: Number(weight),
                    },
                  })
                ),
              },
            },
    })
  }

  const {
    existingGovernanceNftCollectionAddress,
    secretCodeHash,
    unstakingDuration,
    activeThreshold,
  } = data

  const commonConfig = {
    activeThreshold: activeThreshold?.enabled
      ? !activeThreshold.type || activeThreshold.type === 'percent'
        ? {
            percentage: {
              percent: (Number(activeThreshold.value) / 100).toString(),
            },
          }
        : {
            absolute_count: {
              count: BigInt(activeThreshold.value).toString(),
            },
          }
      : null,

    unstakingDuration: convertDurationWithUnitsToDuration(unstakingDuration),
  }

  if (isSecretNetwork(chainId)) {
    if (!secretCodeHash) {
      throw new Error('SNIP721 code hash is missing')
    }

    return SecretSnip721StakedVotingModule.generateModuleInstantiateInfo(
      chainId,
      {
        ...commonConfig,
        nft: {
          existing: {
            address: existingGovernanceNftCollectionAddress,
            codeHash: secretCodeHash,
          },
        },
      }
    )
  } else if (isOmniFlix) {
    return OnftStakedVotingModule.generateModuleInstantiateInfo(chainId, {
      ...commonConfig,
      onft: {
        existing: {
          id: existingGovernanceNftCollectionAddress,
        },
      },
    })
  } else {
    return Cw721StakedVotingModule.generateModuleInstantiateInfo(chainId, {
      ...commonConfig,
      nft: {
        existing: {
          address: existingGovernanceNftCollectionAddress,
        },
      },
    })
  }
}
