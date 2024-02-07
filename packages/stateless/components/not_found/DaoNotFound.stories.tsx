import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PageHeaderContent } from '@dao-dao/stateful'

import { DaoNotFound } from './DaoNotFound'

export default {
  title:
    'DAO DAO / packages / stateless / components / not_found / DaoNotFound',
  component: DaoNotFound,
} as ComponentMeta<typeof DaoNotFound>

const Template: ComponentStory<typeof DaoNotFound> = (args) => (
  <DaoNotFound {...args} />
)

export const Default = Template.bind({
  PageHeaderContent,
})
