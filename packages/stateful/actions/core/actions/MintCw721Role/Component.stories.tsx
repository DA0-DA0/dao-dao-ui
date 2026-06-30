import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  CHAIN_ID,
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'

import { MintCw721RoleComponent } from './Component'
import { type MintCw721RoleData } from './index'

const junoAgentMintData: MintCw721RoleData = {
  chainId: CHAIN_ID,
  collectionAddress:
    'juno1d2z6mnk9shdmzzccq5u4mtzwjsy6j8w344vke6dsxqykzca7dzfs6g4a9u',
  mintMsg: {
    owner: 'juno1xsx746x4375g39f9fj07hr7qm0wuf0ksl0an76',
    token_id: 'agent:example',
    token_uri: 'https://example.com/agent-example.json',
    extension: {
      role: 'builder',
      weight: '1',
    },
  },
}

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / actions / MintCw721Role',
  component: MintCw721RoleComponent,
  decorators: [
    makeReactHookFormDecorator<MintCw721RoleData>(junoAgentMintData),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof MintCw721RoleComponent>

const Template: ComponentStory<typeof MintCw721RoleComponent> = (args) => (
  <div className="max-w-xl">
    <MintCw721RoleComponent {...args} />
  </div>
)

export const JunoAgentMembership = Template.bind({})
JunoAgentMembership.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: junoAgentMintData,
  isCreating: true,
  errors: {},
}
