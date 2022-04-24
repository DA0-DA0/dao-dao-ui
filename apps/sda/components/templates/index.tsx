import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import {
  FromCosmosMsgProps,
  Template,
  ToCosmosMsgProps,
} from '@dao-dao/ui/components/templates'
import {
  addTokenDefaults,
  transformAddTokenToCosmos,
  transformCosmosToAddToken,
} from '@dao-dao/ui/components/templates/AddToken'
import {
  CustomComponent,
  customDefaults,
  transformCosmosToCustom,
  transformCustomToCosmos,
} from '@dao-dao/ui/components/templates/Custom'
import {
  mintDefaults,
  transformCosmosToMint,
  transformMintToCosmos,
} from '@dao-dao/ui/components/templates/Mint'
import {
  removeTokenDefaults,
  transformCosmosToRemoveToken,
  transformRemoveTokenToCosmos,
} from '@dao-dao/ui/components/templates/RemoveToken'

import { AddTokenComponent } from './AddToken'
import { MintComponent } from './Mint'
import { RemoveTokenComponent } from './RemoveToken'
// TODO: Make stateful versions of these like AddToken, Mint, and RemoveToken.
import {
  SpendComponent,
  spendDefaults,
  transformCosmosToSpend,
  transformSpendToCosmos,
} from './Spend'
import {
  StakeComponent,
  stakeDefaults,
  transformCosmosToStake,
  transformStakeToCosmos,
} from './Stake'

export const templates: Template[] = [
  {
    label: '💵 Spend',
    description: 'Spend native or cw20 tokens from the treasury.',
    component: SpendComponent,
    getDefaults: spendDefaults,
    toCosmosMsg: transformSpendToCosmos,
    fromCosmosMsg: transformCosmosToSpend,
  },
  {
    label: '🌿 Mint',
    description: 'Mint new governance tokens.',
    component: MintComponent,
    getDefaults: mintDefaults,
    toCosmosMsg: transformMintToCosmos,
    fromCosmosMsg: transformCosmosToMint,
  },
  {
    label: '📤 Staking',
    description: 'Manage native token staking.',
    component: StakeComponent,
    getDefaults: stakeDefaults,
    toCosmosMsg: transformStakeToCosmos,
    fromCosmosMsg: transformCosmosToStake,
  },
  {
    label: '🔘 Add Treasury Token',
    description: 'Add a token to your treasury.',
    component: AddTokenComponent,
    getDefaults: addTokenDefaults,
    toCosmosMsg: transformAddTokenToCosmos,
    fromCosmosMsg: transformCosmosToAddToken,
  },
  {
    label: '⭕️ Remove Treasury Token',
    description: 'Remove a token from your treasury.',
    component: RemoveTokenComponent,
    getDefaults: removeTokenDefaults,
    toCosmosMsg: transformRemoveTokenToCosmos,
    fromCosmosMsg: transformCosmosToRemoveToken,
  },
  {
    label: '🤖 Custom',
    description: 'Perform any custom action a wallet can.',
    component: CustomComponent,
    getDefaults: customDefaults,
    toCosmosMsg: transformCustomToCosmos,
    fromCosmosMsg: transformCosmosToCustom,
  },
]

// Ensure custom is always sorted last for two reasons:
// 1. It should display last since it is a catch-all.
// 2. It should be the last template type matched against when listing proposals in the UI since it will match any message (see messageTemplateAndValuesForDecodedCosmosMsg).
templates.sort((a, b) => {
  if (a.component === CustomComponent) {
    return 1
  } else if (b.component === CustomComponent) {
    return -1
  }
  return 0
})

export const templateToCosmosMsg = (
  templateLabel: string,
  data: any,
  props: ToCosmosMsgProps
): CosmosMsgFor_Empty | undefined =>
  templates.find((t) => t.label === templateLabel)?.toCosmosMsg?.(data, props)

export const templateAndValuesForDecodedCosmosMsg = (
  msg: Record<string, any>,
  props: FromCosmosMsgProps
) => {
  // Ensure custom is the last message template since it will match most
  // proposals and we return the first successful message match.
  for (const template of templates) {
    const values = template.fromCosmosMsg(msg, props)
    if (values) {
      return {
        template,
        values,
      }
    }
  }
  return null
}
