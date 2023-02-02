import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoNotFound } from './DaoNotFound'

export default {
  title:
    'DAO DAO / packages / stateless / components / not_found / DaoNotFound',
  component: DaoNotFound,
} as ComponentMeta<typeof DaoNotFound>

const Template: ComponentStory<typeof DaoNotFound> = (_args) => <DaoNotFound />

export const Default = Template.bind({})
