import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'
import { ChainId } from '@dao-dao/types'

import { HideIcaComponent } from './Component'

export default {
  title: 'DAO DAO / packages / stateful / actions / core / advanced / HideIca',
  component: HideIcaComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof HideIcaComponent>

const Template: ComponentStory<typeof HideIcaComponent> = (args) => (
  <HideIcaComponent {...args} />
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
