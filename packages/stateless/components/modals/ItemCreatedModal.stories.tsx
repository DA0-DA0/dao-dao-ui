import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ItemCreatedModal } from './ItemCreatedModal'

export default {
  title:
    'DAO DAO / packages / stateless / components / modals / ItemCreatedModal',
  component: ItemCreatedModal,
} as ComponentMeta<typeof ItemCreatedModal>

const Template: ComponentStory<typeof ItemCreatedModal> = (args) => (
  <ItemCreatedModal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  modalProps: {
    onClose: () => alert('close'),
  },
  header: {
    title: 'Item created',
    subtitle: 'Congrats!',
  },
  Item: (props) => <p {...props}>I am an item!</p>,
  itemProps: { className: 'p-6' },
  url: '#',
}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
