import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeProps as makeDaoCardProps } from '../DaoCard.stories'
import { DaoCreateModal } from './DaoCreateModal'

export default {
  title: 'DAO DAO / packages / ui / components / dao / create / DaoCreateModal',
  component: DaoCreateModal,
} as ComponentMeta<typeof DaoCreateModal>

const Template: ComponentStory<typeof DaoCreateModal> = (args) => (
  <DaoCreateModal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  modalProps: {
    onClose: () => alert('close'),
  },
  daoCardProps: makeDaoCardProps(),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=983%3A47531',
  },
}
