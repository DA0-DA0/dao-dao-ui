import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'
import { ChainId } from '@dao-dao/types'

import { ManageIcasComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / advanced / ManageIcas',
  component: ManageIcasComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ManageIcasComponent>

const Template: ComponentStory<typeof ManageIcasComponent> = (args) => (
  <ManageIcasComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
  options: {
    currentlyEnabled: [ChainId.StargazeMainnet],
  },
}
