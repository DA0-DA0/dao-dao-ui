import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ReactHookFormDecorator,
  makeDaoInfo,
  makeDaoProvidersDecorator,
} from '@dao-dao/storybook'

import { ResumeRebalancerComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / valence / ResumeRebalancer',
  component: ResumeRebalancerComponent,
  decorators: [
    ReactHookFormDecorator,
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof ResumeRebalancerComponent>

const Template: ComponentStory<typeof ResumeRebalancerComponent> = (args) => (
  <ResumeRebalancerComponent {...args} />
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
