import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NoKeplrAccountModal } from './NoKeplrAccountModal'

export default {
  title:
    'DAO DAO / packages / stateless / components / modals / NoKeplrAccountModal',
  component: NoKeplrAccountModal,
} as ComponentMeta<typeof NoKeplrAccountModal>

const Template: ComponentStory<typeof NoKeplrAccountModal> = (args) => (
  <NoKeplrAccountModal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  visible: true,
  onClose: () => alert('close'),
}
