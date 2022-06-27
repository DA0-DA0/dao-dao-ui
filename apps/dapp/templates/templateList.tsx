import { FieldErrors } from 'react-hook-form'

import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'

import { Config } from 'util/contractConfigWrapper'

import {
  AddTokenComponent,
  addTokenDefaults,
  transformAddTokenToCosmos,
  transformCosmosToAddToken,
} from './addToken'
import {
  ChangeMembersComponent,
  changeMembersDefaults,
  transformChangeMembersToCosmos,
  transformCosmosToChangeMembers,
} from './changeMembers'
import {
  daoConfigUpdateDefaults,
  DAOUpdateConfigComponent,
  transformCosmosToDAOConfigUpdate,
  transformDAOConfigUpdateToCosmos,
} from './configUpdate'
import {
  CustomComponent,
  customDefaults,
  transformCosmosToCustom,
  transformCustomToCosmos,
} from './custom'
import {
  MigrateContractComponent,
  migrateContractDefaults,
  transformCosmosToMigrateContract,
  transformMigrateContractToCosmos,
} from './migrateContract'
import {
  MintComponent,
  mintDefaults,
  transformCosmosToMint,
  transformMintToCosmos,
} from './mint'
import {
  PauseComponent,
  pauseDefaults,
  transformCosmosToPause,
  transformPauseToCosmos,
} from './pause'
import {
  RemoveTokenComponent,
  removeTokenDefaults,
  transformCosmosToRemoveToken,
  transformRemoveTokenToCosmos,
} from './removeToken'
import {
  SpendComponent,
  spendDefaults,
  transformCosmosToSpend,
  transformSpendToCosmos,
} from './spend'
import {
  StakeComponent,
  stakeDefaults,
  transformCosmosToStake,
  transformStakeToCosmos,
} from './stake'

export enum ContractSupport {
  Multisig,
  DAO,
  Both,
}

// Adding a template to this list will cause it to be available
// across the UI.
export const messageTemplates: MessageTemplate[] = [
  {
    label: '💵 Spend',
    description: 'Spend native or cw20 tokens from the treasury.',
    component: SpendComponent,
    contractSupport: ContractSupport.Both,
    getDefaults: spendDefaults,
    toCosmosMsg: transformSpendToCosmos,
    fromCosmosMsg: transformCosmosToSpend,
  },
  {
    label: '🌿 Mint',
    description: 'Mint new governance tokens.',
    component: MintComponent,
    contractSupport: ContractSupport.DAO,
    getDefaults: mintDefaults,
    toCosmosMsg: transformMintToCosmos,
    fromCosmosMsg: transformCosmosToMint,
  },
  {
    label: '📤 Staking',
    description: 'Manage native token staking.',
    component: StakeComponent,
    contractSupport: ContractSupport.Both,
    getDefaults: stakeDefaults,
    toCosmosMsg: transformStakeToCosmos,
    fromCosmosMsg: transformCosmosToStake,
  },
  {
    label: '🤖 Custom',
    description: 'Perform any custom action a wallet can.',
    component: CustomComponent,
    contractSupport: ContractSupport.Both,
    getDefaults: customDefaults,
    toCosmosMsg: transformCustomToCosmos,
    fromCosmosMsg: transformCosmosToCustom,
  },
  {
    label: '🎭 Update Config',
    description: 'Update your governance configuration.',
    component: DAOUpdateConfigComponent,
    contractSupport: ContractSupport.DAO,
    getDefaults: daoConfigUpdateDefaults,
    toCosmosMsg: transformDAOConfigUpdateToCosmos,
    fromCosmosMsg: transformCosmosToDAOConfigUpdate,
  },
  {
    label: '🏖 Pause DAO',
    description: 'Pause your DAO and stop all DAO actions.',
    component: PauseComponent,
    contractSupport: ContractSupport.DAO,
    getDefaults: pauseDefaults,
    toCosmosMsg: transformPauseToCosmos,
    fromCosmosMsg: transformCosmosToPause,
  },
  {
    label: '🐋 Migrate Contract',
    description: 'Migrate a contract to a new code ID.',
    component: MigrateContractComponent,
    contractSupport: ContractSupport.Both,
    getDefaults: migrateContractDefaults,
    toCosmosMsg: transformMigrateContractToCosmos,
    fromCosmosMsg: transformCosmosToMigrateContract,
  },
  {
    label: '🔘 Add Treasury Token',
    description: 'Add a token to your treasury.',
    component: AddTokenComponent,
    contractSupport: ContractSupport.Both,
    getDefaults: addTokenDefaults,
    toCosmosMsg: transformAddTokenToCosmos,
    fromCosmosMsg: transformCosmosToAddToken,
  },
  {
    label: '⭕️ Remove Treasury Token',
    description: 'Remove a token from your treasury.',
    component: RemoveTokenComponent,
    contractSupport: ContractSupport.Both,
    getDefaults: removeTokenDefaults,
    toCosmosMsg: transformRemoveTokenToCosmos,
    fromCosmosMsg: transformCosmosToRemoveToken,
  },
  {
    label: '👥 Manage Members',
    description: 'Add and remove multisig members.',
    component: ChangeMembersComponent,
    contractSupport: ContractSupport.Multisig,
    getDefaults: changeMembersDefaults,
    toCosmosMsg: transformChangeMembersToCosmos,
    fromCosmosMsg: transformCosmosToChangeMembers,
  },
]
// Ensure custom is always sorted last for two reasons:
// 1. It should display last since it is a catch-all.
// 2. It should be the last template type matched against when listing proposals in the UI since it will match any message (see messageTemplateAndValuesForDecodedCosmosMsg).
messageTemplates.sort((a, b) => {
  if (a.component === CustomComponent) {
    return 1
  } else if (b.component === CustomComponent) {
    return -1
  }
  return 0
})

