import { InstantiateMsg as CwCoreInstantiateMsg } from '@dao-dao/state/clients/cw-core'
import { InstantiateMsg as CwProposalSingleInstantiateMsg } from '@dao-dao/state/clients/cw-proposal-single'
import { InstantiateMsg as Cw20StakedBalanceVotingInstantiateMsg } from '@dao-dao/state/clients/cw20-staked-balance-voting'
import { InstantiateMsg as Cw4VotingInstantiateMsg } from '@dao-dao/state/clients/cw4-voting'

import cwCoreInstantiateJson from './instantiate_schema/cw-core.json'
import cwProposalSingleInstantiateJson from './instantiate_schema/cw-proposal-single.json'
import cw20StakedBalanceVotingInstantiateJson from './instantiate_schema/cw20-staked-balance-voting.json'
import cw4VotingInstantiateJson from './instantiate_schema/cw4-voting.json'
import { makeValidateMsg } from './makeValidateMsg'

export const validateCwCoreInstantiateMsg =
  makeValidateMsg<CwCoreInstantiateMsg>(cwCoreInstantiateJson)
export const validateCwProposalSingleInstantiateMsg =
  makeValidateMsg<CwProposalSingleInstantiateMsg>(
    cwProposalSingleInstantiateJson
  )
export const validateCw4VotingInstantiateMsg =
  makeValidateMsg<Cw4VotingInstantiateMsg>(cw4VotingInstantiateJson)
export const validateCw20StakedBalanceVotingInstantiateMsg =
  makeValidateMsg<Cw20StakedBalanceVotingInstantiateMsg>(
    cw20StakedBalanceVotingInstantiateJson
  )
