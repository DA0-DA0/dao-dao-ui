import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Modal } from './Modal'

export default {
  title: 'DAO DAO / packages / ui / components / Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Default = Template.bind({})
Default.args = {
  visible: true,
  children: 'Some content',
  header: {
    title: 'Title!',
    subtitle: 'A subtitle explaining something.',
  },
}
