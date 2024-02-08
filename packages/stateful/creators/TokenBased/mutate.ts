import { ActiveThreshold, DaoCreatorMutate } from '@dao-dao/types'
import { InstantiateMsg as DaoVotingCw20StakedInstantiateMsg } from '@dao-dao/types/contracts/DaoVotingCw20Staked'
import {
  InstantiateMsg as DaoVotingTokenStakedInstantiateMsg,
  InitialBalance,
} from '@dao-dao/types/contracts/DaoVotingTokenStaked'
import {
  NEW_DAO_TOKEN_DECIMALS,
  TokenBasedCreatorId,
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToDuration,
  encodeMessageAsBase64,
  mustGetSupportedChainConfig,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchemaCw20 from './instantiate_schema_cw20.json'
import instantiateSchemaNative from './instantiate_schema_native.json'
import { CreatorData, GovernanceTokenType } from './types'

export const mutate: DaoCreatorMutate<CreatorData> = (
  msg,
  { chainId, name: daoName },
  {
    tiers,
    tokenType,
    newInfo: { initialSupply, imageUrl, symbol, name },
    existingTokenDenomOrAddress,
    unstakingDuration,
    activeThreshold,
    tokenFactoryDenomCreationFee,
  },
  t,
  codeIds
) => {
  const isNative = !mustGetSupportedChainConfig(chainId)?.createWithCw20

  let votingModuleAdapterInstantiateMsg:
    | DaoVotingTokenStakedInstantiateMsg
    | DaoVotingCw20StakedInstantiateMsg

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

  if (tokenType === GovernanceTokenType.New) {
    const microInitialBalances: InitialBalance[] = tiers.flatMap(
      ({ weight, members }) =>
        members.map(({ address }) => ({
          address,
          amount: convertDenomToMicroDenomWithDecimals(
            // Governance Token-based DAOs distribute tier weights evenly
            // amongst members.
            (weight / members.length / 100) * initialSupply,
            NEW_DAO_TOKEN_DECIMALS
          ).toString(),
        }))
    )
    // To prevent rounding issues, treasury balance becomes the remaining tokens
    // after the member weights are distributed.
    const microInitialTreasuryBalance = (
      convertDenomToMicroDenomWithDecimals(
        initialSupply,
        NEW_DAO_TOKEN_DECIMALS
      ) -
      microInitialBalances.reduce((acc, { amount }) => acc + Number(amount), 0)
    ).toString()

    votingModuleAdapterInstantiateMsg = isNative
      ? {
          active_threshold,
          token_info: {
            new: {
              token_issuer_code_id: codeIds.CwTokenfactoryIssuer,
              subdenom: symbol.toLowerCase(),
              initial_balances: microInitialBalances,
              initial_dao_balance: microInitialTreasuryBalance,
              metadata: {
                additional_denom_units: [
                  {
                    aliases: [],
                    denom: symbol,
                    exponent: `${NEW_DAO_TOKEN_DECIMALS}`,
                  },
                ],
                description: `${daoName}'s Governance Token`,
                display: symbol,
                name,
                symbol,
              },
            },
          },
          unstaking_duration:
            convertDurationWithUnitsToDuration(unstakingDuration),
        }
      : {
          active_threshold,
          token_info: {
            new: {
              code_id: codeIds.Cw20Base ?? -1,
              decimals: NEW_DAO_TOKEN_DECIMALS,
              initial_balances: microInitialBalances,
              initial_dao_balance: microInitialTreasuryBalance,
              label: name,
              marketing: imageUrl ? { logo: { url: imageUrl } } : null,
              name,
              staking_code_id: codeIds.Cw20Stake ?? -1,
              symbol,
              unstaking_duration:
                convertDurationWithUnitsToDuration(unstakingDuration),
            },
          },
        }
  } else {
    if (!existingTokenDenomOrAddress) {
      throw new Error(t('error.missingGovernanceTokenDenom'))
    }

    votingModuleAdapterInstantiateMsg = isNative
      ? {
          active_threshold,
          token_info: {
            existing: {
              denom: existingTokenDenomOrAddress,
            },
          },
          unstaking_duration:
            unstakingDuration.value === 0
              ? null
              : convertDurationWithUnitsToDuration(unstakingDuration),
        }
      : {
          active_threshold,
          token_info: {
            existing: {
              address: existingTokenDenomOrAddress,
              staking_contract: {
                new: {
                  staking_code_id: codeIds.Cw20Stake ?? -1,
                  unstaking_duration:
                    convertDurationWithUnitsToDuration(unstakingDuration),
                },
              },
            },
          },
        }
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<
    DaoVotingTokenStakedInstantiateMsg | DaoVotingCw20StakedInstantiateMsg
  >(
    isNative ? instantiateSchemaNative : instantiateSchemaCw20,
    t
  )(votingModuleAdapterInstantiateMsg)

  msg.voting_module_instantiate_info = {
    admin: { core_module: {} },
    code_id: isNative
      ? codeIds.DaoVotingTokenStaked
      : codeIds.DaoVotingCw20Staked ?? -1,
    label: `DAO_${daoName.trim()}_${TokenBasedCreatorId}_${
      isNative ? 'native' : 'cw20'
    }`,
    msg: encodeMessageAsBase64(votingModuleAdapterInstantiateMsg),
    funds: tokenFactoryDenomCreationFee || [],
  }

  return msg
}
