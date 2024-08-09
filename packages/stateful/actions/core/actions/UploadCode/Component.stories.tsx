import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { UploadCodeComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / smart_contracting / UploadCode',
  component: UploadCodeComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof UploadCodeComponent>

const Template: ComponentStory<typeof UploadCodeComponent> = (args) => (
  <UploadCodeComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
}
