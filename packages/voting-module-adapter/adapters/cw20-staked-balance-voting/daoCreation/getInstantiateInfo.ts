import { Buffer } from 'buffer'

import {
  Cw20Coin,
  InstantiateMsg,
} from '@dao-dao/state/clients/cw20-staked-balance-voting'
import { DaoCreationGetInstantiateInfo } from '@dao-dao/tstypes'
import {
  CW20STAKEDBALANCEVOTING_CONTRACT_NAME,
  CW20_CODE_ID,
  CW4VOTING_CODE_ID,
  NEW_DAO_CW20_DECIMALS,
  STAKECW20_CODE_ID,
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToDuration,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import { DaoCreationConfig, GovernanceTokenType } from '../types'
import instantiateSchema from './instantiate_schema.json'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  DaoCreationConfig
> = (
  { name: daoName },
  {
    tiers,
    tokenType,
    newInfo: { initialSupply, imageUrl, symbol, name },
    existingGovernanceTokenAddress,
    unstakingDuration,
  },
  t
) => {
  let tokenInfo: InstantiateMsg['token_info']
  if (tokenType === GovernanceTokenType.New) {
    const microInitialBalances: Cw20Coin[] = tiers.flatMap(
      ({ weight, members }) =>
        members.map(({ address }) => ({
          address,
          amount: convertDenomToMicroDenomWithDecimals(
            // Governance Token-based DAOs distribute tier weights
            // evenly amongst members.
            (weight / members.length / 100) * initialSupply,
            NEW_DAO_CW20_DECIMALS
          ),
        }))
    )
    // To prevent rounding issues, treasury balance becomes the
    // remaining tokens after the member weights are distributed.
    const microInitialTreasuryBalance = (
      Number(
        convertDenomToMicroDenomWithDecimals(
          initialSupply,
          NEW_DAO_CW20_DECIMALS
        )
      ) -
      microInitialBalances.reduce((acc, { amount }) => acc + Number(amount), 0)
    ).toString()

    tokenInfo = {
      new: {
        code_id: CW20_CODE_ID,
        decimals: NEW_DAO_CW20_DECIMALS,
        initial_balances: microInitialBalances,
        initial_dao_balance: microInitialTreasuryBalance,
        label: name,
        marketing: imageUrl ? { logo: { url: imageUrl } } : null,
        name,
        staking_code_id: STAKECW20_CODE_ID,
        symbol,
        unstaking_duration:
          convertDurationWithUnitsToDuration(unstakingDuration),
      },
    }
  } else {
    if (!existingGovernanceTokenAddress) {
      throw new Error(t('errors.noGovTokenAddr'))
    }

    tokenInfo = {
      existing: {
        address: existingGovernanceTokenAddress,
        staking_contract: {
          new: {
            staking_code_id: STAKECW20_CODE_ID,
            unstaking_duration:
              convertDurationWithUnitsToDuration(unstakingDuration),
          },
        },
      },
    }
  }

  const msg: InstantiateMsg = {
    token_info: tokenInfo,
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(instantiateSchema, t)(msg)

  return {
    admin: { core_contract: {} },
    code_id: CW4VOTING_CODE_ID,
    label: `DAO_${daoName}_${CW20STAKEDBALANCEVOTING_CONTRACT_NAME}`,
    msg: Buffer.from(JSON.stringify(msg), 'utf8').toString('base64'),
  }
}
