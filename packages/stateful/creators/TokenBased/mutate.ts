import { ActiveThreshold, DaoCreatorMutate } from '@dao-dao/types'
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
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import instantiateSchema from './instantiate_schema.json'
import { CreatorData, GovernanceTokenType } from './types'

export const mutate: DaoCreatorMutate<CreatorData> = (
  msg,
  { name: daoName },
  {
    tiers,
    tokenType,
    newInfo: {
      initialSupply,
      // TODO(tokenfactory-image): add back in once token factory supports URI metadata
      imageUrl: _imageUrl,
      symbol,
      name,
    },
    existingTokenDenom,
    unstakingDuration,
    activeThreshold,
    tokenFactoryDenomCreationFee,
  },
  t,
  codeIds
) => {
  let votingModuleAdapterInstantiateMsg: DaoVotingTokenStakedInstantiateMsg

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
            // Governance Token-based DAOs distribute tier weights
            // evenly amongst members.
            (weight / members.length / 100) * initialSupply,
            NEW_DAO_TOKEN_DECIMALS
          ).toString(),
        }))
    )
    // To prevent rounding issues, treasury balance becomes the
    // remaining tokens after the member weights are distributed.
    const microInitialTreasuryBalance = (
      convertDenomToMicroDenomWithDecimals(
        initialSupply,
        NEW_DAO_TOKEN_DECIMALS
      ) -
      microInitialBalances.reduce((acc, { amount }) => acc + Number(amount), 0)
    ).toString()

    votingModuleAdapterInstantiateMsg = {
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
      unstaking_duration: convertDurationWithUnitsToDuration(unstakingDuration),
    }
  } else {
    if (!existingTokenDenom) {
      throw new Error(t('error.missingGovernanceTokenAddress'))
    }

    votingModuleAdapterInstantiateMsg = {
      active_threshold,
      token_info: {
        existing: {
          denom: existingTokenDenom,
        },
      },
      unstaking_duration:
        unstakingDuration.value === 0
          ? null
          : convertDurationWithUnitsToDuration(unstakingDuration),
    }
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<DaoVotingTokenStakedInstantiateMsg>(
    instantiateSchema,
    t
  )(votingModuleAdapterInstantiateMsg)

  msg.voting_module_instantiate_info = {
    admin: { core_module: {} },
    code_id: codeIds.DaoVotingTokenStaked,
    label: `DAO_${daoName.trim()}_${TokenBasedCreatorId}`,
    msg: encodeMessageAsBase64(votingModuleAdapterInstantiateMsg),
    funds: tokenFactoryDenomCreationFee || [],
  }

  return msg
}
