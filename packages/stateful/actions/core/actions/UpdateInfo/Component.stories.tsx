import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ReactHookFormDecorator,
  makeDaoInfo,
  makeDaoProvidersDecorator,
} from '@dao-dao/storybook'

import { UpdateInfoComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / dao_appearance / UpdateInfo',
  component: UpdateInfoComponent,
  decorators: [
    ReactHookFormDecorator,
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof UpdateInfoComponent>

const Template: ComponentStory<typeof UpdateInfoComponent> = (args) => (
  <UpdateInfoComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {
    name: '',
    description: '',
    automatically_add_cw20s: true,
    automatically_add_cw721s: true,
  },
  isCreating: true,
  errors: {},
}
