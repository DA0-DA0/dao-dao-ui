import { ChainId, DaoCreatorGetInstantiateInfo } from '@dao-dao/types'
import { ExecuteMsg as BtsgFtFactoryExecuteMsg } from '@dao-dao/types/contracts/BtsgFtFactory'
import { InitialBalance } from '@dao-dao/types/contracts/DaoVotingTokenStaked'
import {
  NEW_DAO_TOKEN_DECIMALS,
  convertDenomToMicroDenomStringWithDecimals,
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToDuration,
  isSecretNetwork,
} from '@dao-dao/utils'

import { Cw20StakedVotingModule } from '../../clients/voting-module/Cw20StakedVotingModule'
import { SecretSnip20StakedVotingModule } from '../../clients/voting-module/Snip20StakedVotingModule.secret'
import { TokenStakedVotingModule } from '../../clients/voting-module/TokenStakedVotingModule'
import { SecretTokenStakedVotingModule } from '../../clients/voting-module/TokenStakedVotingModule.secret'
import { CreatorData, GovernanceTokenType } from './types'

export const getInstantiateInfo: DaoCreatorGetInstantiateInfo<CreatorData> = ({
  chainConfig: { createWithCw20, tokenCreationFactoryAddress },
  newDao: { chainId, name: daoName },
  data: {
    tiers,
    tokenType,
    newInfo: { initialSupply, imageUrl, symbol, name },
    existingTokenDenomOrAddress,
    existingToken,
    unstakingDuration: unstakingDurationWithUnits,
    customStakingAddress,
    customStakingCodeHash,
    activeThreshold,
    tokenFactoryDenomCreationFee,
  },
  t,
}) => {
  const isNative = !createWithCw20
  const isSecret = isSecretNetwork(chainId)

  const commonConfig = {
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
  }
  const unstakingDuration =
    unstakingDurationWithUnits.value === 0
      ? null
      : convertDurationWithUnitsToDuration(unstakingDurationWithUnits)

  if (tokenType === GovernanceTokenType.New) {
    const microInitialBalances: InitialBalance[] = tiers.flatMap(
      ({ weight, members }) =>
        members.map(({ address }) => ({
          address,
          amount: convertDenomToMicroDenomStringWithDecimals(
            // Governance Token-based DAOs distribute tier weights evenly
            // amongst members.
            (weight / members.length / 100) * initialSupply,
            NEW_DAO_TOKEN_DECIMALS
          ),
        }))
    )
    // To prevent rounding issues, treasury balance becomes the remaining tokens
    // after the member weights are distributed.
    const microInitialTreasuryBalance = BigInt(
      convertDenomToMicroDenomWithDecimals(
        initialSupply,
        NEW_DAO_TOKEN_DECIMALS
      ) -
        microInitialBalances.reduce(
          (acc, { amount }) => acc + Number(amount),
          0
        )
    ).toString()

    // Secret Network only supports creating new CW20 DAOs (SNIP20). Native
    // tokens are supported on other chains. This should never happen, but just
    // in case...
    if (isSecret && isNative) {
      throw new Error(
        'Creating native tokens is not supported on Secret Network.'
      )
    }

    if (isNative) {
      // New BitSong Fantoken
      if (
        chainId === ChainId.BitsongMainnet ||
        chainId === ChainId.BitsongTestnet
      ) {
        if (!tokenCreationFactoryAddress) {
          throw new Error('tokenCreationFactoryAddress not set')
        }

        const fantokenExecute: BtsgFtFactoryExecuteMsg = {
          issue: {
            symbol,
            name,
            // TODO(bitsong-fantoken-factory)
            max_supply: (
              microInitialBalances.reduce(
                (acc, { amount }) => acc + BigInt(amount),
                0n
              ) + BigInt(microInitialTreasuryBalance)
            ).toString(),
            // TODO(bitsong-fantoken-factory)
            uri: '',
            initial_balances: microInitialBalances,
            initial_dao_balance: microInitialTreasuryBalance,
          },
        }

        return TokenStakedVotingModule.generateModuleInstantiateInfo(
          chainId,
          daoName,
          {
            ...commonConfig,
            unstakingDuration,
            token: {
              factory: {
                address: tokenCreationFactoryAddress,
                message: fantokenExecute,
                funds: [],
              },
            },
          }
        )
      } else {
        // New tokenfactory token
        return TokenStakedVotingModule.generateModuleInstantiateInfo(
          chainId,
          daoName,
          {
            ...commonConfig,
            unstakingDuration,
            token: {
              new: {
                symbol,
                decimals: NEW_DAO_TOKEN_DECIMALS,
                name,
                initialBalances: microInitialBalances,
                initialDaoBalance: microInitialTreasuryBalance,
                funds: tokenFactoryDenomCreationFee,
              },
            },
          }
        )
      }
    } else {
      // New CW20 / SNIP20
      return (
        isSecret ? SecretSnip20StakedVotingModule : Cw20StakedVotingModule
      ).generateModuleInstantiateInfo(chainId, daoName, {
        ...commonConfig,
        token: {
          new: {
            symbol,
            decimals: NEW_DAO_TOKEN_DECIMALS,
            name: symbol,
            initialBalances: microInitialBalances,
            initialDaoBalance: microInitialTreasuryBalance,
            marketingInfo: imageUrl ? { logo: { url: imageUrl } } : null,
            unstakingDuration,
          },
        },
      })
    }
  } else {
    if (!existingTokenDenomOrAddress) {
      throw new Error(t('error.missingGovernanceTokenDenom'))
    }

    if (isSecret && !isNative && !existingToken?.snip20CodeHash) {
      throw new Error('SNIP20 code hash not found')
    }
    if (isSecret && !isNative && !customStakingCodeHash) {
      throw new Error('Custom staking contract code hash not found')
    }

    return isNative
      ? (isSecret
          ? SecretTokenStakedVotingModule
          : TokenStakedVotingModule
        ).generateModuleInstantiateInfo(chainId, daoName, {
          ...commonConfig,
          unstakingDuration,
          token: {
            existing: {
              denom: existingTokenDenomOrAddress,
            },
          },
        })
      : isSecret
      ? SecretSnip20StakedVotingModule.generateModuleInstantiateInfo(
          chainId,
          daoName,
          {
            ...commonConfig,
            token: {
              existing: {
                address: existingTokenDenomOrAddress,
                // Type-checked above.
                codeHash: existingToken!.snip20CodeHash!,
                stakingContract:
                  customStakingAddress !== undefined
                    ? {
                        existing: {
                          address: customStakingAddress,
                          // Type-checked above.
                          codeHash: customStakingCodeHash!,
                        },
                      }
                    : {
                        new: {
                          unstakingDuration,
                        },
                      },
              },
            },
          }
        )
      : Cw20StakedVotingModule.generateModuleInstantiateInfo(chainId, daoName, {
          ...commonConfig,
          token: {
            existing: {
              address: existingTokenDenomOrAddress,
              stakingContract:
                customStakingAddress !== undefined
                  ? {
                      existing: {
                        address: customStakingAddress,
                      },
                    }
                  : {
                      new: {
                        unstakingDuration,
                      },
                    },
            },
          },
        })
  }
}
