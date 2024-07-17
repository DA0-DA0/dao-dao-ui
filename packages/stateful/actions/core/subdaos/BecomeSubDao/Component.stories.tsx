import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { AddressInput } from '../../../../components'
import { BecomeSubDaoComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / subdaos / BecomeSubDao',
  component: BecomeSubDaoComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof BecomeSubDaoComponent>

const Template: ComponentStory<typeof BecomeSubDaoComponent> = (args) => (
  <BecomeSubDaoComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  isCreating: true,
  errors: {},
  options: {
    AddressInput,
  },
}
