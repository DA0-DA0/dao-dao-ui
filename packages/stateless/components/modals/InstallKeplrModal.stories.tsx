import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InstallKeplrModal } from './InstallKeplrModal'

export default {
  title:
    'DAO DAO / packages / stateless / components / modals / InstallKeplrModal',
  component: InstallKeplrModal,
} as ComponentMeta<typeof InstallKeplrModal>

const Template: ComponentStory<typeof InstallKeplrModal> = (args) => (
  <InstallKeplrModal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  visible: true,
  onClose: () => alert('close'),
}
