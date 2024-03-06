import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ReactHookFormDecorator,
  makeDaoInfo,
  makeDaoProvidersDecorator,
} from '@dao-dao/storybook'

import { PauseRebalancerComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / valence / PauseRebalancer',
  component: PauseRebalancerComponent,
  decorators: [
    ReactHookFormDecorator,
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof PauseRebalancerComponent>

const Template: ComponentStory<typeof PauseRebalancerComponent> = (args) => (
  <PauseRebalancerComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {
    account: '',
  },
  isCreating: true,
  errors: {},
}