export const messageTemplateToCosmosMsg = (
  m: MessageTemplate,
  props: ToCosmosMsgProps
): CosmosMsgFor_Empty | undefined =>
  messageTemplates
    .find((template) => template.label === m.label)
    ?.toCosmosMsg?.(m as any, props)

export const messageTemplateAndValuesForDecodedCosmosMsg = (
  msg: Record<string, any>,
  props: FromCosmosMsgProps
) => {
  // Ensure custom is the last message template since it will match most
  // proposals and we return the first successful message match.
  for (const template of messageTemplates) {
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

// A component which will render a template's input form.
export interface TemplateComponentProps {
  contractAddress: string
  getLabel: (field: string) => string
  onRemove?: () => void
  errors?: FieldErrors
  multisig?: boolean
  readOnly?: boolean
}

export type TemplateComponent = React.FunctionComponent<TemplateComponentProps>

// Defines a new template.
export interface MessageTemplate {
  label: string
  description: string
  component: TemplateComponent
  contractSupport: ContractSupport
  // Get default for fields in form display.
  getDefaults: (
    walletAddress: string,
    contractConfig: Config,
    govTokenDecimals: number
  ) => any
  // Convert MessageTemplate to CosmosMsgFor_Empty.
  toCosmosMsg: (self: any, props: ToCosmosMsgProps) => CosmosMsgFor_Empty
  // Convert decoded msg data to fields in form display.
  fromCosmosMsg: (msg: Record<string, any>, props: FromCosmosMsgProps) => any
}

// The contextual information provided to templates when transforming
// from form inputs to cosmos messages.
export interface ToCosmosMsgProps {
  sigAddress: string
  govAddress: string
  govDecimals: number
  multisig: boolean
}

// The contextual information provided to templates when transforming
// from cosmos messages to values.
export interface FromCosmosMsgProps {
  govDecimals: number
}

// When template data is being passed around in a form it must carry
// a label with it so that we can find it's component and
// transformation function later. This type just encodes that.
export interface TemplateMessage {
  label: string
}
