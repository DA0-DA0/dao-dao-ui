import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import {
  FromCosmosMsgProps,
  Template,
  ToCosmosMsgProps,
  TemplateKey,
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
import {
  spendDefaults,
  transformCosmosToSpend,
  transformSpendToCosmos,
} from '@dao-dao/ui/components/templates/Spend'
import {
  stakeDefaults,
  transformCosmosToStake,
  transformStakeToCosmos,
} from '@dao-dao/ui/components/templates/Stake'

import { AddTokenComponent } from './AddToken'
import { MintComponent } from './Mint'
import { RemoveTokenComponent } from './RemoveToken'
import { SpendComponent } from './Spend'
import { StakeComponent } from './Stake'

export const templateMap: Record<TemplateKey, Template> = {
  [TemplateKey.Spend]: {
    key: TemplateKey.Spend,
    label: '💵 Spend',
    description: 'Spend native or cw20 tokens from the treasury.',
    Component: SpendComponent,
    getDefaults: spendDefaults,
    toCosmosMsg: transformSpendToCosmos,
    fromCosmosMsg: transformCosmosToSpend,
  },
  [TemplateKey.Mint]: {
    key: TemplateKey.Mint,
    label: '🌿 Mint',
    description: 'Mint new governance tokens.',
    Component: MintComponent,
    getDefaults: mintDefaults,
    toCosmosMsg: transformMintToCosmos,
    fromCosmosMsg: transformCosmosToMint,
  },
  [TemplateKey.Stake]: {
    key: TemplateKey.Stake,
    label: '📤 Staking',
    description: 'Manage native token staking.',
    Component: StakeComponent,
    getDefaults: stakeDefaults,
    toCosmosMsg: transformStakeToCosmos,
    fromCosmosMsg: transformCosmosToStake,
  },
  [TemplateKey.AddToken]: {
    key: TemplateKey.AddToken,
    label: '🔘 Add Treasury Token',
    description: 'Add a token to your treasury.',
    Component: AddTokenComponent,
    getDefaults: addTokenDefaults,
    toCosmosMsg: transformAddTokenToCosmos,
    fromCosmosMsg: transformCosmosToAddToken,
  },
  [TemplateKey.RemoveToken]: {
    key: TemplateKey.RemoveToken,
    label: '⭕️ Remove Treasury Token',
    description: 'Remove a token from your treasury.',
    Component: RemoveTokenComponent,
    getDefaults: removeTokenDefaults,
    toCosmosMsg: transformRemoveTokenToCosmos,
    fromCosmosMsg: transformCosmosToRemoveToken,
  },
  [TemplateKey.Custom]: {
    key: TemplateKey.Custom,
    label: '🤖 Custom',
    description: 'Perform any custom action a wallet can.',
    Component: CustomComponent,
    getDefaults: customDefaults,
    toCosmosMsg: transformCustomToCosmos,
    fromCosmosMsg: transformCosmosToCustom,
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

export const templateToCosmosMsg = <T extends TemplateKey>(
  templateKey: T,
  data: any,
  props: ToCosmosMsgProps
): CosmosMsgFor_Empty | undefined =>
  templateMap[templateKey].toCosmosMsg?.(data, props)

export const templateAndDataForDecodedCosmosMsg = (
  msg: Record<string, any>,
  props: FromCosmosMsgProps
) => {
  // Note: Ensure custom is the last message template since it will match
  // most proposals and we return the first successful message match.
  for (const template of templates) {
    const data = template.fromCosmosMsg(msg, props)
    if (data) {
      return {
        template,
        data,
      }
    }
  }
  return null
}

export * from './TemplateRendererComponent'
