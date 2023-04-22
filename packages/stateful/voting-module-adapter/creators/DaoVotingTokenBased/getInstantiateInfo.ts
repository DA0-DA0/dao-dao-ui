import { Buffer } from 'buffer'

import { DaoCreationGetInstantiateInfo, TokenType } from '@dao-dao/types'
import {
  Cw20Coin,
  InstantiateMsg as DaoVotingCw20StakedInstantiateMsg,
} from '@dao-dao/types/contracts/DaoVotingCw20Staked'
import { InstantiateMsg as DaoVotingNativeStakedInstantiateMsg } from '@dao-dao/types/contracts/DaoVotingNativeStaked'
import {
  CODE_ID_CONFIG,
  DaoVotingTokenBasedCreatorId,
  NEW_DAO_CW20_DECIMALS,
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToDuration,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import cw20InstantiateSchema from './instantiate_schema_cw20.json'
import nativeInstantiateSchema from './instantiate_schema_native.json'
import { GovernanceTokenType, VotingModuleCreatorConfig } from './types'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  VotingModuleCreatorConfig
> = (
  { name: daoName },
  {
    tiers,
    tokenType,
    newInfo: { initialSupply, imageUrl, symbol, name },
    existingTokenType,
    existingTokenDenomOrAddress,
    unstakingDuration,
  },
  t
) => {
  const isCw20 =
    tokenType === GovernanceTokenType.NewCw20 ||
    existingTokenType === TokenType.Cw20

  let msg:
    | DaoVotingCw20StakedInstantiateMsg
    | DaoVotingNativeStakedInstantiateMsg

  if (tokenType === GovernanceTokenType.NewCw20) {
    const microInitialBalances: Cw20Coin[] = tiers.flatMap(
      ({ weight, members }) =>
        members.map(({ address }) => ({
          address,
          amount: convertDenomToMicroDenomWithDecimals(
            // Governance Token-based DAOs distribute tier weights
            // evenly amongst members.
            (weight / members.length / 100) * initialSupply,
            NEW_DAO_CW20_DECIMALS
          ).toString(),
        }))
    )
    // To prevent rounding issues, treasury balance becomes the
    // remaining tokens after the member weights are distributed.
    const microInitialTreasuryBalance = (
      convertDenomToMicroDenomWithDecimals(
        initialSupply,
        NEW_DAO_CW20_DECIMALS
      ) -
      microInitialBalances.reduce((acc, { amount }) => acc + Number(amount), 0)
    ).toString()

    msg = {
      token_info: {
        new: {
          code_id: CODE_ID_CONFIG.Cw20Base,
          decimals: NEW_DAO_CW20_DECIMALS,
          initial_balances: microInitialBalances,
          initial_dao_balance: microInitialTreasuryBalance,
          label: name,
          marketing: imageUrl ? { logo: { url: imageUrl } } : null,
          name,
          staking_code_id: CODE_ID_CONFIG.Cw20Stake,
          symbol,
          unstaking_duration:
            convertDurationWithUnitsToDuration(unstakingDuration),
        },
      },
    }
  } else if (isCw20) {
    if (!existingTokenDenomOrAddress) {
      throw new Error(t('error.missingGovernanceTokenAddress'))
    }

    msg = {
      token_info: {
        existing: {
          address: existingTokenDenomOrAddress,
          staking_contract: {
            new: {
              staking_code_id: CODE_ID_CONFIG.Cw20Stake,
              unstaking_duration:
                convertDurationWithUnitsToDuration(unstakingDuration),
            },
          },
        },
      },
    }
  } else {
    if (!existingTokenDenomOrAddress) {
      throw new Error(t('error.missingGovernanceTokenAddress'))
    }

    msg = {
      denom: existingTokenDenomOrAddress,
      owner: { core_module: {} },
      unstaking_duration:
        unstakingDuration.value === 0
          ? null
          : convertDurationWithUnitsToDuration(unstakingDuration),
    }
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<
    DaoVotingCw20StakedInstantiateMsg | DaoVotingNativeStakedInstantiateMsg
  >(
    isCw20 ? cw20InstantiateSchema : nativeInstantiateSchema,
    t
  )(msg)

  return {
    admin: { core_module: {} },
    code_id: isCw20
      ? CODE_ID_CONFIG.DaoVotingCw20Staked
      : CODE_ID_CONFIG.DaoVotingNativeStaked,
    label: `DAO_${daoName}_${DaoVotingTokenBasedCreatorId}_${
      isCw20 ? 'cw20' : 'native'
    }`,
    msg: Buffer.from(JSON.stringify(msg), 'utf8').toString('base64'),
  }
}
