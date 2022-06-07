import { useMemo } from 'react'

import { VotingModuleType } from '@dao-dao/utils'

import { Template, TemplateKey, CustomComponent } from './components'
import {
  AddTokenComponent,
  useAddTokenDefaults,
  useDecodeAddTokenCosmosMsg,
  useTransformAddTokenToCosmos,
  useCustomDefaults,
  useDecodeCustomCosmosMsg,
  useTransformCustomToCosmos,
  MintComponent,
  useMintDefaults,
  useDecodeMintCosmosMsg,
  useTransformMintToCosmos,
  RemoveTokenComponent,
  useRemoveTokenDefaults,
  useDecodeRemoveTokenCosmosMsg,
  useTransformRemoveTokenToCosmos,
  SpendComponent,
  useSpendDefaults,
  useDecodeSpendCosmosMsg,
  useTransformSpendToCosmos,
  StakeComponent,
  useStakeDefaults,
  useDecodeStakeCosmosMsg,
  useTransformStakeToCosmos,
} from './templates'

export const templateMap: Record<TemplateKey, Template> = {
  [TemplateKey.Spend]: {
    key: TemplateKey.Spend,
    label: '💵 Spend',
    description: 'Spend native or cw20 tokens from the treasury.',
    Component: SpendComponent,
    useDefaults: useSpendDefaults,
    useTransformToCosmos: useTransformSpendToCosmos,
    useDecodeCosmosMsg: useDecodeSpendCosmosMsg,
    votingModuleTypes: [
      VotingModuleType.Cw20StakedBalanceVoting,
      VotingModuleType.Cw4Voting,
    ],
  },
  [TemplateKey.Mint]: {
    key: TemplateKey.Mint,
    label: '🌿 Mint',
    description: 'Mint new governance tokens.',
    Component: MintComponent,
    useDefaults: useMintDefaults,
    useTransformToCosmos: useTransformMintToCosmos,
    useDecodeCosmosMsg: useDecodeMintCosmosMsg,
    votingModuleTypes: [VotingModuleType.Cw20StakedBalanceVoting],
  },
  [TemplateKey.Stake]: {
    key: TemplateKey.Stake,
    label: '📤 Staking',
    description: 'Manage native token staking.',
    Component: StakeComponent,
    useDefaults: useStakeDefaults,
    useTransformToCosmos: useTransformStakeToCosmos,
    useDecodeCosmosMsg: useDecodeStakeCosmosMsg,
    votingModuleTypes: [
      VotingModuleType.Cw20StakedBalanceVoting,
      VotingModuleType.Cw4Voting,
    ],
  },
  [TemplateKey.AddToken]: {
    key: TemplateKey.AddToken,
    label: '🔘 Add Treasury Token',
    description: 'Add a token to your treasury.',
    Component: AddTokenComponent,
    useDefaults: useAddTokenDefaults,
    useTransformToCosmos: useTransformAddTokenToCosmos,
    useDecodeCosmosMsg: useDecodeAddTokenCosmosMsg,
    votingModuleTypes: [
      VotingModuleType.Cw20StakedBalanceVoting,
      VotingModuleType.Cw4Voting,
    ],
  },
  [TemplateKey.RemoveToken]: {
    key: TemplateKey.RemoveToken,
    label: '⭕️ Remove Treasury Token',
    description: 'Remove a token from your treasury.',
    Component: RemoveTokenComponent,
    useDefaults: useRemoveTokenDefaults,
    useTransformToCosmos: useTransformRemoveTokenToCosmos,
    useDecodeCosmosMsg: useDecodeRemoveTokenCosmosMsg,
    votingModuleTypes: [
      VotingModuleType.Cw20StakedBalanceVoting,
      VotingModuleType.Cw4Voting,
    ],
  },
  [TemplateKey.Custom]: {
    key: TemplateKey.Custom,
    label: '🤖 Custom',
    description: 'Perform any custom action a wallet can.',
    Component: CustomComponent,
    useDefaults: useCustomDefaults,
    useTransformToCosmos: useTransformCustomToCosmos,
    useDecodeCosmosMsg: useDecodeCustomCosmosMsg,
    votingModuleTypes: [
      VotingModuleType.Cw20StakedBalanceVoting,
      VotingModuleType.Cw4Voting,
    ],
  },
}

export const templates: Template[] = [
  TemplateKey.Spend,
  TemplateKey.Mint,
  TemplateKey.Stake,
  TemplateKey.AddToken,
  TemplateKey.RemoveToken,
  // Ensure custom is always last for two reasons:
  // 1. It should display last since it is a catch-all.
  // 2. It should be the last template type matched against when listing proposals in the UI since it will match any message (see templateAndDataForDecodedCosmosMsg below).
  TemplateKey.Custom,
].map((key) => templateMap[key])

export const useTemplatesForVotingModuleType = (
  type: VotingModuleType
): Template[] =>
  useMemo(
    () =>
      templates.filter(({ votingModuleTypes }) =>
        votingModuleTypes.includes(type)
      ),
    [type]
  )

export * from './components/common'
export * from './components/TemplateRenderer'
