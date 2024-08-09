import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { AddressInput } from '../../../../components'
import { AcceptSubDaoComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / subdaos / AcceptSubDao',
  component: AcceptSubDaoComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof AcceptSubDaoComponent>

const Template: ComponentStory<typeof AcceptSubDaoComponent> = (args) => (
  <AcceptSubDaoComponent {...args} />
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
